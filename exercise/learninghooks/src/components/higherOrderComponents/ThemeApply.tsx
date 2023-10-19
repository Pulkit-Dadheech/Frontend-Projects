import React from "react";

 export type WrappedComponentProps = {
     theme: string;
 };

export function themeApply(WrappedComponent: React.FC<{theme:string}> , theme: string):React.FC {
    const func: React.FC = () => {
        return (
            <WrappedComponent theme={theme}/>
        )
    }
    return func;

}
