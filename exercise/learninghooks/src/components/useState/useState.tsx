import {useEffect, useState} from "react";
import './useState.css';

type buttonFunctions={
    handleSubtractButton: () => void;
    handleAddButton: () => void;
    count: number;

}

function Button({handleSubtractButton,handleAddButton,count}:buttonFunctions) {
    return (
        <>
            <button onClick={handleAddButton}>+</button>
            <button>{count}</button>
            <button onClick={handleSubtractButton}>-</button>
        </>
    )
}


export function UseStateExample() {
    let [buttonCount, setButtonCount] = useState(0);
    useEffect(() => {
        document.title = String(buttonCount);

    },[buttonCount]);

    function handleAddButton():void {
        setButtonCount(++buttonCount);
    }

    function handleSubtractButton() {
        if (buttonCount === 0) {
            return
        }
        setButtonCount(--buttonCount);
    }


    return (
        <>
            <h1>Count Machine. </h1>
            <Button count={buttonCount} handleAddButton={handleAddButton} handleSubtractButton={handleSubtractButton}/>
        </>
    );
}