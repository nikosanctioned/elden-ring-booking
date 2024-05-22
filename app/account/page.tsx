import ReservationCard from "@/app/_components/ReservationCard";
export const metadata = {
  title: {
    template: "%s / Account",
    default: "Account",
  },
  description: "Your account",
};

export default function Page() {
  return (
    <h2 className="font-semibold text-2xl text-accent-400 mb-7">
      Welcome, Nikolai
    </h2>
  );
}
