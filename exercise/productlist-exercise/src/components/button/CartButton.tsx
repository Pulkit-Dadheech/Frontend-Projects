import React from "react";

export function CartButton({id, onAdd, onDelete, quantity,isCustom,stock}: {
    id: number;
    onAdd: (id: number,isCustom: boolean,stock:number, quantity?: number) => void
    onDelete: (id: number,isCustom: boolean,stock:number, quantity?: number) => void
    quantity?: number;
    isCustom: boolean | undefined
    stock: number
}) {

    return (<>
        {<div key={id} className="product-quantity-button">
                <button onClick={() => onAdd(id, isCustom ?? false,stock,quantity)}>{!quantity ? "Add to Cart" : "+"}</button>
            <span className={!!quantity ? 'display-inline' : 'display-none'}>
                <span className="product-quantity-button-text">{quantity}</span>
                <button onClick={() => onDelete(id,isCustom ?? false,stock, quantity)}>-</button>
            </span>
            </div>
        }
    </>)
}