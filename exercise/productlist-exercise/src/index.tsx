import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Cart from "./components/cart/cart";
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import MyContextProvider from "./context";
import CustomProduct from "./components/customProduct/CustomProduct";
import ProductForm from "./components/customProduct/CustomProductsForm";


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
    <React.StrictMode>
        <MyContextProvider>
            <RouterProvider router={router}/>
        </MyContextProvider>
    </React.StrictMode>
);
