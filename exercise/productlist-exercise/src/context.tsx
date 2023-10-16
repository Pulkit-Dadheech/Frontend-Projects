import {createContext, Dispatch, SetStateAction, useEffect, useState} from "react";
import {UserCart} from "./customHooks";
import useFetch, {getUserCart} from "./dataFetchingFile";

interface ContextType {
    userCart: UserCart | undefined;
    setUserCart: Dispatch<SetStateAction<UserCart | undefined>>;
    userPrevCartCatalog: { id: number, quantity: number }[] | undefined;
    setUserPrevCartCatalog: Dispatch<SetStateAction<{ id: number, quantity: number }[] | undefined>>
}

export const UserContext = createContext<ContextType | undefined>(undefined);

function MyContextProvider({children}: { children: React.ReactNode }) {
    const [userCart, setUserCart] = useState<UserCart | undefined>();
    const userCartCatalog = useFetch<UserCart>(getUserCart());
    const [userPrevCartCatalog, setUserPrevCartCatalog] = useState<{
        id: number,
        quantity: number
    }[]>();

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
