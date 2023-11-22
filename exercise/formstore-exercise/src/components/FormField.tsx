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
    InputComponent: React.ComponentType<TCustomInputProps>;
    InputStyleProps: string;
};

const FormField = observer((props: TFieldProps) => {
    const {formStore: store} = useFormContext();
    const {InputComponent}=props;
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        store.updateFormData(name as keyof IRegisterFormProps, value);
    };

    return (
        <FormGroup className="mt-4 mb-4">
            <Label className="ml-2 font-weight-bold" for="example">
                {props.label}{props.isRequired && <span className={"text-danger"}>*</span>}
            </Label>
            <InputComponent
                {...props}
                value={store.getValue(props.name as keyof IRegisterFormProps)}
                onChange={handleChange}
            />
        </FormGroup>
    );
})
export default FormField;