import React from "react";
import {Input} from "reactstrap";
import {InputType} from "reactstrap/types/lib/Input";

export type TCustomInputProps = {
    name: string;
    type: InputType;
    className: string;
    label: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value: any;
    isRequired: boolean;
}

export const CustomInput: React.FC<TCustomInputProps> = ({name,type,label,isRequired,className, value, onChange}) => {
    return (
        <Input
            name={name}
            type={type}
            placeholder={label}
            className={className}
            value={value}
            onChange={onChange}
            required={isRequired}
        />
    );
};