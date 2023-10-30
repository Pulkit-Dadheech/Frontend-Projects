import React, {Dispatch, SetStateAction} from "react";

export interface ContextType {
    userCart: UserCart | null;
    setUserCart: Dispatch<SetStateAction<UserCart | null>>;
    userPrevCartCatalog: { id: number, quantity: number }[];
    setUserPrevCartCatalog: Dispatch<SetStateAction<{ id: number, quantity: number }[]>>
    loading: boolean
    customProducts: ListWithQuantity[];
    setCustomProducts: React.Dispatch<React.SetStateAction<ListWithQuantity[]>>
    customProductId: number
    setCustomProductId: React.Dispatch<React.SetStateAction<number>>
    selectedUser: string
    setSelectedUser: React.Dispatch<React.SetStateAction<string>>
    selectedUserId: number,
    setSelectedUserId: React.Dispatch<React.SetStateAction<number>>
}

export interface userCartCatalog {
    id: number,
    quantity: number
}
export type Product = {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
};

export type ProductCatalog = {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
};
export type CartProduct = {
    id: number;
    title: string;
    price: number;
    quantity: number;
    total: number;
    discountPercentage: number;
    discountedPrice: number;
};
export type Carts = {
    id: number,
    products: CartProduct[]
    total: number,
    "discountedTotal": number,
    "userId": number,
    "totalProducts": number,
    "totalQuantity": number
}
export type UserCart = {
    carts: Carts[]
    total: number
    skip: number
    limit: number
}

export interface UserName {
    firstName: string;
    lastName: string;
}
export interface UserNameWithId {
    id: number;
    firstName: string;
    lastName: string;
}
export interface UserData{
    users: UserNameWithId[]
}

export type ListWithQuantity ={
    quantity: number;
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
}
export type ProductListsWithQuantity = ListWithQuantity[] | undefined

