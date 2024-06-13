import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createGuest, getGuest } from "./data-service";
import { User as OriginalUser } from "../../node_modules/@auth/core/src/types";
export interface User extends OriginalUser {
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
    async signIn({ user, account }: { user: User; account: any }) {
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
    async session({ session, user }: { session: any; user: User }) {
      const guest = await getGuest(session.user.email);
      console.log("guest888", guest);
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
