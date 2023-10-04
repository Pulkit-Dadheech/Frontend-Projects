import React, {useEffect, useRef, useState} from "react";

export function RefHookCount() {
    const renderCount = useRef(0);
    const inputRef = useRef<HTMLInputElement | null>(null);
    let [userInput, setUserInput] = useState("");
    useEffect(() => {
        renderCount.current = renderCount.current + 1;
        return;
    })
    const HandleClick = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        userInput = "";
        if (inputRef.current) {

            setTimeout(() => {
                if (inputRef.current) {
                    inputRef.current.focus();
                    inputRef.current.style.backgroundColor = "#f1f1f1";
                }
            }, 500);
            inputRef.current.style.backgroundColor = "#cccccc";
            renderCount.current = 0;
        }
    }
    const HandleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setUserInput(e.target.value);
    }
    return (
        <>
            <input type="text"  placeholder="enter your text here" ref={inputRef}
                   onChange={(e) => HandleChange(e)} value={userInput}/>
            <h1>The number of times component render is {renderCount.current}</h1>
            <button onClick={(e)=>HandleClick(e)}>Reset</button>
        </>
    );
}