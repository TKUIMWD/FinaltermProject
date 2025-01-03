import { createContext, useState, ReactNode } from "react";
import { Reservation } from "../interface/Reservation";

interface ReservationsContextType {
    reservations: Reservation[];
    setReservations: React.Dispatch<React.SetStateAction<Reservation[]>>;
}

export const ReservationsContext = createContext<ReservationsContextType>({
    reservations: [],
    setReservations: () => [],
});

export const ReservationsProvider = ({ children }: { children: ReactNode }) => {
    const [reservations, setReservations] = useState<Reservation[]>([]);

    return (
        <ReservationsContext.Provider value={{ reservations, setReservations }}>
            {children}
        </ReservationsContext.Provider>
    );
};
