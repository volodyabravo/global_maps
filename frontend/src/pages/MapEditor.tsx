import { AccordionDetails, Grid, TextField, Typography, Box, CardContent, Card, Button, FormControl, InputLabel, Select, MenuItem, Checkbox, FormControlLabel, TextareaAutosize, Switch, Container, Slider } from "@mui/material";

import { useState } from "react";
import { CelestialReact } from "../components/CelestialForeign";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
    CelestialOptions,
} from "d3-celestial/celestial";

import { useForm, Controller } from "react-hook-form";
import { ColorPicker } from "../components/form/ColorPicker";
import DateTimePicker from '@mui/lab/DateTimePicker';

import styled from "@emotion/styled";
import { Accordion, AccordionSummary } from "../components/editor/Accordion";
import { MapTheme, MapThemeData } from "../api/themes";
import { MapView } from "../components/MapView";


export function MapEditorPage() {
    // Accordion control
    const [expanded, setExpanded] = useState<string | false>("panel1");

    // Celestial
    const celestialForm = useForm<MapThemeData>({
        defaultValues: {
            celestial: {
                center: [0, 3, 0],
                projection: "airy",
                controls: false,
                zoomlevel: 1,
                width: 500,
                constellations: {
                    lines: true,
                    names: false
                },
                planets: {
                    show: false,
                    names: false,
                },

                stars: {
                    show: true,
                    colors: false,
                    style: {
                        fill: "#FFF",
                        opacity: 1,
                    }
                },
                dsos: {
                    show: false,
                },
                background: {
                    fill: "#000",
                    opacity: 1
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

        }
    });

    // Celestial
    const backgroundForm = useForm<{
        customCss: string;
        backgroundColor?: string;
        mapBackground?: string;
        title?: string;
        headline: {
            color: string,
            text: string
        },
        divider: {
            color: string,
            text: string
        }
        tagline: {
            color: string,
            text: string
        },
        subline: {
            color: string,
            text: string
        }
    }>({
        defaultValues: {
            customCss: `
                .map-container {

                }
                .card-container {

                }
                .card-area {

                }
                .text-container {

                }
                .text-headline {

                }
                .text-divider {

                }
                .text-tagline {

                }
                .text-subline {

                }

            `,
            backgroundColor: "#022B30FF",
            mapBackground: "#022B30FF",
            headline: {
                color: "#FFF",
                text: "Paris"
            },
            divider: {
                color: "#FFF",
                text: "France"
            },
            tagline: {
                color: "#FFF",
                text: "SEPTEMBER 10TH 2019"
            },
            subline: {
                color: "#FFF",
                text: "48.856°N / 2.3522°E"
            }

        }
    });

    let mapProps = celestialForm.watch();
    let backProps = backgroundForm.watch();

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    return <div>
        <style dangerouslySetInnerHTML={{
            __html: backProps.customCss
        }} />
        <Grid container spacing={1} sx={{
            "minHeight": "100vh"
        }} >
            <Grid container item xs={12} md={8} direction="column" sx={{
                // "pointerEvents": "none"
            }} >
                <MapView theme={{
                    data: JSON.parse(JSON.stringify(mapProps))
                }} />

            </Grid>
            <Grid container item xs={12} md={4} direction="column" >
                <Container>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                        >
                            Звезды
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={1}>

                                <Grid item xs={12} md={6} direction="row">
                                    <Controller
                                        name="celestial.stars.show"
                                        control={celestialForm.control}
                                        defaultValue={true}
                                        rules={{ required: true }}
                                        render={({ field }) =>
                                            <FormControlLabel
                                                label="Показывать звезды"
                                                control={<Switch  {...field} checked={field.value} />}
                                            />
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} direction="row">
                                    <Controller
                                        name="celestial.stars.colors"
                                        control={celestialForm.control}
                                        defaultValue={false}
                                        rules={{ required: true }}
                                        render={({ field }) =>
                                            <FormControlLabel
                                                label="Разноцветные звезды"
                                                control={<Switch  {...field} checked={field.value} />}
                                            />
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} direction="row">
                                    <FormControl sx={{ width: "100%" }}>
                                        <ColorPicker name="celestial.stars.style.fill" control={celestialForm.control} label="Цвет звезд"></ColorPicker>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={6} direction="row">
                                    <Controller
                                        name="celestial.stars.style.opacity"
                                        control={celestialForm.control}
                                        defaultValue={1}
                                        rules={{ required: true }}
                                        render={({ field }) =>
                                            <FormControlLabel
                                                label="Яркость звезды"
                                                control={<Slider step={0.1} min={0} max={1}  {...field} />}
                                            />
                                        }
                                    />
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                        >
                            Фон
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={1}>
                                <Grid item xs={12} md={6} direction="row">
                                    <FormControl sx={{ width: "100%" }}>
                                        <ColorPicker name="celestial.background.fill" control={celestialForm.control} label="Цвет фона"></ColorPicker>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={6} direction="row">
                                    <Controller
                                        name="celestial.background.opacity"
                                        control={celestialForm.control}
                                        defaultValue={1}
                                        rules={{ required: true }}
                                        render={({ field }) =>
                                            <FormControlLabel
                                                label="Непрозрачность фона"
                                                control={<Slider step={0.01} min={0} max={1}  {...field} />}
                                            />
                                        }
                                    />
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            Параметры карты
                        </AccordionSummary>
                        <AccordionDetails>

                            <Grid container spacing={1}>
                                <Grid item xs={12} md={6} direction="row">
                                    <Controller
                                        name="celestial.dsos.show"
                                        control={celestialForm.control}
                                        render={({ field }) =>
                                            <FormControlLabel
                                                label="Показать Deep Space обьекты"
                                                control={<Switch  {...field} checked={field.value} />}
                                            />
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} direction="row">
                                    <Controller
                                        name="celestial.date"
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
                                        name="celestial.lines.graticule.show"
                                        control={celestialForm.control}
                                        render={({ field }) =>
                                            <FormControlLabel
                                                label="Показывать сетку"
                                                control={<Switch  {...field} checked={field.value} />}
                                            />
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} direction="row">
                                    <Controller
                                        name="celestial.planets.show"
                                        control={celestialForm.control}
                                        render={({ field }) =>
                                            <FormControlLabel
                                                label="Показывать планеты"
                                                control={<Switch  {...field} checked={field.value} />}
                                            />
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} direction="row">
                                    <Controller
                                        name="celestial.lines.equatorial.show"
                                        control={celestialForm.control}
                                        render={({ field }) =>
                                            <FormControlLabel
                                                label="Показать линию экватора"
                                                control={<Switch  {...field} checked={field.value} />}
                                            />
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} direction="row">
                                    <Controller
                                        name="celestial.lines.ecliptic.show"
                                        control={celestialForm.control}
                                        render={({ field }) =>
                                            <FormControlLabel
                                                label="Показать линию ecliptic"
                                                control={<Switch  {...field} checked={field.value} />}
                                            />
                                        }
                                    />
                                </Grid>

                                <Grid item xs={12} md={6} direction="row">
                                    <Controller
                                        name="celestial.mw.show"
                                        control={celestialForm.control}
                                        render={({ field }) =>
                                            <FormControlLabel
                                                label="Показать млечный путь"
                                                control={<Switch  {...field} checked={field.value} />}
                                            />
                                        }
                                    />
                                </Grid>

                                <Grid item xs={12} md={6} direction="row">
                                    <FormControl sx={{ width: "100%" }}>
                                        <InputLabel htmlFor="age-simple"><Typography>Вид проекции</Typography></InputLabel>
                                        <Controller
                                            name="celestial.projection"
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
                                        name="celestial.constellations.lines"
                                        control={celestialForm.control}
                                        defaultValue={true}
                                        rules={{ required: true }}
                                        render={({ field }) =>
                                            <FormControlLabel
                                                label="Показывать линии"
                                                control={<Switch  {...field} checked={field.value} />}
                                            />
                                        }
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={1}>

                                <Grid item xs={12} md={6} direction="row">
                                    <FormControl sx={{ width: "100%" }}>
                                        <ColorPicker name="celestial.background.fill" control={celestialForm.control} label="Цвет заливки"></ColorPicker>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={6} direction="row">
                                    <FormControl sx={{ width: "100%" }}>
                                        <ColorPicker name="celestial.constellations.lineStyle.stroke" control={celestialForm.control} label="Цвет линий созвездий"></ColorPicker>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={6} direction="row">
                                    <FormControl sx={{ width: "100%" }}>
                                        <ColorPicker name="celestial.horizon.stroke" control={celestialForm.control} label="Цвет линии горизонта"></ColorPicker>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={6} direction="row">
                                    <FormControl sx={{ width: "100%" }}>
                                        <ColorPicker name="celestial.horizon.fill" control={celestialForm.control} label="Цвет заливки горизонта"></ColorPicker>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={6} direction="row">
                                    <FormControl sx={{ width: "100%" }}>
                                        <ColorPicker name="celestial.mw.style.fill" control={celestialForm.control} label="Цвет заливки млечного пути"></ColorPicker>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={6} direction="row">
                                    <FormControl sx={{ width: "100%" }}>
                                        <ColorPicker name="celestial.lines.ecliptic.stroke" control={celestialForm.control} label="Цвет линии ecliptic"></ColorPicker>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={6} direction="row">
                                    <FormControl sx={{ width: "100%" }}>
                                        <ColorPicker name="celestial.lines.equatorial.stroke" control={celestialForm.control} label="Цвет линии galactic"></ColorPicker>
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
                            Параметры фона
                        </AccordionSummary>
                        <AccordionDetails>

                            <Grid container spacing={1}>
                                <Grid item xs={12} md={6} direction="row">
                                    <FormControl sx={{ width: "100%" }}>
                                        <ColorPicker name="backgroundColor" control={backgroundForm.control} label="Цвет фона"></ColorPicker>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={6} direction="row">
                                    <FormControl sx={{ width: "100%" }}>
                                        <ColorPicker name="mapBackground" control={backgroundForm.control} label="Цвет карты"></ColorPicker>
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
                            Текст
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={1}>
                                <Grid item xs={12} md={6} direction="row">
                                    <FormControl sx={{ width: "100%" }}>
                                        <ColorPicker name="headline.color" control={backgroundForm.control} label="Цвет заголовка"></ColorPicker>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={6} direction="row">
                                    <FormControl sx={{ width: "100%" }}>
                                        <ColorPicker name="divider.color" control={backgroundForm.control} label="Цвет разделителя"></ColorPicker>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={6} direction="row">
                                    <FormControl sx={{ width: "100%" }}>
                                        <ColorPicker name="tagline.color" control={backgroundForm.control} label="Цвет тэглайна"></ColorPicker>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={6} direction="row">
                                    <FormControl sx={{ width: "100%" }}>
                                        <ColorPicker name="subline.color" control={backgroundForm.control} label="Цвет сублайна"></ColorPicker>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={6} direction="row">
                                    <Controller
                                        name="headline.text"
                                        control={backgroundForm.control}
                                        render={({ field }) =>
                                            <TextField label={"Текст заголовка"} {...field} />
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} direction="row">
                                    <Controller
                                        name="divider.text"
                                        control={backgroundForm.control}
                                        render={({ field }) =>
                                            <TextField label={"Текст разделителя"} {...field} />
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} direction="row">
                                    <Controller
                                        name="tagline.text"
                                        control={backgroundForm.control}
                                        render={({ field }) =>
                                            <TextField label={"Текст тэглайна"} {...field} />
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} direction="row">
                                    <Controller
                                        name="subline.text"
                                        control={backgroundForm.control}
                                        render={({ field }) =>
                                            <TextField label={"Текст сублайна"} {...field} />
                                        }
                                    />
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
                            Вывод JSON
                        </AccordionSummary>
                        <AccordionDetails>
                            <TextField
                                label="Multiline"
                                multiline
                                maxRows={7}
                                sx={{ width: "100%" }}
                                value={JSON.stringify(mapProps, null, 2)}
                            />
                        </AccordionDetails>
                    </Accordion>
                    <Accordion >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            CSS
                        </AccordionSummary>
                        <AccordionDetails>
                            <Controller
                                name="customCss"
                                control={backgroundForm.control}
                                render={({ field }) =>
                                    <TextField

                                        label={"Свой CSS"} {...field}
                                        multiline
                                        maxRows={20}
                                        sx={{ width: "100%" }}
                                    />
                                }
                            />

                        </AccordionDetails>
                    </Accordion>
                </Container>
                {/* <CheckoutButton /> */}
            </Grid>
        </Grid>
    </div >
}