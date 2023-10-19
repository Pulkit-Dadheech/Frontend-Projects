import React, {useState} from "react";
import User from "./user";
import {themeApply} from "./ThemeApply";

export const ThemeInheriter: React.FC = () => {
    const [theme, setTheme] = useState("white")

    const UserWithTheme = themeApply(User, theme)
    return (
        <>
            <div>Your theme is</div>
            <button onClick={() => {
                setTheme("dark")
            }}>Change Theme to dark
            <UserWithTheme/>
            </button>
            <hr/>
        </>
    )
}
