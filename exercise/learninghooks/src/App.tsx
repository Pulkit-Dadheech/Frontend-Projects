import './App.css';
import {UseStateExample} from "./components/useState/useState";
import {Form} from "./Form";
import {UseEffectExample} from "./components/useEffect/useEffect";
import NoteState from "./components/useContext/noteState";
import {About} from "./components/useContext/About";
import React from "react";
import {RefHookCount} from "./components/useRef/RefHook";

function App() {
    return (
        <>
            <NoteState>
                <Form/>
                <div className="App">
                    <div className="useStateContainer">
                        <UseStateExample/>
                        <UseEffectExample/>
                    </div>
                </div>
                <RefHookCount/>
                <About/>
            </NoteState>
        </>
    );
}

export default App;
