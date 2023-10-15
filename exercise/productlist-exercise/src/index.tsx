import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Cart from "./components/cart/cart";
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import {useGetUserDetails} from "./customHooks";
import MyContextProvider from "./context";



const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);


const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<App/>}/>
            <Route path="cart" element={<Cart/>}/>
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
