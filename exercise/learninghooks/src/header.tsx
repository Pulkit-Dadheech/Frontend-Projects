import React from "react";
import {Link} from "react-router-dom";

export default function Header(){

    return(
        <div id="header">
            <Link to="./">Home</Link>
            <Link to="./about">About</Link>
            <Link to="./contact">Contact</Link>
        </div>
    )
}