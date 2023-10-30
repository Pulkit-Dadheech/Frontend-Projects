import React, {Dispatch, SetStateAction} from "react";

export interface IContextType {
    userCart: TUserCart | null;
    setUserCart: Dispatch<SetStateAction<TUserCart | null>>;
    userPrevCartCatalog: { id: number, quantity: number }[];
    setUserPrevCartCatalog: Dispatch<SetStateAction<{ id: number, quantity: number }[]>>
    loading: boolean
    customProducts: TSingleProductWithQuantity[];
    setCustomProducts: React.Dispatch<React.SetStateAction<TSingleProductWithQuantity[]>>
    customProductId: number
    setCustomProductId: React.Dispatch<React.SetStateAction<number>>
    selectedUser: string
    setSelectedUser: React.Dispatch<React.SetStateAction<string>>
    selectedUserId: number,
    setSelectedUserId: React.Dispatch<React.SetStateAction<number>>
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

export interface IUserName {
    firstName: string;
    lastName: string;
}
export interface IUserNameWithId {
    id: number;
    firstName: string;
    lastName: string;
}
export interface IUserData {
    users: IUserNameWithId[]
}

export type TSingleProductWithQuantity ={
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
export type TMultipleProductListWithQuantity = TSingleProductWithQuantity[] | undefined

