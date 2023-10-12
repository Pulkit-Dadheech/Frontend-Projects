import React from "react";
import {ProductCatalog, useProductList} from "../useProductList";
import "./ProductComponent.css";
export default function ProductComponent(props: { searchBoxResult?: string; category?: string },) {

    const productCatalog:ProductCatalog | undefined=useProductList(props.searchBoxResult,props.category);
    // let productCatalog:ProductCatalog;
    // const ProductList=(searchBoxResult? :string,category?: string)=>{
    //     return useProductList(searchBoxResult,category);
    // }
    // if(props.category && props.category!=="")
    // {
    //     const categoryProductCatalog = ProductList("",props.category);
    //     productCatalog={
    //         products: categoryProductCatalog.products.filter((product)=>
    //             props.searchBoxResult?.includes(product.title)
    //         ),
    //         total: categoryProductCatalog.total,
    //         skip: categoryProductCatalog.skip,
    //         limit: categoryProductCatalog.limit,
    //     }
    // }
    // else{
    //     productCatalog=ProductList(props.searchBoxResult,props.category);
    // }

    const fetchDiscountPrice=(discount:number,price:number )=>{
        const discountedPrice=Math.round(price-(discount/100)*price);

        return discountedPrice;
    }


    return (
        <div>
            {
                productCatalog?.products.map((product) => (
                    <div key={product.id} className="Product-Information">
                        <div className={"product-image"}>
                            <img src={product.images[0]} alt="Product List" height="100"/>
                        </div>
                        <div className={"product-description"}>
                            <h3>Name: {product.title}</h3>
                            <h4>Price:
                                <>
                                {fetchDiscountPrice(product.discountPercentage,product.price)}
                                (<del>{product.price}</del>)
                                </>
                            </h4>
                            <h4>Category: {product.category}</h4>
                            <p>Description: {product.description}</p>
                        </div>
                        <div className={"product-rating"}>
                            <p>Rating: {product.rating}</p>
                            <button>Add to Cart</button>
                        </div>
                    </div>))
            }
        </div>);
}
