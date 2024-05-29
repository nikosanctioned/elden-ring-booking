import Cabin from "@/app/_components/Cabin";
import Reservation from "@/app/_components/Reservation";
import Spinner from "@/app/_components/Spinner";
import { getCabin, getCabins } from "@/app/_lib/data-service";
import { Suspense } from "react";
export async function generateMetadata({
  params,
}: {
  params: { cabinid: string };
}) {
  const cabin = await getCabin(params.cabinid);
  return {
    title: `Cabin ${cabin.name}`,
  };
}
export async function generateStaticParams() {
  const cabins = await getCabins();

  const ids = cabins.map((cabin) => ({ cabinid: String(cabin.id) }));
  return ids;
}
export default async function Page({
  params,
}: {
  params: { cabinid: string };
}) {
  const cabin = await getCabin(params.cabinid);

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Cabin cabin={cabin} />
      <div>
        <h2 className="text-5xl font-semibold text-center text-accent-700 mb-10">
          Reserve {cabin.name} today. Pay on arrival.
        </h2>
        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
