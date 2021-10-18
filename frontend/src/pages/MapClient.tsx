import { AccordionDetails, Grid, TextField, Typography, Box, CardContent, Card, Button, FormControl, InputLabel, Select, MenuItem, Checkbox, FormControlLabel, TextareaAutosize, Switch, Container } from "@mui/material";
import { useState } from "react";
import { CelestialReact } from "../components/CelestialForeign";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
    CelestialOptions,
} from "d3-celestial/celestial";
import { useForm, Controller } from "react-hook-form";
import { ColorPicker } from "../components/form/ColorPicker";
import styled from "@emotion/styled";
import { Accordion, AccordionSummary } from "../components/editor/Accordion";
import { CheckoutButton } from "../components/buttons/CheckOutButton";

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


export function MapClientPage() {
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
            <Grid container item xs={12} md={8} direction="column" >

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
            <Grid item xs={12} md={4} direction="column" style={{
                padding: "0px 0px"
            }} spacing={0}>
                <Box sx={{
                    padding: "10px 0px 5px 20px"
                }}>

                    <Typography fontSize="12px" fontWeight="700" align="left" color="#C5C5C5">Customize your star map</Typography>
                    <Typography fontSize="12px" fontWeight="700" align="left" color="#C5C5C5">Change zodiac, labels and appearance</Typography>
                </Box>
                <Box sx={{ boxShadow: "-5px -5px 10px rgba(0, 0, 0, 0.05)", paddingBottom: "10px" }}>
                    <Typography align="left" fontSize="12px" fontWeight="400">
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                            >
                                <Typography sx={{ flexShrink: 0 }} align="left" fontSize="12px">
                                    Параметры карты
                                </Typography>

                            </AccordionSummary>
                            <AccordionDetails>
                                <Grid container spacing={1}>



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
                                <Typography sx={{ flexShrink: 0 }} align="left" fontSize="12px">
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
                                <Typography sx={{ flexShrink: 0 }} align="left" fontSize="12px">
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

                                </Grid>
                            </AccordionDetails>
                        </Accordion>
                    </Typography>
                    <Box sx={{  padding: "10px", background:"#FFFFFF", border: "1px solid #EEEEEE", }}>
                        <CheckoutButton />
                    </Box>

                </Box>

            </Grid>
        </Grid>
    </div >
}