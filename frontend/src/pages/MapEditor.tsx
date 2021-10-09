import { Accordion, AccordionDetails, AccordionSummary, Grid, TextField, Typography, Box, CardContent, Card, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Celestial } from "d3-celestial/celestial";
import { useState } from "react";
import { CelestialReact } from "../components/CelestialForeign";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { CheckoutButton } from "../components/buttons/CheckOutButton";
import {
    CelestialOptions,
} from "d3-celestial/celestial";

import { SketchPicker } from 'react-color';

export function MapEditorPage() {
    // Accordion control
    const [expanded, setExpanded] = useState<string | false>("panel1");

    const [text, setText] = useState({
        title: "",
        subTitle: "",

    })

    const [mapProps, setMapProps] = useState<CelestialOptions>({
        center: [0, 3, 0],
        projection: "airy",
        controls: false,
        zoomlevel: 2,
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
            fill: "#cccccc"
        }
    })



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
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    minHeight="70vh"
                    height="70vh"
                >
                    <div style={{ width: "100%", height: "100%" }}>
                        <CelestialReact zoom={0} config={mapProps} />
                    </div>
                </Box>
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
                                        <FormControl sx={{ width: "100%" }}>
                                            <InputLabel htmlFor="age-simple">Показывать планеты</InputLabel>
                                            <Select
                                                value={mapProps.planets?.show ? "yes" : "no"}
                                                onChange={(val) => {
                                                    setMapProps((prev) => ({
                                                        ...prev, planets: {
                                                            ...mapProps.planets,
                                                            show: val.target.value == "yes"
                                                        }
                                                    }))
                                                }}
                                                inputProps={{
                                                    name: 'age',
                                                    id: 'age-simple',
                                                }}
                                            >
                                                <MenuItem value={"yes"}>Да</MenuItem>
                                                <MenuItem value={"no"}>Нет</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={6} direction="row">
                                        <FormControl sx={{ width: "100%" }}>
                                            <InputLabel htmlFor="age-simple"><Typography>Показывать звезды</Typography></InputLabel>
                                            <Select
                                                value={mapProps.stars?.show ? "yes" : "no"}
                                                onChange={(val) => {
                                                    setMapProps((prev) => ({
                                                        ...prev, stars: {
                                                            ...mapProps.stars,
                                                            show: val.target.value == "yes"
                                                        }
                                                    }))
                                                }}
                                                inputProps={{
                                                    name: 'age',
                                                    id: 'age-simple',
                                                }}
                                            >
                                                <MenuItem value={"yes"}>Да</MenuItem>
                                                <MenuItem value={"no"}>Нет</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={6} direction="row">
                                        <FormControl sx={{ width: "100%" }}>
                                            <InputLabel htmlFor="age-simple"><Typography>Вид проекции</Typography></InputLabel>
                                            <Select
                                                value={mapProps.projection}
                                                onChange={(val) => {
                                                    // @ts-expect-error
                                                    setMapProps((prev) => ({
                                                        ...prev, projection: val.target.value
                                                    }))
                                                }}

                                            >
                                                <MenuItem value={"orthographic"}>Ортографическая</MenuItem>
                                                <MenuItem value={"airy"}>Воздушная</MenuItem>

                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={6} direction="row">
                                        <FormControl sx={{ width: "100%" }}>
                                            <InputLabel htmlFor="age-simple"><Typography>Вид проекции</Typography></InputLabel>
                                            <SketchPicker
                                                color={mapProps.background?.fill}
                                                onChangeComplete={color => setMapProps((prev) => ({ ...prev, background: { ...prev.background, fill: color.hex } }))}


                                            />
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