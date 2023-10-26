import React, {createContext, Dispatch, SetStateAction, useEffect, useState} from "react";
import {listWithQuantity, UserCart} from "./dataTypes";
import useFetch, {apiQueries, createApiUrl} from "./dataFetchingFile";

interface ContextType {
    userCart: UserCart | null;
    setUserCart: Dispatch<SetStateAction<UserCart | null>>;
    userPrevCartCatalog: { id: number, quantity: number }[];
    setUserPrevCartCatalog: Dispatch<SetStateAction<{ id: number, quantity: number }[]>>
    loading: boolean
    customProducts: listWithQuantity[];
    setCustomProducts: React.Dispatch<React.SetStateAction<listWithQuantity[]>>
    customProductId: number
    setCustomProductId: React.Dispatch<React.SetStateAction<number>>
}

interface userCartCatalog {
    id: number,
    quantity: number
}

export const UserContext = createContext<ContextType | null>(null);

function MyContextProvider({children}: { children: React.ReactNode }) {
    const [userCart, setUserCart] = useState<UserCart | null>(null);
    const {data, error, loading} = useFetch<UserCart>(createApiUrl(apiQueries.UserCart));
    const userCartCatalog = data;
    const [userPrevCartCatalog, setUserPrevCartCatalog] = useState<userCartCatalog[]>([]);

    const initialCustomProducts = JSON.parse(localStorage.getItem("customProducts") || "[]");
    let customId = parseInt(JSON.parse(localStorage.getItem("customId") || "101"));
    const [customProductId, setCustomProductId] = useState(customId);
    const [customProducts, setCustomProducts] = useState<listWithQuantity[]>(initialCustomProducts);

    useEffect(() => {
        if (userCartCatalog) {
            const updatedUserCartCatalog = {...userCartCatalog};
            setUserCart(updatedUserCartCatalog);
        }
    }, [userCartCatalog]);

    useEffect(() => {
        localStorage.setItem("customProducts", JSON.stringify(customProducts));
    }, [customProducts]);




    if (loading) {
        return (<h1>Loading..</h1>)
    }
    if (error) return (<>Error: {error}</>)

    return (
        <UserContext.Provider
            value={{userCart, setUserCart, userPrevCartCatalog, setUserPrevCartCatalog, loading, customProducts, setCustomProducts, customProductId, setCustomProductId}}>
            {children}
        </UserContext.Provider>
    );
}

export default MyContextProvider;
