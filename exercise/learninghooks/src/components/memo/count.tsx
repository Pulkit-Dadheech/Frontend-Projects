import React,{useState} from "react";
import Home from "./home";
const Count=()=>{
    const [count,setCount]=useState(0);
    const [data,setData]=useState(100);
    return(
        <>
            Memo with React {count}
            <Home data={data}/>
            <button onClick={()=>setCount(count+1)}>{count}</button>
            <button onClick={()=>setData(data+1)}>{data}</button>

            <hr/>
        </>
    )
}
export default Count;
