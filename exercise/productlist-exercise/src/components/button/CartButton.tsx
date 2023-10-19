import React from "react";

export function CartButton({id, onAdd, onDelete, quantity}: {
    id: number;
    onAdd: (id: number, quantity?: number) => void
    onDelete: (id: number, quantity?: number) => void
    quantity?: number;
}) {

    return (<>
        {<div key={id} className="product-quantity-button">
                <button onClick={() => onAdd(id, quantity)}>{!quantity ? "Add to Cart" : "+"}</button>
            <span className={!!quantity ? 'display-inline' : 'display-none'}>
                <span className="product-quantity-button-text">{quantity}</span>
                <button onClick={() => onDelete(id, quantity)}>-</button>
            </span>
            </div>
        }
    </>)
}