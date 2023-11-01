import React, {createContext, useEffect, useState} from "react";
import {IContextType, IUserCartCatalog, IUserData, TUserCart} from "./dataTypes";
import useFetch, {apiQueries, createApiUrl} from "./dataFetchingFile";
import {useCategoryList} from "./components/customHooks/CategoryList";

export const UserContext = createContext<IContextType | null>(null);

function UserContextProvider({children}: { children: React.ReactNode }) {
    const [userCart, setUserCart] = useState<TUserCart | null>({
        carts: [],
        total: 0,
        skip: 0,
        limit: 0
    });
    const [selectedUserDetails, setSelectedUserDetails] = useState({id: 1,name: "Terry Medhurst"})
    const {data:userCartCatalog, error,loading} = useFetch<TUserCart>(createApiUrl(apiQueries.UserCart, selectedUserDetails.id));
    const [userPrevCartCatalog, setUserPrevCartCatalog] = useState<IUserCartCatalog[]>([]);

    const {categoryList, categoryError} = useCategoryList();
    const {data: userList, error: userListError} = useFetch<IUserData>(createApiUrl(apiQueries.User));

    async function fetchUserCartIfEmpty() {
        const response = await fetch(createApiUrl(apiQueries.AddANewCart), {
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
        if (userCartCatalog?.total ===0) {
            fetchUserCartIfEmpty()
            setSelectedUserDetails({...selectedUserDetails,id:selectedUserDetails.id});
        }
        else if (userCartCatalog) {
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
                categoryList,
                categoryError,
                userList,
                userListError
            }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContextProvider;
