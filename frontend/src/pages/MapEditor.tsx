import { Accordion, AccordionDetails, AccordionSummary, Grid, TextField, Typography, Box, CardContent, Card, Button, FormControl, InputLabel, Select, MenuItem, Checkbox, FormControlLabel, TextareaAutosize, Switch } from "@mui/material";
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
import DateTimePicker from '@mui/lab/DateTimePicker';

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
            zoomlevel: 1,
            width: 590,
            constellations: {
                lines: true,
                names: false
            },
            planets: {
                show: false,
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
                    show: false,
                    stroke: "#66cc66"
                },
                equatorial: {
                    show: false,
                    stroke: "#aaaaaa"
                },
                graticule: { show: false, stroke: "#cccccc", width: 0.6, opacity: 0.8, }
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

    // Celestial
    const backgroundForm = useForm<{
        backgroundColor?: string;
        title?: string;
    }>({
        defaultValues: {
            backgroundColor: "#022B30",
            title: "LOL"
        }
    });

    let mapProps = celestialForm.watch();
    let backProps = backgroundForm.watch();

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
                    <CardContainer style={{ background: backProps.backgroundColor }}>
                        <MapContainer>
                            <CelestialReact zoom={0} config={mapProps} />
                        </MapContainer>
                    </CardContainer>
                </CardArea>
            </Grid>
            <Grid container item xs={12} md={4} direction="column" >
                <Card>
                    <CardContent>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                            >
                                <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                    Параметры карты
                                </Typography>

                            </AccordionSummary>
                            <AccordionDetails>
                                <Grid container spacing={1}>


                                    <Grid item xs={12} md={6} direction="row">
                                        <Controller
                                            name="date"
                                            control={celestialForm.control}
                                            render={({ field }) =>
                                                <DateTimePicker
                                                    label="Date&Time picker"
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                    renderInput={(params: any) => <TextField {...params} />}
                                                />
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6} direction="row">
                                        <Controller
                                            name="lines.graticule.show"
                                            control={celestialForm.control}
                                            render={({ field }) =>
                                            <FormControlLabel
                                                label="Показывать сетку"
                                                control={<Switch  {...field} checked={field.value}  />}
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
                                                    control={<Switch  {...field} checked={field.value}  />}
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
                                                    control={<Switch  {...field} checked={field.value}  />}
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
                                                    control={<Switch  {...field} checked={field.value}  />}
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
                                                    control={<Switch  {...field} checked={field.value}  />}
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
                                                    control={<Switch  {...field} checked={field.value}  />}
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
                                                    control={<Switch  {...field} checked={field.value}  />}
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
                                                    control={<Switch  {...field} checked={field.value}  />}
                                                />
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6} direction="row">
                                        <FormControl sx={{ width: "100%" }}>
                                            <InputLabel htmlFor="age-simple"><Typography>Вид проекции</Typography></InputLabel>
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
                                        <Controller
                                            name="constellations.lines"
                                            control={celestialForm.control}
                                            defaultValue={true}
                                            rules={{ required: true }}
                                            render={({ field }) =>
                                                <FormControlLabel
                                                    label="Показывать линии"
                                                    control={<Switch  {...field} checked={field.value}  />}
                                                />
                                            }
                                        />
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
                        <Accordion >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                            >
                                <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                    Параметры фона
                                </Typography>

                            </AccordionSummary>
                            <AccordionDetails>

                                <Grid container spacing={1}>
                                    <Grid item xs={12} md={6} direction="row">
                                        <FormControl sx={{ width: "100%" }}>
                                            <ColorPicker name="backgroundColor" control={backgroundForm.control} label="Цвет фона"></ColorPicker>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                            >
                                <Typography sx={{ width: '33%', flexShrink: 0, }}>
                                    Вывод JSON
                                </Typography>

                            </AccordionSummary>
                            <AccordionDetails>
                                <TextField
                                   
                                    label="Multiline"
                                    multiline
                                    maxRows={7}
                                    
                                    sx={{width: "100%"}}
                                    value={JSON.stringify(mapProps, null, 2)}

                                />

                            </AccordionDetails>
                        </Accordion>
                        {/* <CheckoutButton /> */}
                    </CardContent>
                </Card>

            </Grid>
        </Grid>
    </div >
}