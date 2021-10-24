import { useEffect, useRef, useState } from "react"
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
    top: 0;
`

export function ColorPicker<FieldValues>({ name, control, label }: ColorPickerProps<FieldValues>) {
    const [isOpen, setIsOpen] = useState(false);
    const controller = useController({
        name: name,
        control: control
    })

    const wrapperRef = useRef(null);

    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event: any) {
            // @ts-expect-error
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]);

    return (
        <ColorPickerContainer ref={wrapperRef} onClick={(e) => e.target === e.currentTarget && setIsOpen((prev) => !prev)}>
            <div onClick={(e) => e.target === e.currentTarget && setIsOpen((prev) => !prev)}>{label || "Изменить цвет"}</div>
            <div style={{
                background: controller.field.value,
                width: "15px",
                height: "15px",
                borderRadius: "50%",
                border: "2px #e7e7e7 solid"
            }} onClick={(e) => e.target === e.currentTarget && setIsOpen((prev) => !prev)}></div>
            {isOpen && <PickerContainer>
                <SketchPicker
                    color={controller.field.value}
                    // TODO: Fix alpha
                    disableAlpha={true}
                    onChange={(val) => controller.field.onChange(val.hex)}
                />
            </PickerContainer>}

        </ColorPickerContainer>
    )
}