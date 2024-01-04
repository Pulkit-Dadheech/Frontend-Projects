import React from 'react';
import HomePage from "./components/Homepage/HomePage";
import NoResultFound from "./components/NoSearchResultFound/NoResultFound";
import {CartPage} from "./components/cartPage/CartPage";

export const viewMap = {
    home: <HomePage/>,
    cart: <CartPage/>,
    notFound: <NoResultFound/>,
};