import React from "react";
import './theme.css'

const User:React.FC<{theme:string}> = ({theme}:{theme:string})=>{
    return(
        <>
            <div className={theme}>
                <h1>Hello there here we are using {theme} theme</h1>
            </div>
        </>
    );
}
export default User;