import React, {createContext, Dispatch, SetStateAction, useEffect, useState} from "react";
import {UserCart} from "./dataTypes";
import useFetch, {apiQueries, createApiUrl} from "./dataFetchingFile";

interface ContextType {
    userCart: UserCart | null;
    setUserCart: Dispatch<SetStateAction<UserCart | null>>;
    userPrevCartCatalog: { id: number, quantity: number }[];
    setUserPrevCartCatalog: Dispatch<SetStateAction<{ id: number, quantity: number }[]>>
    loading: boolean
}

interface userCartCatalog {
    id: number,
    quantity: number
}

export const UserContext = createContext<ContextType | null>(null);

function MyContextProvider({children}: { children: React.ReactNode }) {
    const [userCart, setUserCart] = useState<UserCart | null>(null);
    const {data, error,loading} = useFetch<UserCart>(createApiUrl(apiQueries.UserCart));
    const userCartCatalog = data;
    const [userPrevCartCatalog, setUserPrevCartCatalog] = useState<userCartCatalog[]>([]);

    useEffect(() => {
        if (userCartCatalog) setUserCart(userCartCatalog);
    }, [userCartCatalog])

    if(loading){
        return(<h1>Loading..</h1>)
    }
    if (error) return (<>Error: {error}</>)

    return (
        <UserContext.Provider value={{userCart, setUserCart, userPrevCartCatalog, setUserPrevCartCatalog,loading}}>
            {children}
        </UserContext.Provider>
    );
}

export default MyContextProvider;
