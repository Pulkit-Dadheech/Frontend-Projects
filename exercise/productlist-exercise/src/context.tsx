import React, {createContext, useEffect, useState} from "react";
import {IContextType, IUserCartCatalog, TUserCart} from "./dataTypes";
import useFetch, {apiQueries, createApiUrl} from "./dataFetchingFile";

export const UserContext = createContext<IContextType | null>(null);

function MyContextProvider({children}: { children: React.ReactNode }) {
    const [userCart, setUserCart] = useState<TUserCart | null>({
        carts: [],
        total: 0,
        skip: 0,
        limit: 0
    });
    const [userPrevCartCatalog, setUserPrevCartCatalog] = useState<IUserCartCatalog[]>([]);

    const [selectedUserDetails, setSelectedUserDetails] = useState({id: 1,name: "Terry Medhurst"})
    const {data, error, loading} = useFetch<TUserCart>(createApiUrl(apiQueries.UserCart, selectedUserDetails.id));
    let userCartCatalog = data;

    async function fetchUserCartIfEmpty() {
        const response = await fetch('https://dummyjson.com/carts/add', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                userId: selectedUserDetails.id,
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
            setSelectedUserDetails({...selectedUserDetails,id:selectedUserDetails.id});
        } else if (data) {
            setUserCart(userCartCatalog);
        }
    }, [userCartCatalog]);

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
                selectedUserDetails,
                setSelectedUserDetails,
            }}>
            {children}
        </UserContext.Provider>
    );
}

export default MyContextProvider;
