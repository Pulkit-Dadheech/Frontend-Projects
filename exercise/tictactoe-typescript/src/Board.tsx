import {Button} from "./Button";
import {useState} from "react";

export function Board(){
    const [inputArray ,setInputArray] = useState<string[]>(Array(9).fill(null));
    const [isNext,setIsNext] = useState(false);
    const [currentWinning, setCurrentWinning] = useState(false)

    function changeInputArrayText(index:number):void {
        if(currentWinning){
            return;
        }
        const nextInputArray = inputArray.slice();
        if(!isNext){
            nextInputArray[index] = "X";
        }
        else{
            nextInputArray[index] = "O";
        }
        setInputArray(nextInputArray);
        setIsNext(!isNext);

        if(calculateWinner(nextInputArray)){
            setCurrentWinning(true);
        }
    }
    function calculateWinner(buttonText:string[]):string | null {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (buttonText[a] && buttonText[a] === buttonText[b] && buttonText[a] === buttonText[c]) {
                return buttonText[a];
            }
        }
        return null;
    }
    const winner:string | null = calculateWinner(inputArray);
    let status:string;
    if (winner) {
        status = 'Winner: ' + winner;
    } else {
        status = 'Next player: ' + (isNext ? 'O' : 'X');
    }
    function resetFunction():void{
        if(currentWinning){
            setInputArray(Array(9).fill(null));
            setIsNext(false);
            setCurrentWinning(false);
        }


    }


    return(
        <>
            <p>{status}</p>
            <div className={"buttonAlignment"}>
                <Button buttonText={inputArray[0]} changeButtonText={()=>changeInputArrayText(0)}/>
                <Button buttonText={inputArray[1]} changeButtonText={()=>changeInputArrayText(1)}/>
                <Button buttonText={inputArray[2]} changeButtonText={()=>changeInputArrayText(2)}/>
            </div>
            <div className={"buttonAlignment"}>
                <Button buttonText={inputArray[3]} changeButtonText={()=>changeInputArrayText(3)}/>
                <Button buttonText={inputArray[4]} changeButtonText={()=>changeInputArrayText(4)}/>
                <Button buttonText={inputArray[5]} changeButtonText={()=>changeInputArrayText(5)}/>
            </div>
            <div className={"buttonAlignment"}>
                <Button buttonText={inputArray[6]} changeButtonText={()=>changeInputArrayText(6)}/>
                <Button buttonText={inputArray[7]} changeButtonText={()=>changeInputArrayText(7)}/>
                <Button buttonText={inputArray[8]} changeButtonText={()=>changeInputArrayText(8)}/>
            </div>
            <button onClick={resetFunction} disabled={!currentWinning}>Reset</button>

        </>
    )
}