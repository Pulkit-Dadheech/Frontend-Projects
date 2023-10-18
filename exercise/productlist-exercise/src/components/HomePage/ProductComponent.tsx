import React, {Dispatch, SetStateAction} from "react";
import {useProductList} from "../../customHooks";
import {UserCart} from "../../dataTypes";
import "./ProductComponent.css";
import {Button} from "../button/button";

export default function Product(props: {
    searchBoxResult?: string;
    category?: string,
    userCartCatalog: UserCart,
    setUserCartCatalog: Dispatch<SetStateAction<UserCart | null>>;
},) {

    const {productCatalog, productError,loading} = useProductList(props.searchBoxResult, props.category);
    const {userCartCatalog}=props;

    if (loading) {
        return (<h1>fetching user name...</h1>)
    }
    if (productError) {
        return (<h1>Error Fetching Product Catalog</h1>);
    }


    const fetchDiscountPrice = (discount: number, price: number) => {
        return Math.round(price - (discount / 100) * price);
    }
    const productListWithQuantity=productCatalog?.products.map((product)=>{
        return{
            ...product,
            quantity: userCartCatalog.carts[0].products.find((p)=>p.id===product.id)?.quantity || 0
        }
    })
    return (
        <div>
            {!!productListWithQuantity?.length ? (
                productListWithQuantity.map((productWithQuantity) => (
                    <div key={productWithQuantity.id} className="product-information">
                        <div className={"product-image"}>
                            <img src={productWithQuantity.images[0]} alt="Product List" height="170"/>

                        </div>
                        <div className={"product-description"}>
                            <h3>Name: {productWithQuantity.title}</h3>
                            <h4>Price:
                                <>
                                    {fetchDiscountPrice(productWithQuantity.discountPercentage, productWithQuantity.price)}
                                    <span>&#36;</span>
                                    (
                                    <del>{productWithQuantity.price}</del>
                                    <span>&#36;</span>
                                    )
                                </>
                            </h4>
                            <h4>Category: {productWithQuantity.category}</h4>
                            <p>Description: {productWithQuantity.description}</p>
                        </div>
                        <div className={"product-rating"}>
                            <p>Rating: {productWithQuantity.rating}</p>
                            <Button id={productWithQuantity.id} userCartCatalog={props.userCartCatalog}
                                    setUserCartCatalog={props.setUserCartCatalog} quantity={productWithQuantity.quantity}/>
                        </div>
                    </div>
                ))
            ) : (
                <h1 className={"product-header"}>No Items Found!</h1>
            )}
        </div>
    );


}
