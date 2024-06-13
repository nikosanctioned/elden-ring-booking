import { getBooking } from "@/app/_lib/data-service";

export async function GET(
  requets: Request,
  { params }: { params: { reservationId: string } }
) {
  const { reservationId } = params;
  try {
    const reservation = await getBooking(reservationId);
    console.log("reservation", reservation);
    return Response.json({ reservation });
  } catch (error) {
    return Response.json({ error: "Reservation not found" }, { status: 404 });
  }
}
