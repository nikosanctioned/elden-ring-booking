import Spinner from "../_components/Spinner";

export default function Loading() {
  return (
    <div className="grid items-center justify-center h-full">
      <Spinner />
      <p className="text-primary-200 text-lg mt-5 text-center">
        Loading cabin data...
      </p>
    </div>
  );
}
