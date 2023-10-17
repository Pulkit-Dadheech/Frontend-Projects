import {createContext, Dispatch, SetStateAction, useEffect, useState} from "react";
import {UserCart} from "./dataTypes";
import useFetch, {apiQueries, createApiUrl} from "./dataFetchingFile";

interface ContextType {
    userCart: UserCart;
    setUserCart: Dispatch<SetStateAction<UserCart>>;
    userPrevCartCatalog: { id: number, quantity: number }[];
    setUserPrevCartCatalog: Dispatch<SetStateAction<{ id: number, quantity: number }[]>>
}
interface userCartCatalog{
    id: number,
    quantity: number
}

export const UserContext = createContext<ContextType | undefined>({} as ContextType);

function MyContextProvider({children}: { children: React.ReactNode }) {
    const [userCart, setUserCart] = useState<UserCart>({} as UserCart);
    const userCartCatalog = useFetch<UserCart>(createApiUrl(apiQueries.UserCart));
    const [userPrevCartCatalog, setUserPrevCartCatalog] = useState<userCartCatalog[]>([] as userCartCatalog[]);

    useEffect(() => {
        setUserCart(userCartCatalog);
    }, [userCartCatalog])

    return (
        <UserContext.Provider value={{userCart, setUserCart, userPrevCartCatalog, setUserPrevCartCatalog}}>
            {children}
        </UserContext.Provider>
    );
}

export default MyContextProvider;
