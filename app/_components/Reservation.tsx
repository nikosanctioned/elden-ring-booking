import {
  Cabin,
  getBookedDatesByCabinId,
  getSettings,
} from "../_lib/data-service";
import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";

async function Reservation({ cabin }: { cabin: Cabin }) {
  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin.id.toString()), // Convert cabin.id to a string
  ]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10 px-10 border border-primary-800">
      <DateSelector
        settings={settings}
        bookedDates={bookedDates}
        cabin={cabin}
      />
      <ReservationForm cabin={cabin} />
    </div>
  );
}

export default Reservation;
