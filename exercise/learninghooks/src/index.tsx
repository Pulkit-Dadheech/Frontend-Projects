import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from "./App";
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import Home from "./home";
import {Form} from "./Form";
import NewApp from "./components/higherOrderComponents/newApp";
import About from "./About";
import User from "./User";
// import {UseStateExample} from "./components/useState/useState";
// import {UseEffectExample} from "./components/useEffect/useEffect";
// import NoteState from "./components/useContext/noteState";
// import {Abouts} from "./components/useContext/About";
// import {RefHookCount} from "./components/useRef/RefHook";
// import {UseReducerExample} from "./components/useReducer/useReducer";
// import {Reduce} from "./mounting";
// import {Route, Routes, useNavigate} from "react-router-dom";
// import Header from "./header";
// import {ThemeInheriter} from "./components/higherOrderComponents/themeInheriter";


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
// const router=createBrowserRouter([
//     {
//         path:'/',
//         element: <App/>,
//         children: [
//             {
//                 path:"",
//                 element: <Home />,
//                 children: [
//                     {
//                         path: "",
//                         element: < Form/>
//                     },
//                     {
//                         path: "",
//                         element: <NewApp/>
//                     },
//                 ]
//             },
//             {
//                 path: "about",
//                 element: <About />
//
//             },
//
//         ],
//
//
//     },
//     {
//         path: "/about",
//         element: <About />
//
//     },
// ])


const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App/>}>
            <Route path="" element={<Home/>}/>
            <Route path="about" element={<About/>}/>
            <Route path="form" element={<Form/>}/>
            <Route path="hoc" element={<NewApp/>}/>
            {/*<Route path="/" element={<App/>}/>*/}
            <Route path="user/:userId" element={<User/>}/>
            loader={(request)=>{

        }}
        </Route>

    )
)
root.render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
);
