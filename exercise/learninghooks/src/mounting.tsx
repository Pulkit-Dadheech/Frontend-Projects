import {useReducer,useEffect,useRef,useState} from "react";
import React from "react";

export function Reduce() {
    function reducer(buttonCount: number, action: { type: string }): number {
        if (action.type === 'Inc') {
            return buttonCount + 1
        } else if (action.type === 'Dec') {
            return buttonCount - 1;
        }
        return buttonCount
    }

    const [buttonCount, dispatch] = useReducer(reducer, 0);

    return (
        <>
            <button onClick={() => dispatch({type: "Dec"})}>-</button>
            <h1>{buttonCount}</h1>
            <button onClick={() => dispatch({type: "Inc"})}>+</button>
        </>
    )

}


export function Mounting() {
    const [secondsFromMounting, setSecondsFromMounting] = useState(0);
    const mountingSeconds :React.MutableRefObject<Date> = useRef(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            const newSeconds = (Math.floor((new Date().getTime() - mountingSeconds.current.getTime()) / 1000));
            setSecondsFromMounting(newSeconds);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <h1>{secondsFromMounting}</h1>
        </>
    );
}



