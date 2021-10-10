import { Accordion, AccordionDetails, AccordionSummary, Grid, TextField, Typography, Box, CardContent, Card, Button, FormControl, InputLabel, Select, MenuItem, Checkbox, FormControlLabel } from "@mui/material";
import { Celestial } from "d3-celestial/celestial";
import { useState } from "react";
import { CelestialReact } from "../components/CelestialForeign";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { CheckoutButton } from "../components/buttons/CheckOutButton";
import {
    CelestialOptions,
} from "d3-celestial/celestial";

import { SketchPicker } from 'react-color';
import { useForm, Controller } from "react-hook-form";
import { ColorPicker } from "../components/form/ColorPicker";

import styled from "@emotion/styled";

const CardArea = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const CardContainer = styled.div`
    position: relative;
    width: 590px;
    height: 855px;
`;
const CardOverlay = styled.div`
    position: absolute;
    top:0; bottom: 0; right: 0; left: 0;
    opacity: 0.5;
    background-color: black;
    width: 500px;
    height: 800px;
`;

const MapContainer = styled.div`
    position: absolute;
    top:0; right: 0; left: 0;
    width: 590px;
    height: 590px;
    overflow: hidden;
    border-radius: 50%;
`;


export function MapEditorPage() {
    // Accordion control
    const [expanded, setExpanded] = useState<string | false>("panel1");

    // Celestial
    const celestialForm = useForm<CelestialOptions>({
        defaultValues: {
            center: [0, 3, 0],
            projection: "airy",
            controls: false,
            zoomlevel: 0,
            width: 590,
            constellations: {
                names: false
            },
            planets: {
                show: true,
                names: false,
            },

            stars: {
                show: true
            },
            dsos: {
                show: false,
            },
            background: {
                fill: "#000"
            },
            lines: {
                ecliptic: {
                    show: true,
                    stroke: "#66cc66"
                },
                equatorial: {
                    show: true,
                    stroke: "#aaaaaa"
                }
            },
            mw: {
                show: true,
                style: {
                    fill: "#ffffff",
                    opacity: 0.15
                }
            },
            horizon: {
                show: false,
                fill: "#000000"
            },

        }
    });

    let mapProps = celestialForm.watch();



    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };


    return <div>
        <Grid container spacing={1} sx={{
            "minHeight": "100vh"
        }} >
            <Grid container item xs={12} md={8} direction="column" sx={{
                // "pointerEvents": "none"
            }} >

                <CardArea>
                    <CardContainer >
                        <MapContainer>
                            <CelestialReact zoom={0} config={mapProps} />
                        </MapContainer>
                    </CardContainer>
                </CardArea>
            </Grid>
            <Grid container item xs={12} md={4} direction="column" >
                <Card>
                    <CardContent>
                        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                            >
                                <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                    Опции редактора
                                </Typography>

                            </AccordionSummary>
                            <AccordionDetails>
                                <Grid container spacing={1} sx={{ color: "#FFF" }}>
                                    <Grid item xs={12} md={6} direction="row">
                                        <Controller
                                            name="planets.show"
                                            control={celestialForm.control}
                                            render={({ field }) =>
                                                <FormControlLabel
                                                    label="Показывать планеты"
                                                    control={<Checkbox {...field} checked={field.value} />}
                                                />
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6} direction="row">
                                        <Controller
                                            name="lines.equatorial.show"
                                            control={celestialForm.control}
                                            render={({ field }) =>
                                                <FormControlLabel
                                                    label="Показать линию экватора"
                                                    control={<Checkbox {...field} checked={field.value} />}
                                                />
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6} direction="row">
                                        <Controller
                                            name="lines.ecliptic.show"
                                            control={celestialForm.control}
                                            render={({ field }) =>
                                                <FormControlLabel
                                                    label="Показать линию ecliptic"
                                                    control={<Checkbox {...field} checked={field.value} />}
                                                />
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6} direction="row">
                                        <Controller
                                            name="dsos.show"
                                            control={celestialForm.control}
                                            render={({ field }) =>
                                                <FormControlLabel
                                                    label="Показать Deep Space обьекты"
                                                    control={<Checkbox {...field} checked={field.value} />}
                                                />
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6} direction="row">
                                        <Controller
                                            name="mw.show"
                                            control={celestialForm.control}
                                            render={({ field }) =>
                                                <FormControlLabel
                                                    label="Показать млечный путь"
                                                    control={<Checkbox {...field} checked={field.value} />}
                                                />
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6} direction="row">
                                        <Controller
                                            name="planets.show"
                                            control={celestialForm.control}
                                            render={({ field }) =>
                                                <FormControlLabel
                                                    label="Показывать планеты"
                                                    control={<Checkbox {...field} checked={field.value} />}
                                                />
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6} direction="row">
                                        <Controller
                                            name="stars.show"
                                            control={celestialForm.control}
                                            defaultValue={true}
                                            rules={{ required: true }}
                                            render={({ field }) =>
                                                <FormControlLabel
                                                    label="Показывать звезды"
                                                    control={<Checkbox {...field} checked={field.value} />}
                                                />
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6} direction="row">
                                        <FormControl sx={{ width: "100%" }}>
                                            <InputLabel htmlFor="age-simple"><Typography color={"white"}>Вид проекции</Typography></InputLabel>
                                            <Controller
                                                name="projection"
                                                control={celestialForm.control}
                                                render={({ field }) =>
                                                    <Select {...field}>
                                                        <MenuItem value={"orthographic"}>Ортографическая</MenuItem>
                                                        <MenuItem value={"airy"}>Воздушная</MenuItem>
                                                    </Select>
                                                }
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={6} direction="row">
                                        <FormControl sx={{ width: "100%" }}>

                                            <ColorPicker name="background.fill" control={celestialForm.control} label="Цвет заливки"></ColorPicker>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={6} direction="row">
                                        <FormControl sx={{ width: "100%" }}>
                                            <ColorPicker name="constellations.lineStyle.stroke" control={celestialForm.control} label="Цвет линий созвездий"></ColorPicker>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={6} direction="row">
                                        <FormControl sx={{ width: "100%" }}>
                                            <ColorPicker name="horizon.stroke" control={celestialForm.control} label="Цвет линии горизонта"></ColorPicker>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={6} direction="row">
                                        <FormControl sx={{ width: "100%" }}>
                                            <ColorPicker name="horizon.fill" control={celestialForm.control} label="Цвет заливки горизонта"></ColorPicker>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={6} direction="row">
                                        <FormControl sx={{ width: "100%" }}>
                                            <ColorPicker name="mw.style.fill" control={celestialForm.control} label="Цвет заливки млечного пути"></ColorPicker>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={6} direction="row">
                                        <FormControl sx={{ width: "100%" }}>
                                            <ColorPicker name="lines.ecliptic.stroke" control={celestialForm.control} label="Цвет линии ecliptic"></ColorPicker>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={6} direction="row">
                                        <FormControl sx={{ width: "100%" }}>
                                            <ColorPicker name="lines.equatorial.stroke" control={celestialForm.control} label="Цвет линии galactic"></ColorPicker>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                            >
                                <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                    Вывод JSON
                                </Typography>

                            </AccordionSummary>
                            <AccordionDetails>

                                <Typography align="left">
                                    <pre>
                                        {JSON.stringify(mapProps, null, 2)}
                                    </pre>
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <CheckoutButton />
                    </CardContent>
                </Card>

            </Grid>
        </Grid>
    </div >
}