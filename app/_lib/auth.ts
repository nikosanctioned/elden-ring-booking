import NextAuth, { User } from "next-auth";
import Google from "next-auth/providers/google";
import { createGuest, getGuest } from "./data-service";
export interface GuestUser extends User {
  guestId?: string | null;
}

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    authorized({ auth, request }: { auth: any; request: any }) {
      return !!auth?.user;
    },
    async signIn({ user, account }: { user: GuestUser; account: any }) {
      try {
        const existingGuest = await getGuest(user.email ?? "");
        if (!existingGuest)
          await createGuest({ email: user.email, fullName: user.name });
        return true;
      } catch (error) {
        console.error("Error signing in", error);
        return false;
      }
    },
    async session({ session, user }: { session: any; user: GuestUser }) {
      const guest = await getGuest(session.user.email);
      session.user.guestId = guest.id;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export const {
  auth,
  handlers: { GET, POST },
  signIn,
  signOut,
} = NextAuth(authConfig);
