import { getBookedDatesByCabinId, getSettings } from "../_lib/data-service";
import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";

async function Reservation({ params }: { params: { cabinid: string } }) {
  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(params.cabinid),
  ]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10 px-10 border border-primary-800">
      <DateSelector />
      <ReservationForm />
    </div>
  );
}

export default Reservation;
