import React, {useEffect, useRef, useState} from "react";

export function RefHookCount() {
    const renderCount = useRef<number>(0);
    // const [updateRenderCountHeader,setUpdateRenderCountHeader]=useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [userInput, setUserInput] = useState("");
    useEffect(() => {
        renderCount.current = renderCount.current + 1;
        return;
    })
    const HandleClick = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        renderCount.current=1;
        if (inputRef.current) {

            inputRef.current.value="";
            inputRef.current.disabled=true;
            setTimeout(() => {
                if (inputRef.current) {
                    inputRef.current.value="";
                    inputRef.current.focus();
                    inputRef.current.style.backgroundColor = "#f1f1f1";
                    inputRef.current.disabled=false;
                    inputRef.current.placeholder="enter your text here"
                }
            }, 1000);
            inputRef.current.placeholder= "Resetting";
            inputRef.current.style.backgroundColor = "#cccccc";
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
            <button onClick={(e) =>HandleClick(e)}>Reset</button>
        </>
    );
}

// export function VideoPlayer() {
//     const [isPlaying, setIsPlaying] = useState(false);
//     const ref = useRef(null);
//
//     function handleClick() {
//         const nextIsPlaying = !isPlaying;
//         setIsPlaying(nextIsPlaying);
//
//         if (nextIsPlaying) {
//             ref.current.play();
//         } else {
//             ref.current.pause();
//         }
//     }
//
//     return (
//         <>
//             <button onClick={handleClick}>
//                 {isPlaying ? 'Pause' : 'Play'}
//             </button>
//             <video
//                 width="250"
//                 ref={ref}
//                 onPlay={() => setIsPlaying(true)}
//                 onPause={() => setIsPlaying(false)}
//             >
//                 <source
//                     src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
//                     type="video/mp4"
//                 />
//             </video>
//         </>
//     )
// }