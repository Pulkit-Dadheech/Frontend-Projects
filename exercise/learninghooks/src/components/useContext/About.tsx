import React, {useContext, useEffect} from "react";
import CreateContext, {NoteContextValue} from "./createContext";

export const Abouts = () => {

    const contextValue = useContext<NoteContextValue>(CreateContext);
    useEffect(() => {
        console.log("I Am Updated")
    }, [contextValue])
    return (
        <div>
            my name is {contextValue.state.name} and my class is {contextValue.state.class}
        </div>
    );
};
