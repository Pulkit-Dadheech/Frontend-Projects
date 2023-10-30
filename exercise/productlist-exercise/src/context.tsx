import React, {createContext, Dispatch, SetStateAction, useEffect, useState} from "react";
import {TSingleProductWithQuantity, TUserCart} from "./dataTypes";
import useFetch, {apiQueries, createApiUrl} from "./dataFetchingFile";

interface IContextType {
    userCart: TUserCart | null;
    setUserCart: Dispatch<SetStateAction<TUserCart | null>>;
    userPrevCartCatalog: { id: number, quantity: number }[];
    setUserPrevCartCatalog: Dispatch<SetStateAction<{ id: number, quantity: number }[]>>
    loading: boolean
    customProducts: TSingleProductWithQuantity[];
    setCustomProducts: React.Dispatch<React.SetStateAction<TSingleProductWithQuantity[]>>
    customProductId: number
    setCustomProductId: React.Dispatch<React.SetStateAction<number>>
}

interface IUserCartCatalog {
    id: number,
    quantity: number
}

export const UserContext = createContext<IContextType | null>(null);

function MyContextProvider({children}: { children: React.ReactNode }) {
    const [userCart, setUserCart] = useState<TUserCart | null>(null);
    const {data, error, loading} = useFetch<TUserCart>(createApiUrl(apiQueries.UserCart));
    const userCartCatalog = data;
    const [userPrevCartCatalog, setUserPrevCartCatalog] = useState<IUserCartCatalog[]>([]);

    const initialCustomProducts = JSON.parse(localStorage.getItem("customProducts") || "[]");
    let customId = parseInt(JSON.parse(localStorage.getItem("customId") || "101"));
    const [customProductId, setCustomProductId] = useState(customId);
    const [customProducts, setCustomProducts] = useState<TSingleProductWithQuantity[]>(initialCustomProducts);

    useEffect(() => {
        if (userCartCatalog) {
            setUserCart({...userCartCatalog});
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
