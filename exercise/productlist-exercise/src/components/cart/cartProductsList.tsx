import React, {useEffect, useState} from "react";
import {Product, useGetUserCart, UserCart} from "../../customHooks";
import {getUrlForSingleProduct} from "../../dataFetchingFile";


export default function CartProductsList() {

    const [userCartProducts, setUserCartProducts] = useState<Product[] | undefined>();
    const userCartCatalog = useGetUserCart();
    const products = userCartCatalog?.carts[0]?.products;

    useEffect(() => {
        if (products) {
            const fetchProductData = async () => {
                const productPromises = products.map(async (product) => {
                    const response = await fetch(getUrlForSingleProduct(product.id));
                    return await response.json();
                });
                const productData = await Promise.all(productPromises);
                // const filteredProductData = productData.filter((product) => product !== undefined) as unknown as Product[];
                setUserCartProducts(productData);
            };

            fetchProductData().then(r => console.log("userCartFetchSuccessfully"));
        }

    }, [userCartCatalog]);

    const fetchDiscountPrice = (discount: number, price: number) => {
        return Math.round(price - (discount / 100) * price);
    }




    return (
        <div>
            {userCartProducts && userCartProducts.length > 0 ? (
                userCartProducts.map((product) => (
                    <div key={product.id} className="Product-Information">
                        <div className={"product-image"}>
                            <img src={product.images[0]} alt="Product List" height="100"/>
                        </div>
                        <div className={"product-description"}>
                            <h3>Name: {product.title}</h3>
                            <h4>
                                Price:
                                <>
                                    {fetchDiscountPrice(product.discountPercentage, product.price)}
                                    <span>&#36;</span>
                                    (
                                    <del>{product.price}</del>
                                    <span>&#36;</span>
                                    )
                                </>
                            </h4>
                            <h4>Category: {product.category}</h4>
                            <p>Description: {product.description}</p>
                        </div>
                        <div className={"product-rating"}>
                            <p>Rating: {product.rating}</p>
                            <div id={"product-quantity-button"}>
                                <button onClick={()=>"handleAddProduct"}>-</button>
                                <div style={{padding: "5px"}}>{userCartCatalog?.carts[0].products[0].quantity}</div>
                                <button onClick={()=>"handleDeleteProduct"}>+</button>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <h1 className={"Product-Header"}>No Items Found!</h1>
            )}
        </div>
    );
}

