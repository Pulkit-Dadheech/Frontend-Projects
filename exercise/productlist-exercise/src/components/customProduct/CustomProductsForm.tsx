import React, {useContext, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {TProductWithQuantity} from "../../dataTypes";
import './ProductForm.css';
import {CustomProductContext} from "../../CustomProductContext";
import { useNavigate } from "react-router-dom";


function ProductForm() {
    const customProductContext = useContext(CustomProductContext);
    if (!customProductContext) {
        throw new Error("CustomProductContext is not provided correctly.");
    }

    const {customProductId, setCustomProductId, customProducts, setCustomProducts} = customProductContext;

    const [productData, setProductData] = useState<TProductWithQuantity>({
        quantity: 0,
        id: customProductId,
        title: "",
        brand: "",
        category: "",
        description: "",
        discountPercentage: 0,
        images: [],
        price: 0,
        rating: 4.5,
        stock: 1,
        thumbnail: "",
        customProduct: true,
    });

    const [successMessage, setSuccessMessage] = useState<string>('');
    const [showSuccess, setShowSuccess] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState<string>("");
    const navigate = useNavigate();


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        if (name === 'discountPercentage') {
            if (parseInt(value) > 100 || parseInt(value) < 0) {
                return;
            }
        }
        if (name === 'stock') {
            if (value === "0") {
                setShowErrorMessage("Value must be greater than zero");
                setTimeout(() => setShowErrorMessage(""), 2000)
                return
            }
            setProductData({...productData, [name]: parseInt(value)});
            return;
        }
        setProductData({
            ...productData,
            [name]: value,
        });
    };

    useEffect(() => {
        localStorage.setItem("customId", JSON.stringify(customProductId));
        setCustomProductId(customProductId + 1);
    }, [customProducts]);

    const handleSave = (e: React.SyntheticEvent) => {
        e.preventDefault();
        setCustomProductId(customProductId + 1);
        setCustomProducts([...customProducts, productData]);

        setProductData({
            quantity: 0,
            id: customProductId,
            title: "",
            brand: "",
            category: "",
            description: "",
            discountPercentage: 0,
            images: [],
            price: 0,
            rating: 0,
            stock: productData.stock,
            thumbnail: "",
            customProduct: true,
        });

        setTimeout(() =>{
            setShowSuccess(false)
            navigate("/custom-product")
        }, 400);
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
                <input
                    className="input-field"
                    type="text"
                    name="title"
                    onChange={handleChange}
                    value={productData.title} required
                />

                <label htmlFor="category" className="input-label">Category:</label>
                <select
                    name="category" value={productData.category} onChange={handleChange} className="input-field"
                    required>
                    <option value="" disabled hidden>Select Category</option>
                    <option value="smartphone">SmartPhone</option>
                    <option value="laptop">Laptop</option>
                    <option value="watches">Watch</option>
                </select>

                <label htmlFor="price" className="input-label">Price:</label>
                <input
                    type="number"
                    name="price"
                    onChange={handleChange}
                    value={productData.price}
                    className="input-field"
                    required/>

                <label htmlFor="discountedPercentage" className="input-label">Discounted Percentage:</label>
                <input
                    type="number"
                    name="discountPercentage"
                    value={productData.discountPercentage}
                    onChange={handleChange}
                    placeholder="Write value between 1 to 100"
                    className="input-field"/>

                <label htmlFor="stock" className="input-label">Quantity:</label>
                <div className="product-form-stock">
                    <button type="button"
                            onClick={() =>
                                setProductData(
                                    {...productData, stock: productData.stock + 1}
                                )}
                    >+
                    </button>
                    <input
                        type="number"
                        name="stock"
                        onChange={handleChange}
                        value={productData.stock}
                        className="input-field"
                    />
                    <button type="button"
                            onClick={() =>
                                setProductData({
                                    ...productData,
                                    stock: productData.stock !== 1 ? productData.stock - 1 : 1
                                })}
                    >-
                    </button>
                </div>
                <p className="error-message">{showErrorMessage}</p>

                <label
                    htmlFor="description"
                    className="input-label"
                >
                    Description:
                </label>
                <textarea
                    name="description"
                    value={productData.description}
                    onChange={handleChange}
                    className="input-field"
                />

                <button
                    type="submit"
                >
                    Save
                </button>
                {showSuccess && <div className="success-message">{successMessage}</div>}
            </form>
        </div>
    );
}

export default ProductForm;
