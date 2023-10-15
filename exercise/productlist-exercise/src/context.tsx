import {createContext, useState, Dispatch, SetStateAction, useEffect} from "react";
import {useGetUserCart, useGetUserDetails, UserCart} from "./customHooks";

interface ContextType {
    userCart: UserCart | undefined;
    setUserCart: Dispatch<SetStateAction<UserCart | undefined>>;
}

export const UserContext = createContext<ContextType | undefined>(undefined);

function MyContextProvider({ children }: {children:React.ReactNode}) {
    const [userCart, setUserCart] = useState<UserCart | undefined>();
    const userCartCatalog = useGetUserCart();



    useEffect(()=>{
        console.log(`previous->`,userCart);
        setUserCart(userCartCatalog);
        console.log(`next->`,userCart);
    },[userCartCatalog])

    return (
        <UserContext.Provider value={{ userCart, setUserCart }}>
            {children}
        </UserContext.Provider>
    );
}

export default MyContextProvider;
