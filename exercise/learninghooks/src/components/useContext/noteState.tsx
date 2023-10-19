import CreateContext from "./createContext";
import React, {useCallback, useEffect, useState} from "react";

export type NoteStateProps = {
    name: string;
    class: number;
};

const NoteState: React.FC<React.PropsWithChildren> = (props) => {
    const [state, setState] = useState({
        name: "Pulkit",
        class: 12,
    });
    const updateStateCallback = useCallback(() => {
        setState({
            name: "Rohit",
            class: 9
        });
    }, []);

    useEffect(() => {
        const timeout = setTimeout(updateStateCallback,1000);//return value is undefined
        return (()=>clearTimeout(timeout));//()=>void
    }, [updateStateCallback]);


    return (
        <CreateContext.Provider value={{state}}>
            {props.children}
        </CreateContext.Provider>
    );
};

export default NoteState;
