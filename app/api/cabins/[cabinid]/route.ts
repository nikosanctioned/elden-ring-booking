import { getBookedDatesByCabinId, getCabin } from "@/app/_lib/data-service";

export async function GET(
  requets: Request,
  { params }: { params: { cabinid: string } }
) {
  const { cabinid } = params;
  try {
    const [cabin, bookedDates] = await Promise.all([
      getCabin(cabinid),
      getBookedDatesByCabinId(cabinid),
    ]);
    return Response.json({ cabin, bookedDates });
  } catch (error) {
    return Response.json({ error: "Cabin not found" }, { status: 404 });
  }
}
