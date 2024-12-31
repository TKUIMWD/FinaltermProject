import { createContext, useState, ReactNode } from "react";
import { DishWasher } from "../interface/DishWasher";

interface DishWashersContextType {
    dishWashers: DishWasher[];
    setDishWashers: React.Dispatch<React.SetStateAction<DishWasher[]>>;
}

export const DishWashersContext = createContext<DishWashersContextType>({
    dishWashers: [],
    setDishWashers: () => [],
});

export const DishWashersProvider = ({ children }: { children: ReactNode }) => {
    const [dishWashers, setDishWashers] = useState<DishWasher[]>([]);

    return (
        <DishWashersContext.Provider value={{ dishWashers, setDishWashers }}>
            {children}
        </DishWashersContext.Provider>
    );
};
