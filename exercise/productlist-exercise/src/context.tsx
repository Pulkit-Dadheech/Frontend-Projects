import React, {createContext, Dispatch, SetStateAction, useEffect, useState} from "react";
import {listWithQuantity, UserCart} from "./dataTypes";
import useFetch, {apiQueries, createApiUrl} from "./dataFetchingFile";
import {ContextType} from "./dataTypes";
import {userCartCatalog} from "./dataTypes";


export const UserContext = createContext<ContextType | null>(null);

function MyContextProvider({children}: { children: React.ReactNode }) {
    const [userCart, setUserCart] = useState<UserCart | null>(null);
    const [userPrevCartCatalog, setUserPrevCartCatalog] = useState<userCartCatalog[]>([]);
    const [selectedUser,setSelectedUser]=useState("Terry Medhurst")
    const [selectedUserId,setSelectedUserId]=useState(1);
    const {data, error, loading} = useFetch<UserCart>(createApiUrl(apiQueries.UserCart,selectedUserId));
    const userCartCatalog = data;

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

    if (error) return (<>Error: {error}</>)

    if (loading) {
        return (<h1>Loading..</h1>)
    }

    return (
        <UserContext.Provider
            value={{userCart, setUserCart, userPrevCartCatalog, setUserPrevCartCatalog, loading, customProducts, setCustomProducts, customProductId, setCustomProductId,selectedUser,setSelectedUser,selectedUserId,setSelectedUserId}}>
            {children}
        </UserContext.Provider>
    );
}

export default MyContextProvider;
