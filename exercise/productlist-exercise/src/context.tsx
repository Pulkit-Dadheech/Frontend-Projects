import React, {createContext, Dispatch, SetStateAction, useEffect, useState} from "react";
import {TUserCart} from "./dataTypes";
import useFetch, {apiQueries, createApiUrl} from "./dataFetchingFile";

interface IContextType {
    userCart: TUserCart | null;
    setUserCart: Dispatch<SetStateAction<TUserCart | null>>;
    userPrevCartCatalog: { id: number, quantity: number }[];
    setUserPrevCartCatalog: Dispatch<SetStateAction<{ id: number, quantity: number }[]>>
    loading: boolean
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

    useEffect(() => {
        if (userCartCatalog) {
            setUserCart({...userCartCatalog});
        }
    }, [userCartCatalog]);

    if (loading) {
        return (<h1>Loading..</h1>)
    }
    if (error) return (<>Error: {error}</>)

    return (
        <UserContext.Provider
            value={{userCart, setUserCart, userPrevCartCatalog, setUserPrevCartCatalog, loading}}>
            {children}
        </UserContext.Provider>
    );
}

export default MyContextProvider;
