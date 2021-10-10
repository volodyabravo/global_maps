import { useState } from "react"
import { SketchPicker } from "react-color"
import styled from "@emotion/styled";
import { Control, Path, useController } from "react-hook-form";

interface ColorPickerProps<FieldValues> {
    name: Path<FieldValues>;
    control: Control<FieldValues>;
    label?: string;
}

let ColorPickerContainer = styled.div`
padding: 6px;
display: flex;
justify-content: space-between;
`

let PickerContainer = styled.div`
position: absolute;
z-index: 1;
bottom: 0;
`

export function ColorPicker<FieldValues>({ name, control, label }: ColorPickerProps<FieldValues>) {
    const [isOpen, setIsOpen] = useState(false);
    const controller = useController({
        name: name,
        control: control
    })

    return (
        <ColorPickerContainer  onClick={(e) => e.target == e.currentTarget && setIsOpen((prev) => !prev)}>
            <div onClick={(e) => e.target == e.currentTarget && setIsOpen((prev) => !prev)}>{label || "Изменить цвет"}</div>
            <div style={{
            background: controller.field.value
        }} onClick={(e) => e.target == e.currentTarget && setIsOpen((prev) => !prev)}>{controller.field.value}</div>
            {isOpen && <PickerContainer>
                <SketchPicker
                    color={controller.field.value}
                    onChangeComplete={(val) => controller.field.onChange(val.hex)}

                />
            </PickerContainer>}

        </ColorPickerContainer>)
}