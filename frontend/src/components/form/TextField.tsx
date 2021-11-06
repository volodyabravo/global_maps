import { Control, Path, useController } from "react-hook-form";
import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react"


interface TextFieldProps<FieldValues> {
    name: Path<FieldValues>;
    control: Control<FieldValues>;
    label?: string;
    placeholder?: string;
}

let CustomInput = styled.input(({ theme }) => {
    return `
    background: #FFFFFF;
    border: 1px solid #EEEEEE;
    box-sizing: border-box;
    padding: 10px;
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;`
});

export function TextField<FieldValues>(props: TextFieldProps<FieldValues>) {
    const controller = useController({
        name: props.name,
        control: props.control
    })



    return <CustomInput {...controller.field} placeholder={props.placeholder}></CustomInput>
}