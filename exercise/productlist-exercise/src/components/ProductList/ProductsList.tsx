import React, {Dispatch, SetStateAction} from "react";
import {ButtonUtils} from "../button/buttonUtils";
import {listsWithQuantity, UserCart} from "../../dataTypes";

function ProductList({
                         productListWithQuantity: productListWithCartQuantity,
                         userCartCatalog,
                         setUserCartCatalog,
                         loading
                     }:
                         {
                             productListWithQuantity: listsWithQuantity
                             userCartCatalog: UserCart,
                             setUserCartCatalog: Dispatch<SetStateAction<UserCart | null>>;
                             loading: boolean
                         }) {

    const fetchDiscountPrice = (discount: number, price: number) => {
        return Math.round(price - (discount / 100) * price);
    }
    if (loading) {
        return <>Loading ......</>
    }
    return (
        <div>
            {!!productListWithCartQuantity?.length &&
                productListWithCartQuantity.map((productWithQuantity) => (
                    <div key={productWithQuantity.id} className="product-information">
                        <div className={"product-image"}>
                            <img src={productWithQuantity.images[0]} alt="Product List" height="170"/>
                        </div>
                        <div className={"product-description"}>
                            <h3>Name: {productWithQuantity.title}</h3>
                            <h4>
                                Price: <>
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
                            <ButtonUtils
                                id={productWithQuantity.id}
                                userCartCatalog={userCartCatalog}
                                setUserCartCatalog={setUserCartCatalog}
                                quantity={productWithQuantity.quantity}
                            />
                        </div>
                    </div>
                ))
            }
        </div>
    );
}

export default ProductList;
