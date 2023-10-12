import React, {memo} from "react";

const Home=(props:{data: number})=>{
    console.log("inner components",props.data);
    return(
        <>
            <h1>Home Components</h1>
        </>
    )
}
export default memo(Home);