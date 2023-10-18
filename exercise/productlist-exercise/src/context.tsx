import React, {createContext, Dispatch, SetStateAction, useEffect, useState} from "react";
import {UserCart} from "./dataTypes";
import useFetch, {apiQueries, createApiUrl} from "./dataFetchingFile";

interface ContextType {
    userCart: UserCart | null;
    setUserCart: Dispatch<SetStateAction<UserCart | null>>;
    userPrevCartCatalog: { id: number, quantity: number }[];
    setUserPrevCartCatalog: Dispatch<SetStateAction<{ id: number, quantity: number }[]>>
}

interface userCartCatalog {
    id: number,
    quantity: number
}

export const UserContext = createContext<ContextType | null>(null);

function MyContextProvider({children}: { children: React.ReactNode }) {
    const [userCart, setUserCart] = useState<UserCart | null>(null);
    const {data, error} = useFetch<UserCart>(createApiUrl(apiQueries.UserCart));
    const userCartCatalog = data;
    const [userPrevCartCatalog, setUserPrevCartCatalog] = useState<userCartCatalog[]>([]);

    useEffect(() => {
        if (userCartCatalog) setUserCart(userCartCatalog);
    }, [userCartCatalog])

    if (error) return (<>Error: {error}</>)

    return (
        <UserContext.Provider value={{userCart, setUserCart, userPrevCartCatalog, setUserPrevCartCatalog}}>
            {children}
        </UserContext.Provider>
    );
}

export default MyContextProvider;
