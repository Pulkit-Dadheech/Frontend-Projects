import {createContext} from "react";
import {NoteStateProps} from "./noteState";

export type NoteContextValue = {
    state: NoteStateProps;

};

const defaultContextValue: NoteContextValue = {
    state: {
        name: "",
        class: 0,
    },
};
const CreateContext = createContext<NoteContextValue>(defaultContextValue);

export default CreateContext;

