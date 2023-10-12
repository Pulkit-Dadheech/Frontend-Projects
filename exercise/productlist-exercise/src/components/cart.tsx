import React from "react";
import {useUserList} from "../useProductList";

export default function Cart(){
    const username=useUserList();
    return(
        <>
            <div>{username}</div>
        </>
    )
}