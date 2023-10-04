import {createContext} from "react";
import {NoteStateProps} from "./noteState";

export type NoteContextValue = {
    state: NoteStateProps;
    update: () => void;
};

const defaultContextValue: NoteContextValue = {
    state: {
        name: "",
        class: 0,
    },
    update: () => {
    },
};

const CreateContext = createContext<NoteContextValue>(defaultContextValue);

export default CreateContext;

