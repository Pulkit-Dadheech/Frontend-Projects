import React from "react";
export function Button({ id, onAdd, onDelete, quantity }: {
    id: number;
    onAdd:(id: number, quantity?: number) => void
    onDelete:(id: number, quantity?: number) => void
    quantity?: number;
}) {
    if (!quantity) {
        quantity=0;
        return (
            <div>
            <button className="product-quantity-button"
                    onClick={() => onAdd(id,quantity)}>Add to Cart
            </button>
            </div>
        )
    }
    return (
        <div key={id} className="product-quantity-button">
            <button onClick={() => onAdd(id,quantity)}>+</button>
            <div className="product-quantity-button-text">{quantity}</div>
            <button onClick={() => onDelete(id,quantity)}>-</button>
        </div>
    )
}