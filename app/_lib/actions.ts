"use server";

import { User, auth, signIn, signOut } from "@/app/_lib/auth";
import { supabase } from "./supabase";
import { revalidatePath } from "next/cache";
import { getBookings } from "./data-service";

export async function updateGuest(formData: FormData) {
  console.log("Update profile form submitted with data:", formData);
  const session = await auth();
  if (!session) throw new Error("Not authenticated");
  const [nationality, countryFlag] =
    formData.get("nationality")?.toString().split("%") ?? [];
  const nationalID = formData.get("nationalID")?.toString();
  const regex = /^[a-zA-Z0-9]{6,12}$/;

  if (nationalID && !regex.test(nationalID)) {
    throw new Error("Invalid national ID");
  }
  const updateData = { nationality, countryFlag, nationalID };
  const user = session?.user as User;
  const { data, error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", user?.guestId)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Guest could not be updated");
  }
  revalidatePath("/account/profile");
}
export async function deleteReservation(bookingId: string) {
  const session = await auth();
  const user = session?.user as User;
  if (!session) throw new Error("Not authenticated");
  const guestBookngs = await getBookings(user?.guestId ?? "");
  const guestBookingsIds = guestBookngs.map((booking) => booking.id);
  if (!guestBookingsIds.includes(bookingId)) {
    throw new Error("Booking does not belong to the user");
  }
  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  revalidatePath("/account/reservations");
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}
export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
