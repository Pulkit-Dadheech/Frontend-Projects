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
    const [buttonCount, setButtonCount] = useState(0);
    useEffect(() => {
        document.title = String(buttonCount);

    },[buttonCount]);

    function handleAddButton():void {
        setButtonCount(buttonCount + 1);
    }

    function handleSubtractButton() {
        if (buttonCount === 0) {
            return
        }
        setButtonCount(buttonCount - 1);
    }


    return (
        <>
            <h1>Count Machine. </h1>
            <Button count={buttonCount} handleAddButton={handleAddButton} handleSubtractButton={handleSubtractButton}/>
        </>
    );
}