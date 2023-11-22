import React from "react";
import {IRegisterFormProps} from "./RegisterForm";
import {useFormContext} from "./FormContext";
import {InputType} from "reactstrap/types/lib/Input";
import {observer} from "mobx-react-lite";
import {Label} from "reactstrap";

export type TRenderProps = {
    name: string;
    type: InputType;
    label: string;
    isRequired: boolean;
    className: string
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    store: any;
}

export type TFieldProps = {
    name: string;
    type: InputType;
    label: string;
    isRequired: boolean;
    InputStyleProps: string;
};
export type TFieldPropsWithRender = {
    name: string
    label: string
    isRequired: boolean
    render: (args: {
        fieldProps: {
            name: string;
            label: string;
            isRequired: boolean;
            value: any;
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
        };
    }) => React.ReactNode;
}

const FormField = observer((props: TFieldPropsWithRender) => {
    const {formStore: store} = useFormContext();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value} = e.target;
        store.updateFormData(props.name as keyof IRegisterFormProps, value);
    };


    return (<div>
        <Label className="ml-2 font-weight-bold" for={props.render.name}>
            {props.label}
            {props.isRequired && <span className="text-danger">*</span>}
        </Label>
        {props.render({
            fieldProps: {
                name: props.name,
                label: props.label,
                isRequired: props.isRequired,
                value: store.getValue(props.name as keyof IRegisterFormProps),
                onChange: (e) => handleChange(e),
            },
        })}
    </div>)
});

export default FormField;