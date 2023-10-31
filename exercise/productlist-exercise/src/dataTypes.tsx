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

export interface IUserData {
    firstName: string;
    lastName: string;
}
export type TProductWithQuantity = TProduct & {
    quantity: number;
    customProduct?: boolean
}

export type TProductsWithQuantity = TProductWithQuantity[] | undefined

