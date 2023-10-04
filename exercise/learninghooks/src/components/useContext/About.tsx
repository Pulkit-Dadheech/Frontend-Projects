import React, {useContext, useEffect} from "react";
import CreateContext, {NoteContextValue} from "./createContext";

export const About = (): React.JSX.Element => {
    const a = useContext<NoteContextValue>(CreateContext);
    useEffect(() => {
        a.update()
    }, [a])
    return (
        <div>
            my name is {a.state.name} and my class is {a.state.class}
        </div>
    );
};
