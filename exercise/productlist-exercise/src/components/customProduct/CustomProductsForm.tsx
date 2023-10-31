import React, {useContext, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {TProductWithQuantity} from "../dataTypes";
import './ProductForm.css';
import {CustomProductContext} from "../CustomProductContext";

function ProductForm() {
    const customProductContext = useContext(CustomProductContext);
    if (!customProductContext) {
        throw new Error("UserContext is not provided correctly.");
    }
    const {customProductId, setCustomProductId, customProducts, setCustomProducts} = customProductContext;
    const [productData, setProductData] = useState<TProductWithQuantity>({
        quantity: 0,
        id: (customProductId),
        title: "",
        brand: "",
        category: "",
        description: "",
        discountPercentage: 0,
        images: [],
        price: 0,
        rating: 4.5,
        stock: 10,
        thumbnail: "",
        customProduct: true,
    });
    const [successMessage, setSuccessMessage] = useState<string>('');
    const [showSuccess,setShowSuccess]=useState(false);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        if (name === 'discountPercentage') {
            if (parseInt(value) > 100 || parseInt(value) < 0) {
                return
            }
        }
        setProductData({
            ...productData,
            [name]: value,
        });
    };
    useEffect(() => {
        localStorage.setItem("customId", JSON.stringify(customProductId));
        setCustomProductId(customProductId+1);
    }, [customProducts]);

    const handleSave = (e: React.SyntheticEvent) => {
        e.preventDefault();
        setCustomProductId(customProductId+1)
        setCustomProducts([...customProducts, productData]);
        setProductData({
            quantity: 0,
            id: (customProductId),
            title: "",
            brand: "",
            category: "",
            description: "",
            discountPercentage: 0,
            images: [],
            price: 0,
            rating: 0,
            stock: 0,
            thumbnail: "",
            customProduct: true,

        });
        setTimeout(()=>setShowSuccess(false),2000);
        setShowSuccess(true);
        setSuccessMessage('Submitted successfully!');
    };

    return (
        <div className="form-container">
            <div className={"form-header"}>
                <h2 className="form-header-text">Add a Custom Product</h2>
                <Link to="/custom-product">View Custom Products</Link>
            </div>
            <form className="product-form" onSubmit={handleSave}>
                <label htmlFor="name" className="input-label">Product Name:</label>
                <input className="input-field" type="text" name="title" onChange={(e) => handleChange(e)}
                       value={productData.title} required/>

                <label htmlFor="category" className="input-label">Category:</label>
                <select name="category" value={productData.category} onChange={handleChange} className="input-field"
                        required>
                    <option value="" disabled hidden>Select Category</option>
                    <option value="smartphone">SmartPhone</option>
                    <option value="laptop">Laptop</option>
                    <option value="watches">Watch</option>
                </select>

                <label htmlFor="price" className="input-label">Price:</label>
                <input type="number" name="price" value={productData.price} onChange={handleChange}
                       className="input-field" required/>

                <label htmlFor="discountedPrice" className="input-label">Discounted Percentage:</label>
                <input type="number" name="discountPercentage" value={productData.discountPercentage}
                       onChange={handleChange} placeholder={"Write value between 1 to 100"} className="input-field"/>

                <label htmlFor="description" className="input-label">Description:</label>
                <textarea name="description" value={productData.description} onChange={handleChange}
                          className="input-field"/>

                <button type="submit">Save</button>
                {showSuccess && <div className="success-message">{successMessage}</div>}
            </form>

        </div>
    );
}

export default ProductForm;
