import CreateContext from "./createContext";
import React, {useState} from "react";

export type NoteStateProps = {
    name: string;
    class: number;
};

const NoteState: React.FC<React.PropsWithChildren> = (props) => {

    const s1: NoteStateProps = {
        name: "Pulkit",
        class: 12,
    };

    const [state, setState] = useState(s1);
    const update = (): void => {
        setTimeout(() => {
            setState({
                name: "Rohit",
                class: 9
            })
        }, 5000);
    }

    return (
        <CreateContext.Provider value={{state, update}}>
            {props.children}
        </CreateContext.Provider>
    );
};

export default NoteState;
