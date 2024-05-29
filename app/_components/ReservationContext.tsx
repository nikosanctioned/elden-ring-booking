"use client";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { DateRange } from "react-day-picker";

const initialState: DateRange | undefined = { from: undefined, to: undefined };

const ReservationContext = createContext<
  | {
      range: DateRange | undefined;
      setRange: Dispatch<SetStateAction<DateRange | undefined>>;
      resetRange: () => void;
    }
  | undefined
>(undefined);

function ReservationProvider({ children }: { children: React.ReactNode }) {
  const [range, setRange] = useState<DateRange | undefined>(initialState);
  const resetRange = (): void => setRange(initialState);
  return (
    <ReservationContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </ReservationContext.Provider>
  );
}
function useReservation() {
  const context = useContext(ReservationContext);
  if (context === undefined) {
    throw new Error("useReservation must be used within a ReservationProvider");
  }
  return context;
}
export { ReservationProvider, useReservation };
