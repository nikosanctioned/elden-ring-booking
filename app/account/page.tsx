import ReservationCard from "@/app/_components/ReservationCard";
import { auth } from "../_lib/auth";
export const metadata = {
  title: {
    template: "%s / Account",
    default: "Account",
  },
  description: "Your account",
};

export default async function Page() {
  const session = await auth();
  return (
    <h2 className="font-semibold text-2xl text-accent-400 mb-7">
      Welcome, {session?.user?.name}
      <br />
      Your email is {session?.user?.email}
    </h2>
  );
}
