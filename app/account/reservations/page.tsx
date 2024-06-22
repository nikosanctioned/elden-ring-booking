import ReservationCard from "@/app/_components/ReservationCard";
import ReservationList from "@/app/_components/ReservationList";
import { GuestUser, auth } from "@/app/_lib/auth";
import { getBookings } from "@/app/_lib/data-service";
export const metadata = {
  title: "Reservations",
  description: "Your reservations",
};

export default async function Page() {
  const session = await auth();
  // CHANGE
  const guestId = (session?.user as GuestUser)?.guestId;
  const bookings: any[] = await getBookings(guestId ?? "");

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Your reservations
      </h2>

      {bookings.length === 0 ? (
        <p className="text-lg">
          You have no reservations yet. Check out our{" "}
          <a className="underline text-accent-500" href="/cabins">
            luxury cabins &rarr;
          </a>
        </p>
      ) : (
        <ReservationList bookings={bookings} />
      )}
    </div>
  );
}
