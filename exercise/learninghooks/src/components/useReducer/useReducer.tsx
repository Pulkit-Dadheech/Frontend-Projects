import {useReducer} from "react";

type buttonFunctions={
    count: number;
}



export function UseReducerExample() {

    const reducer = (buttonCount: number, action: { type: string; }):number=>{
        let count:number= 0;
        if (action.type === 'Inc') {
            return(buttonCount + 1)
        } else if (action.type === 'Dec') {
            return (buttonCount - 1)
        }
        return count
    }

    const [buttonCount, dispatch] = useReducer(reducer,0);



    function Button({count}:buttonFunctions) {
        return (
            <>
                <button onClick={()=>dispatch({type: 'Inc'})}>+</button>
                <button>{count}</button>
                <button onClick={()=>dispatch({type: 'Dec'})}>-</button>
            </>
        )
    }



    return (
        <>
            <h1>Count Machine. </h1>
            <Button count={buttonCount}/>
        </>
    );
}


