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

export interface UserData {
    firstName: string;
    lastName: string;
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

