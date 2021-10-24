import { AccordionDetails, Grid, TextField, Typography, Box, CardContent, Card, Button, FormControl, InputLabel, Select, MenuItem, Checkbox, FormControlLabel, TextareaAutosize, Switch, Container, Tabs, Tab } from "@mui/material";
import { useState } from "react";

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
    CelestialOptions,
} from "d3-celestial/celestial";
import { useForm, Controller } from "react-hook-form";
import { Control, Path, useController } from "react-hook-form";

import styled from "@emotion/styled";

interface ThemePickerProps<FieldValues> {
    name: Path<FieldValues>;
    control: Control<FieldValues>;
    label?: string;
    themes: Array<{
        id: number;
        name: string;
        preview?: string;
    }>
}

const ThemesContainer = styled("div")(({ theme }) => {
    return {
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyItems: "center"
    }
});

const ThemeItem = styled("div")(({ theme }) => {
    return {
        flexBasis: "24%",
        cursor: "pointer",
        padding: "20px 0",
        "& .logo": {
            width: "54px",
            height: "64px",
            margin: "0 auto",
            background: "#F3F3F3",
        },
        "& .description": {
            fontSize: "10px",
            lineHeight: "12px",

            color: "#3F557F",
            padding: "5px",
            textAlign: "center"
        },

        "&.active ": {

            "& .logo": {
                background: "#818FAB",
            }
        }
    }
});


export function ThemePicker<FieldValues>({ name, control, label, themes }: ThemePickerProps<FieldValues>) {
    
    const controller = useController({
        name: name,
        control: control
    });

    return (<ThemesContainer>
        {themes.map((theme) =>
        (<ThemeItem onClick={(e) => { controller.field.onChange(theme.id) }} key={theme.id} className={controller.field.value == theme.id.toString() ? "active" : ""}>
            <div className="logo"><img src={theme.preview} alt="" /></div>
            <div className="description">{theme.name}</div>
        </ThemeItem>))
        }

    </ThemesContainer >)
}
