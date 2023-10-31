import React, {createContext, useEffect, useState} from "react";
import {TProductWithQuantity} from "./dataTypes";

interface ICustomProductContextType {
    customProducts: TProductWithQuantity[];
    setCustomProducts: React.Dispatch<React.SetStateAction<TProductWithQuantity[]>>
    customProductId: number
    setCustomProductId: React.Dispatch<React.SetStateAction<number>>
}

export const CustomProductContext = createContext<ICustomProductContextType | null>(null);

function CustomProductContextProvider({children}: { children: React.ReactNode }) {
    let customId = parseInt(JSON.parse(localStorage.getItem("customId") || "101"));
    const initialCustomProducts = JSON.parse(localStorage.getItem("customProducts") || "[]");
    const [customProductId, setCustomProductId] = useState(customId);
    const [customProducts, setCustomProducts] = useState<TProductWithQuantity[]>(initialCustomProducts);

    useEffect(() => {
        localStorage.setItem("customProducts", JSON.stringify(customProducts));
    }, [customProducts]);
    return (
        <CustomProductContext.Provider
            value={{customProducts, setCustomProducts, customProductId, setCustomProductId}}>
            {children}
        </CustomProductContext.Provider>
    );
}
export default CustomProductContextProvider;