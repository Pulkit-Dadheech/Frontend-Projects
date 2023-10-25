import React, {useState} from 'react';
import {Link} from 'react-router-dom'; // Import the Link component
import {Product} from "../dataTypes"
import './ProductForm.css';

function ProductForm() {
    const [customProducts, setCustomProducts] = useState<Product[]>([]);
    const [productData, setProductData] = useState<Product>({
        id: 0,
        title: "",
        brand: "",
        category: "",
        description: "",
        discountPercentage: 0,
        images: [],
        price: 0,
        rating: 4.5,
        stock: 100,
        thumbnail: "",
    });
    const [successMessage, setSuccessMessage] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setProductData({
            ...productData,
            [name]: value,
        });
    };

    const handleSave = () => {
        setCustomProducts([...customProducts, productData]);
        setProductData({
            id: productData.id+1,
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
        });
        setSuccessMessage('Submitted successfully!');
    };
    return (
        <div className="form-container">
            <h2>Add a Custom Product</h2>
            <form className="product-form">

                <label htmlFor="name" className="input-label">Product Name:</label>
                <input className="input-field" type="text" name="title"  onChange={(e)=>handleChange(e)} value={productData.title}/>

                <label htmlFor="category" className="input-label">Category:</label>
                <input type="text" name="category" value={productData.category} onChange={handleChange} className="input-field"/>

                <label htmlFor="price" className="input-label">Price:</label>
                <input type="number" name="price" value={productData.price} onChange={handleChange} className="input-field"/>

                <label htmlFor="discountedPrice" className="input-label">Discounted Price:</label>
                <input type="number" name="discountPercentage" value={productData.discountPercentage} onChange={handleChange} className="input-field"/>

                {/*<label htmlFor="quantity" className="input-label">Quantity:</label>*/}
                {/*<input type="number" name="quantity" value={productData.} onChange={handleChange} className="input-field"/>*/}

                <label htmlFor="description" className="input-label">Description:</label>
                <textarea name="description" value={productData.description} onChange={handleChange} className="input-field"/>

                <button type="button" onClick={handleSave}>Save</button>
                {successMessage?? <div>{successMessage}</div>}
            </form>

            <Link to="/custom-product">View Custom Products</Link>
        </div>
    );
}

export default ProductForm;
