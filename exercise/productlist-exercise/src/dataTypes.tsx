import React from "react";

export interface IContextType {
    userCart: TUserCart | null;
    setUserCart: React.Dispatch<React.SetStateAction<TUserCart | null>>;
    userPrevCartCatalog: { id: number, quantity: number }[];
    setUserPrevCartCatalog: React.Dispatch<React.SetStateAction<{ id: number, quantity: number }[]>>
    loading: boolean
    selectedUserDetails: {id: number,name: string}
    setSelectedUserDetails: React.Dispatch<React.SetStateAction<{id: number,name: string}>>
    categoryList :  string[] | null
    categoryError : string | null
    userList : IUserData | null
    userListError :  string | null
}
export interface ICustomProductContextType {
    customProducts: TProductWithQuantity[];
    setCustomProducts: React.Dispatch<React.SetStateAction<TProductWithQuantity[]>>
    customProductId: number
    setCustomProductId: React.Dispatch<React.SetStateAction<number>>
}

export interface IShoppingCartProps{
    searchBoxResult:string
    category: string
}
export interface IUserCartCatalog {
    id: number,
    quantity: number
}

export type TProduct = {
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

export type TProductCatalog = {
    products: TProduct[];
    total: number;
    skip: number;
    limit: number;
};
export type TCartProduct = {
    id: number;
    title: string;
    price: number;
    quantity: number;
    total: number;
    discountPercentage: number;
    discountedPrice: number;
};
export type TCarts = {
    id: number,
    products: TCartProduct[]
    total: number,
    "discountedTotal": number,
    "userId": number,
    "totalProducts": number,
    "totalQuantity": number
}
export type TUserCart = {
    carts: TCarts[]
    total: number
    skip: number
    limit: number
}

export interface IUserNameWithId {
    id: number;
    firstName: string;
    lastName: string;
}

export interface IUserData {
    users: IUserNameWithId[]
}

export type TProductWithQuantity = TProduct & {
    quantity: number;
    customProduct: boolean
}

export type TProductsWithQuantity = TProductWithQuantity[] | undefined

