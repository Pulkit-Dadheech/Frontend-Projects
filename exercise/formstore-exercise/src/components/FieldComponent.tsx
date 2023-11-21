import React from "react";
import {FormGroup, Label} from "reactstrap";
import {IRegisterFormProps} from "./RegisterForm";
import {observer} from "mobx-react-lite";
import {useFormContext} from "./FormContext";
import {InputType} from "reactstrap/types/lib/Input";
import {TCustomInputProps} from "./InputComponent";


export type TFieldProps = {
    name: string;
    type: InputType;
    label: string;
    isRequired: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    InputComponent: React.ComponentType<TCustomInputProps>;
    InputStyleProps: string;
};

const FormField = observer(({
                                name,
                                type,
                                label,
                                isRequired,
                                onChange,
                                InputComponent,
                                InputStyleProps
                            }: TFieldProps) => {
    const {formStore: store} = useFormContext();

    return (
        <FormGroup className="mt-4 mb-4">
            <Label className="ml-2 font-weight-bold" for="example">
                {label}{isRequired && <span className={"text-danger"}>*</span>}
            </Label>
            <InputComponent
                name={name}
                type={type}
                label={label}
                className={InputStyleProps}
                value={store.getValue(name as keyof IRegisterFormProps)}
                onChange={onChange}
                required={isRequired}
            />
        </FormGroup>
    );
})
export default FormField;