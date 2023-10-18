import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {Product, UserCart} from "../../dataTypes";
import {apiQueries, createApiUrl} from "../../dataFetchingFile";
import {Button} from "../button/button";


export default function CartProductsList({userCartCatalog, setUserCartCatalog}: {
    userCartCatalog: UserCart;
    setUserCartCatalog: Dispatch<SetStateAction<UserCart | null>>;
}) {

    const [userCartProducts, setUserCartProducts] = useState<Product[]>();

    const productsList = userCartCatalog.carts[0].products;
    const filteredproductsList=productsList.filter((product)=>product.quantity!==0);

    useEffect(() => {
        if (filteredproductsList) {
            const fetchProductData = async () => {
                const productPromises = filteredproductsList.map(async (product) => {
                    const response = await fetch(createApiUrl(apiQueries.SingleProduct,product.id));
                    return await response.json();
                });
                const productData = await Promise.all(productPromises);
                setUserCartProducts(productData);
            };
            fetchProductData().then(r => console.log("userCartFetchSuccessfully"));
        }
    }, []);

    const fetchDiscountPrice = (discount: number, price: number) => {
        return Math.round(price - (discount / 100) * price);
    }


    return (
        <div>
            {userCartProducts && userCartProducts.length > 0 ? (
                userCartProducts.map((product) => (
                    <div key={product.id} className="product-information">
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
                            <Button id={product.id} userCartCatalog={userCartCatalog}
                                    setUserCartCatalog={setUserCartCatalog}></Button>
                        </div>
                    </div>
                ))
            ) : (
                <h1 className={"product-header"}>Fetching Product Cart ...</h1>
            )}
        </div>
    );
}

