import './App.css';
import React from "react";
import {Route, Routes, useNavigate} from "react-router-dom";
import Header from "./header";
import {Outlet} from "react-router-dom";
// import {UseStateExample} from "./components/useState/useState";
// import {Form} from "./Form";
// import {UseEffectExample} from "./components/useEffect/useEffect";
// import NoteState from "./components/useContext/noteState";
// import {Abouts} from "./components/useContext/About";
// import {RefHookCount} from "./components/useRef/RefHook";
import Status from "./components/customHooks/showStatus";
// import {UseReducerExample} from "./components/useReducer/useReducer";
// import {Reduce} from "./mounting";
// import NewApp from "./components/higherOrderComponents/newApp";
// import Home from "./home";
// import About from "./About";
// import {ThemeInheriter} from "./components/higherOrderComponents/themeInheriter";

function App() {
    // const navigate = useNavigate();
    return (

        <>

            <Header/>
            <Outlet/>

            {/*<Routes>*/}
                {/*<Route path="/" element={*/}
                {/*    <>*/}
                {/*        <NoteState>*/}

                {/*            <Home/>*/}
                {/*            <ThemeInheriter/>*/}
                {/*            <button onClick={() => navigate("/hoc")}>Implementation of HOC</button>*/}
                {/*            <button onClick={() => navigate("/form")}>Go to Form</button>*/}
                {/*            <div className="App">*/}
                {/*                <div className="useStateContainer">*/}
                {/*            <button onClick={() => navigate("/usestate")}>Navigate to useState Implementation</button>*/}
                {/*            <button onClick={() => navigate("/useeffect")}>Navigate to useEffect Implementation</button>*/}


                {/*                </div>*/}
                {/*            </div>*/}
                {/*            <RefHookCount/>*/}
                {/*            <Abouts/>*/}
                {/*            <UseReducerExample/>*/}
                {/*        </NoteState>*/}
                {/*    </>*/}
                {/*}/>*/}

                {/*<Route path="/about" element={<About/>}/>*/}
                {/*<Route path="/reduce" element={<Reduce/>}/>*/}
                {/*<Route path="/form" element={<Form/>}/>*/}
                {/*<Route path="/hoc" element={<NewApp/>}/>*/}
                {/*<Route path="/usestate" element={<UseStateExample/>}/>*/}
                {/*<Route path="/useeffect" element={<UseEffectExample/>}/>*/}



                {/* Add more routes as needed */}
            {/*</Routes>*/}



        </>

    );
}

export default App;
