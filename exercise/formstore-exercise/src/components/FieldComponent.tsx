import React from "react";
import {FormGroup, Input, Label} from "reactstrap";
import {IRegisterFormProps} from "./RegisterForm";
import {observer} from "mobx-react-lite";
import {InputType} from "reactstrap/types/lib/Input";
import {FormStore} from "../store/FormStore";

interface IFormData {
    [key: string]: string;
}

type TFieldProps<T extends IFormData> = {
    name: string;
    type: InputType;
    label: string;
    isRequired: boolean;
    store: FormStore<IRegisterFormProps>
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    InputComponent: typeof Input;
    InputStyleProps: string;
};

const FormField = observer(
    <T extends IFormData>({
                              name,
                              type,
                              label,
                              isRequired,
                              onChange,
                              store,
                              InputComponent,
                              InputStyleProps
                          }: TFieldProps<T>) => {

        return (
            <FormGroup className="mt-4 mb-4">
                <Label className="ml-2 font-weight-bold" for="example">
                    {label}
                </Label>
                <InputComponent
                    type={type}
                    name={name}
                    placeholder={label}
                    className={InputStyleProps}
                    value={store.getValue(name as keyof IRegisterFormProps)}
                    onChange={onChange}
                    required={isRequired}
                />
            </FormGroup>
        );
    })
export default FormField;