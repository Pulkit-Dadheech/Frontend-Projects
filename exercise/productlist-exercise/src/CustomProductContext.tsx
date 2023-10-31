import React, {createContext, useEffect, useState} from "react";
import {TProductWithQuantity,ICustomProductContextType} from "./dataTypes";

export const CustomProductContext = createContext<ICustomProductContextType | null>(null);

function CustomProductContextProvider({children}: { children: React.ReactNode }) {
    let customId = parseInt(JSON.parse(localStorage.getItem("customId") || "1"));
    const [customProductId, setCustomProductId] = useState(customId);
    const initialCustomProducts = JSON.parse(localStorage.getItem("customProducts") || "[]");
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