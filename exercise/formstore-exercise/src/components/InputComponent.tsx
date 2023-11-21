import {InputType} from "reactstrap/types/lib/Input";
import React from "react";
import {Input} from "reactstrap";

export type TCustomInputProps = {
    name: string;
    type: InputType;
    label: string;
    className: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required: boolean;
};

export const CustomInput: React.FC<TCustomInputProps> = ({name, type, label, className, value, onChange, required}) => {
    return (
        <Input
            name={name}
            type={type}
            placeholder={label}
            className={className}
            value={value}
            onChange={onChange}
            required={required}
        />
    );
};