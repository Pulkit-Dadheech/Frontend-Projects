import React, {createContext, useEffect, useState} from "react";
import {ContextType, ListWithQuantity, UserCart, userCartCatalog} from "./dataTypes";
import useFetch, {apiQueries, createApiUrl} from "./dataFetchingFile";


export const UserContext = createContext<ContextType | null>(null);

function MyContextProvider({children}: { children: React.ReactNode }) {
    const [userCart, setUserCart] = useState<UserCart | null>({
        carts: [],
        total: 0,
        skip: 0,
        limit: 0
    });
    const [userPrevCartCatalog, setUserPrevCartCatalog] = useState<userCartCatalog[]>([]);
    const [selectedUser, setSelectedUser] = useState("Terry Medhurst")
    const [selectedUserId, setSelectedUserId] = useState(1);
    const {data, error, loading} = useFetch<UserCart>(createApiUrl(apiQueries.UserCart, selectedUserId));
    let userCartCatalog = data;

    const initialCustomProducts = JSON.parse(localStorage.getItem("customProducts") || "[]");
    let customId = parseInt(JSON.parse(localStorage.getItem("customId") || "101"));
    const [customProductId, setCustomProductId] = useState(customId);
    const [customProducts, setCustomProducts] = useState<ListWithQuantity[]>(initialCustomProducts);

    async function fetchUserCartIfEmpty() {
        const response = await fetch('https://dummyjson.com/carts/add', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                userId: selectedUserId,
                products: [
                    {
                        id: 1,
                        quantity: 0,
                    }
                ]
            })
        })
        const responseReceived = await response.json()
        setUserCart({
            carts: [responseReceived],
            total: 1,
            skip: 0,
            limit: 100
        })

    }

    useEffect(() => {
        if (data?.total === 0) {
            fetchUserCartIfEmpty()
            setSelectedUserId(selectedUserId);
        } else if (data) {
            setUserCart(userCartCatalog);
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
            value={{
                userCart,
                setUserCart,
                userPrevCartCatalog,
                setUserPrevCartCatalog,
                loading,
                customProducts,
                setCustomProducts,
                customProductId,
                setCustomProductId,
                selectedUser,
                setSelectedUser,
                selectedUserId,
                setSelectedUserId
            }}>
            {children}
        </UserContext.Provider>
    );
}

export default MyContextProvider;
