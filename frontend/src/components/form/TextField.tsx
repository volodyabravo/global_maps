import { Control, Path, RegisterOptions, useController } from "react-hook-form";
import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react"


interface TextFieldProps<FieldValues> {
    name: Path<FieldValues>;
    control: Control<FieldValues>;
    label?: string;
    placeholder?: string;
    rules?: Omit<RegisterOptions<FieldValues, Path<FieldValues>>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>;
}

let CustomInput = styled.div(({ theme }) => {
    return `
    display:flex;
    flex-direction: column;    
    margin: 10px 0;
    label {
        font-family: Roboto;
        font-style: normal;
        font-weight: 500;
        margin-left: 10px;
    }
    input {
        background: #FFFFFF;
        border: 1px solid #EEEEEE;
        box-sizing: border-box;
        padding: 10px;
        font-family: Roboto;
        font-style: normal;
        font-weight: 500;
    }
    &.error {
        input { 
            border: 1px solid red;
        }
    }
    `
});

export function TextField<FieldValues>(props: TextFieldProps<FieldValues>) {
    const controller = useController({
        name: props.name,
        control: props.control,
        rules: props.rules,
    })
    return <CustomInput className={
        (controller.fieldState.isTouched && controller.fieldState.invalid) ? "error" : ""
    }>
        {props.label && <label>{props.label}</label>}
        <input {...controller.field} placeholder={props.placeholder} />
    </CustomInput>
}