import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Cart from "./components/cart/cart";
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import UserContextProvider from "./context";
import CustomProduct from "./components/customProduct/CustomProduct";
import ProductForm from "./components/customProduct/CustomProductsForm";
import CustomProductContextProvider from "./CustomProductContext";


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);


const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<App/>}/>
            <Route path="cart" element={<Cart/>}/>
            <Route path="custom-product" element={<CustomProduct/>}></Route>
            <Route path="/form" element={<ProductForm/>} />
        </>
    )
)
root.render(
    // <React.StrictMode>
        <UserContextProvider>
            <CustomProductContextProvider>
                <RouterProvider router={router}/>
            </CustomProductContextProvider>
        </UserContextProvider>
    // </React.StrictMode>
);
