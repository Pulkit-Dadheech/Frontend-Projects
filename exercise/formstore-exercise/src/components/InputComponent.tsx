import React from "react";
import {Input} from "reactstrap";
import {TFieldProps} from "./FormField";

export type TCustomInputProps = TFieldProps & {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const CustomInput: React.FC<TCustomInputProps> = ({name,type,label,isRequired,InputStyleProps, value, onChange}) => {
    return (
        <Input
            name={name}
            type={type}
            placeholder={label}
            className={InputStyleProps}
            value={value}
            onChange={onChange}
            required={isRequired}
        />
    );
};