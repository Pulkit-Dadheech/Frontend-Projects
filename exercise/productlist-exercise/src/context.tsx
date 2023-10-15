import {createContext, useState, Dispatch, SetStateAction, useEffect} from "react";
import { useGetUserCart, UserCart } from "./customHooks";

interface ContextType {
    userCart: UserCart | undefined;
    setUserCart: Dispatch<SetStateAction<UserCart | undefined>>;
}

export const UserContext = createContext<ContextType | undefined>(undefined);

function MyContextProvider({ children }: {children:React.ReactNode}) {
    const [userCart, setUserCart] = useState<UserCart | undefined>();

    const userCartCatalog = useGetUserCart();
    console.log(userCartCatalog);

    useEffect(()=>{
        setUserCart(userCartCatalog);
        console.log(userCart);
    },[userCartCatalog])

    return (
        <UserContext.Provider value={{ userCart, setUserCart }}>
            {children}
        </UserContext.Provider>
    );
}

export default MyContextProvider;
