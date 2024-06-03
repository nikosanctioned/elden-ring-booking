import { auth } from "../_lib/auth";
import {
  Cabin,
  getBookedDatesByCabinId,
  getSettings,
} from "../_lib/data-service";
import DateSelector from "./DateSelector";
import LoginMessage from "./LoginMessage";
import ReservationForm from "./ReservationForm";

async function Reservation({ cabin }: { cabin: Cabin }) {
  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin.id.toString()),
  ]);

  const session = await auth();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 border-primary-800 mt-11">
      <DateSelector
        settings={settings}
        bookedDates={bookedDates}
        cabin={cabin}
      />
      {session?.user ? (
        <ReservationForm cabin={cabin} user={session.user} />
      ) : (
        <LoginMessage />
      )}
    </div>
  );
}

export default Reservation;
