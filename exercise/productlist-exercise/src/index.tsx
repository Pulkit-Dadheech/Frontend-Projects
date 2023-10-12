import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Cart from "./components/cart";
import {createBrowserRouter,createRoutesFromElements,Route,RouterProvider} from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const router = createBrowserRouter(
    createRoutesFromElements(
        <><Route path="/" element={<App/>}/><Route path="cart" element={<Cart/>}/></>
    )
)
root.render(
  <React.StrictMode>
      <RouterProvider router={router}/>
  </React.StrictMode>
);
