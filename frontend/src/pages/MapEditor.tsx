import { AccordionDetails, Grid, TextField, Typography, Box, CardContent, Card, Button, FormControl, InputLabel, Select, MenuItem, Checkbox, FormControlLabel, TextareaAutosize, Switch, Container } from "@mui/material";
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

import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';

import MuiAccordionSummary, {
    AccordionSummaryProps,
} from '@mui/material/AccordionSummary';

import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';

import styled from "@emotion/styled";

const CardArea = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    /* padding-top: 2em; */
    height: calc(100vh - 64px);
`;

const CardContainer = styled.div`
    position: relative;
    width: 590px;
    height: 855px;
    transform: scale(0.75);
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
`;
const CardTextContainer = styled.div`
    position: absolute;
   bottom: 0; right: 0; left: 0;
    /* opacity: 0.5; */
    /* background-color: black; */
    padding: 15px;
    /* width: 100%; */
`;

const MapContainer = styled.div`
    width: 500px;
    height: 500px;
    overflow: hidden;
    border-radius: 50%;
    margin: 3em auto;
`;


const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid white`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor:
        //@ts-expect-error
        theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, .05)'
            : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        //@ts-expect-error
        marginLeft: theme.spacing(1),
    },
}));

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

                <CardArea className="card-area">
                    <CardContainer className="card-container" style={{ background: backProps.backgroundColor }}>
                        <MapContainer className="map-container" style={{ background: backProps.mapBackground }}>
                            <CelestialReact zoom={0} config={mapProps} />
                        </MapContainer>
                        <CardTextContainer className="text-container">
                            <Typography className="text-headline" color={backProps.headline.color} >{backProps.headline.text}</Typography>
                            <Typography className="text-divider" color={backProps.divider.color} >{backProps.divider.text}</Typography>
                            <Typography className="text-tagline" color={backProps.tagline.color} >{backProps.tagline.text}</Typography>
                            <Typography className="text-subline" color={backProps.subline.color} >{backProps.subline.text}</Typography>
                        </CardTextContainer>
                    </CardContainer>
                </CardArea>
            </Grid>
            <Grid container item xs={12} md={4} direction="column" >
                <Container>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            <Typography sx={{ width: '33%', flexShrink: 0 }} align="left">
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
                                                control={<Switch  {...field} checked={field.value} />}
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
                                                control={<Switch  {...field} checked={field.value} />}
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
                                                control={<Switch  {...field} checked={field.value} />}
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
                                                control={<Switch  {...field} checked={field.value} />}
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
                                                control={<Switch  {...field} checked={field.value} />}
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
                                                control={<Switch  {...field} checked={field.value} />}
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
                                                control={<Switch  {...field} checked={field.value} />}
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
                                                control={<Switch  {...field} checked={field.value} />}
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
                            <Typography sx={{ width: '33%', flexShrink: 0 }} align="left">
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
                            <Typography sx={{ width: '33%', flexShrink: 0 }} align="left">
                                Текст
                            </Typography>

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
                            <Typography sx={{ width: '33%', flexShrink: 0, }} align="left">
                                Вывод JSON
                            </Typography>

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
                            <Typography sx={{ width: '33%', flexShrink: 0, }} align="left">
                                CSS
                            </Typography>

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