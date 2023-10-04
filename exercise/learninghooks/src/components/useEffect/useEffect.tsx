import {useEffect, useState} from "react";

export const UseEffectExample = () => {
    const [screenWidth, setScreenWidth] = useState(window.screen.width);

    const currentScreenWidth = () => {
        setScreenWidth(window.innerWidth);
    }

    useEffect(() => {
        window.addEventListener('resize', currentScreenWidth)
        return () => {
            window.removeEventListener('resize', currentScreenWidth) //clearing up previous values
        }
    }, [screenWidth]);

    return (
        <div>
            <h1>The screen Resolution is {screenWidth}</h1>
        </div>
    )
}