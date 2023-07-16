import { Control, Path, RegisterOptions, useController } from "react-hook-form";
import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react"

import { Field } from "react-hook-form";

interface TextFieldProps<FieldValues> {
    name: Path<FieldValues>;
    control: Control<FieldValues>;
    label?: string;
    placeholder?: string;
    rules?: Omit<RegisterOptions<FieldValues, Path<FieldValues>>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>;
}

const CustomInput = styled.div(({ theme }) => {
    return `
    display:flex;
    flex-direction: column;    
    margin: 10px 0;
    label {
        font-family: Roboto;
        font-style: normal;
        font-weight: 500;

        font-family: Montserrat;
        font-style: normal;
        font-weight: normal;
        font-size: 13px;
        line-height: 20px;
    }
    input {
        background: #FFFFFF;
        border: 1px solid #EEEEEE;
        box-sizing: border-box;
        padding: 10px;
        font-family: Montserrat;
        font-style: normal;
        font-weight: normal;
        font-size: 13px;
        line-height: 20px;
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