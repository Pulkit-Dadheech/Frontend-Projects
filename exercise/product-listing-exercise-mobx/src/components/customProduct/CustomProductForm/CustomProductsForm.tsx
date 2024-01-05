import React, {useEffect, useState} from 'react';
import './ProductForm.css';
import {useRouterStore} from "mobx-state-router";
import {useRootStore} from "../../../Context/RootContext";
import {TSingleCustomProduct} from "../../../types/allTypes";
import {toJS} from "mobx";
import {observer} from "mobx-react-lite";


export const CustomProductForm=observer(()=> {
    const routerStore = useRouterStore();
    const {customProduct} = useRootStore();
    const [successMessage, setSuccessMessage] = useState<string>('');
    const [showSuccess, setShowSuccess] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState<string>("");

    useEffect(() => {
        if(!customProduct.customProductStore.data)
        customProduct.customProductStore.fetchCustomProductData();
    }, []);

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
            customProduct.updateCustomProductSingleEntityData( name as keyof TSingleCustomProduct, parseInt(value));
            return;
        }
        customProduct.updateCustomProductSingleEntityData( name as keyof TSingleCustomProduct, value);
    };
    const handleSave = (e: React.SyntheticEvent) => {
        e.preventDefault();
        customProduct.customProductId = customProduct.customProductId + 1;
        if(customProduct.customProductStore.data)
            customProduct.customProductStore.setData([...customProduct.customProductStore.data, customProduct.customProductData]);
        else
            customProduct.customProductStore.setData([customProduct.customProductData]);

        customProduct.setCustomProductData({
            quantity: 0,
            id: customProduct.customProductId,
            title: "",
            category: "",
            description: "",
            discountPercentage: 0,
            images: [],
            price: 0,
            rating: 0,
            total: customProduct.customProductData.total,
            customProduct: true,
        });

        setTimeout(() => {
            setShowSuccess(false)
            routerStore.goTo('customProduct')
        }, 400);
        setShowSuccess(true);
        setSuccessMessage('Submitted successfully!');
        console.log(toJS(customProduct.customProductStore.data));
    };

    return (
        <div className="form-container">
            <div className={"form-header"}>
                <h2 className="form-header-text">Add a Custom Product</h2>
                <button onClick={() => routerStore.goTo('customProduct')}>View Custom Products</button>
            </div>

            <form className="product-form" onSubmit={handleSave}>
                <label htmlFor="name" className="input-label">Product Name:</label>
                <input
                    className="input-field"
                    type="text"
                    name="title"
                    onChange={handleChange}
                    value={customProduct.customProductData.title} required
                />

                <label htmlFor="category" className="input-label">Category:</label>
                <select
                    name="category" value={customProduct.customProductData.category} onChange={handleChange} className="input-field"
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
                    value={customProduct.customProductData.price}
                    className="input-field"
                    required/>

                <label htmlFor="discountedPercentage" className="input-label">Discounted Percentage:</label>
                <input
                    type="number"
                    name="discountPercentage"
                    value={customProduct.customProductData.discountPercentage}
                    onChange={handleChange}
                    placeholder="Write value between 1 to 100"
                    className="input-field"/>

                <label htmlFor="total" className="input-label">Quantity:</label>
                <div className="product-form-stock">
                    <button type="button"
                            onClick={() =>
                                customProduct.setCustomProductData(
                                    {...customProduct.customProductData, total: customProduct.customProductData.total + 1}
                                )}
                    >+
                    </button>
                    <input
                        type="number"
                        name="stock"
                        onChange={handleChange}
                        value={customProduct.customProductData.total}
                        className="input-field"
                    />
                    <button type="button"
                            onClick={() =>
                                customProduct.setCustomProductData({
                                    ...customProduct.customProductData,
                                    total: customProduct.customProductData.total !== 1 ? customProduct.customProductData.total - 1 : 1
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
                    value={customProduct.customProductData.description}
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
})
