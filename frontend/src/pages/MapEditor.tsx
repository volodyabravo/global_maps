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
import { toast } from "react-toastify";


export function MapEditorPage() {
    // Accordion control
    const [expanded, setExpanded] = useState<string | false>("1");

    const [JSONField, setJSONField] = useState<string>("");

    // Celestial
    const celestialForm = useForm<MapThemeData>({
        defaultValues: {
            maptype: "celestial",
            layout: "CelestialFullBackground",
            celestial: {
                // disableAnimations: true,
                follow:"center",
                center: [0, 3, 0],
                projection: "airy",
                controls: false,
                zoomlevel: 1,
                width: 500,
                constellations: {
                    lines: true,
                    names: false,
                    lineStyle: {
                        opacity: 0.6,
                        stroke: "#cccccc",
                        width: 1
                    }
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
                        stroke: "#66cc66",
                        width: 1.3,
                        opacity: 0.7,
                    },
                    equatorial: {
                        show: false,
                        stroke: "#aaaaaa",
                        width: 1.3,
                        opacity: 0.7,
                    },
                    graticule: {
                        show: false,
                        stroke: "#cccccc",
                        width: 0.6,
                        opacity: 0.8,
                    }
                },
                mw: {
                    show: false,
                    style: {
                        fill: "#ffffff",
                        opacity: 0.15
                    }
                },
                horizon: {
                    show: false,
                    stroke: "#ccc",
                    fill: "#000000"
                },
            },
            cardSettings: {
                fonts: {
                    headline: {
                        letterSpacing: "0.15em",
                        color: "black",
                        fontFamily: "Roboto",
                        fontWeight: 500,
                    },
                    subline: {
                        letterSpacing: "0.2em",
                        color: "black",
                        fontFamily: "Roboto",
                        fontWeight: 500,
                    },
                    divider: {
                        letterSpacing: "0.2em",
                        color: "black",
                        fontFamily: "Roboto",
                        fontWeight: 500,
                    },
                    tagline: {
                        letterSpacing: "0.2em",
                        color: "black",
                        fontFamily: "Roboto",
                        fontWeight: 500,
                    }
                },
                defaultText: {
                    headline: "Заголовок",
                    subline: "Саблайн",
                    divider: "Разделитель",
                    tagline: "Тэглайн"
                }
            },

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
            `

        },
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
                <MapView theme={{
                    data: JSON.parse(JSON.stringify(mapProps))
                }} />

            </Grid>
            <Grid container item xs={12} md={4} direction="column" >
                <Container>

                    <Accordion expanded={expanded === '0'} onChange={handleChange('0')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                        >
                            Основные параметры
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={1}>
                                <Grid item xs={12} md={6} direction="row">
                                    <FormControl sx={{ width: "100%" }}>
                                        <InputLabel htmlFor="age-simple">
                                            <Typography>Разметка</Typography>
                                        </InputLabel>
                                        <Controller
                                            name="layout"
                                            control={celestialForm.control}
                                            render={({ field }) =>
                                                <Select {...field}>
                                                    <MenuItem value={"CelestialFullBackground"}>Полный фон</MenuItem>
                                                    <MenuItem value={"CelestialCircle"}>С кругом</MenuItem>
                                                </Select>
                                            }
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={6} direction="row">
                                    <FormControl sx={{ width: "100%" }}>
                                        <InputLabel htmlFor="age-simple">
                                            <Typography>Тип карты</Typography>
                                        </InputLabel>
                                        <Controller
                                            name="maptype"
                                            control={celestialForm.control}
                                            render={({ field }) =>
                                                <Select {...field}>
                                                    <MenuItem value={"celestial"}>Звездная карта</MenuItem>
                                                </Select>
                                            }
                                        />
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === '1'} onChange={handleChange('1')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                        >
                            Параметры рамки
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={1}>
                                <Grid item xs={12} md={6} direction="row">
                                    <FormControl sx={{ width: "100%" }}>
                                        <ColorPicker name="frameSettings.color" control={celestialForm.control} label="Цвет фона рамки"></ColorPicker>
                                    </FormControl>
                                </Grid><Grid item xs={12} md={12} direction="row">

                                    <Controller
                                        name="frameSettings.padding"
                                        control={celestialForm.control}
                                        render={({ field }) =>
                                            <TextField fullWidth label={"Отступы рамки"} {...field} />
                                        }
                                    />
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === '2'} onChange={handleChange('2')} >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                        >
                            Параметры фона
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={1}>
                                <Grid item xs={12} md={6} direction="row">
                                    <FormControl sx={{ width: "100%" }}>
                                        <ColorPicker name="cardSettings.background.color" control={celestialForm.control} label="Цвет фона карточки"></ColorPicker>
                                    </FormControl>
                                </Grid><Grid item xs={12} md={12} direction="row">

                                    <Controller
                                        name="cardSettings.background.image"
                                        control={celestialForm.control}
                                        render={({ field }) =>
                                            <TextField fullWidth label={"Фон изображения"} {...field} />
                                        }
                                    />
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === '3'} onChange={handleChange('3')} >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                        >
                            Импорт JSON
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={1}>
                                <TextField
                                    label="Multiline"
                                    multiline
                                    maxRows={7}
                                    sx={{ width: "100%" }}
                                    value={JSONField}
                                    onChange={(val) => { setJSONField(val.currentTarget.value) }}
                                />
                                <Button variant="contained" onClick={() => {
                                    celestialForm.reset(JSON.parse(JSONField))
                                    toast("Тема импортирована")
                                }}>Импорт</Button>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === '4'} onChange={handleChange('4')} >
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
                    <Accordion expanded={expanded === '5'} onChange={handleChange('5')} >
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
                    <Accordion expanded={expanded === '6'} onChange={handleChange('6')} >
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
                                        <ColorPicker name="celestial.constellations.lineStyle.stroke" control={celestialForm.control} label="Цвет линий созвездий"></ColorPicker>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === '7'} onChange={handleChange('7')}  >
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
                                        <ColorPicker name="cardSettings.fonts.headline.color" control={celestialForm.control} label="Цвет заголовка"></ColorPicker>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={6} direction="row">
                                    <FormControl sx={{ width: "100%" }}>
                                        <ColorPicker name="cardSettings.fonts.divider.color" control={celestialForm.control} label="Цвет разделителя"></ColorPicker>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={6} direction="row">
                                    <FormControl sx={{ width: "100%" }}>
                                        <ColorPicker name="cardSettings.fonts.tagline.color" control={celestialForm.control} label="Цвет тэглайна"></ColorPicker>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={6} direction="row">
                                    <FormControl sx={{ width: "100%" }}>
                                        <ColorPicker name="cardSettings.fonts.subline.color" control={celestialForm.control} label="Цвет сублайна"></ColorPicker>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12} md={6} direction="row">
                                    <Controller
                                        name="cardSettings.fonts.headline.fontWeight"
                                        control={celestialForm.control}
                                        render={({ field }) =>
                                            <TextField label={"Толщина headline"} {...field} />
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} direction="row">
                                    <Controller
                                        name="cardSettings.fonts.divider.fontWeight"
                                        control={celestialForm.control}
                                        render={({ field }) =>
                                            <TextField label={"Толщина divider"} {...field} />
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} direction="row">
                                    <Controller
                                        name="cardSettings.fonts.tagline.fontWeight"
                                        control={celestialForm.control}
                                        render={({ field }) =>
                                            <TextField label={"Толщина tagline"} {...field} />
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} direction="row">
                                    <Controller
                                        name="cardSettings.fonts.subline.fontWeight"
                                        control={celestialForm.control}
                                        render={({ field }) =>
                                            <TextField label={"Толщина subline"} {...field} />
                                        }
                                    />
                                </Grid>


                                <Grid item xs={12} md={6} direction="row">
                                    <Controller
                                        name="cardSettings.fonts.headline.fontFamily"
                                        control={celestialForm.control}
                                        render={({ field }) =>
                                            <TextField label={"Шрифт headline"} {...field} />
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} direction="row">
                                    <Controller
                                        name="cardSettings.fonts.divider.fontFamily"
                                        control={celestialForm.control}
                                        render={({ field }) =>
                                            <TextField label={"Шрифт divider"} {...field} />
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} direction="row">
                                    <Controller
                                        name="cardSettings.fonts.tagline.fontFamily"
                                        control={celestialForm.control}
                                        render={({ field }) =>
                                            <TextField label={"Шрифт tagline"} {...field} />
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} direction="row">
                                    <Controller
                                        name="cardSettings.fonts.subline.fontFamily"
                                        control={celestialForm.control}
                                        render={({ field }) =>
                                            <TextField label={"Шрифт subline"} {...field} />
                                        }
                                    />
                                </Grid>

                                <Grid item xs={12} md={6} direction="row">
                                    <Controller
                                        name="cardSettings.fonts.headline.fontSize"
                                        control={celestialForm.control}
                                        render={({ field }) =>
                                            <TextField label={"Размер шрифта headline"} {...field} />
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} direction="row">
                                    <Controller
                                        name="cardSettings.fonts.divider.fontSize"
                                        control={celestialForm.control}
                                        render={({ field }) =>
                                            <TextField label={"Размер шрифта divider"} {...field} />
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} direction="row">
                                    <Controller
                                        name="cardSettings.fonts.tagline.fontSize"
                                        control={celestialForm.control}
                                        render={({ field }) =>
                                            <TextField label={"Размер шрифта tagline"} {...field} />
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} direction="row">
                                    <Controller
                                        name="cardSettings.fonts.subline.fontSize"
                                        control={celestialForm.control}
                                        render={({ field }) =>
                                            <TextField label={"Размер шрифта subline"} {...field} />
                                        }
                                    />
                                </Grid>



                                <Grid item xs={12} md={6} direction="row">
                                    <Controller
                                        name="cardSettings.fonts.headline.paddingBottom"
                                        control={celestialForm.control}
                                        render={({ field }) =>
                                            <TextField label={"Отступ текста headline"} {...field} />
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} direction="row">
                                    <Controller
                                        name="cardSettings.fonts.divider.paddingBottom"
                                        control={celestialForm.control}
                                        render={({ field }) =>
                                            <TextField label={"Отступ текста divider"} {...field} />
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} direction="row">
                                    <Controller
                                        name="cardSettings.fonts.tagline.paddingBottom"
                                        control={celestialForm.control}
                                        render={({ field }) =>
                                            <TextField label={"Отступ текста tagline"} {...field} />
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} direction="row">
                                    <Controller
                                        name="cardSettings.fonts.subline.paddingBottom"
                                        control={celestialForm.control}
                                        render={({ field }) =>
                                            <TextField label={"Отступ текста subline"} {...field} />
                                        }
                                    />
                                </Grid>

                                <Grid item xs={12} md={6} direction="row">
                                    <Controller
                                        name="cardSettings.defaultText.headline"
                                        control={celestialForm.control}
                                        render={({ field }) =>
                                            <TextField label={"Текст заголовка по умолчанию"} {...field} />
                                        }
                                    />
                                </Grid>


                                <Grid item xs={12} md={6} direction="row">
                                    <Controller
                                        name="cardSettings.defaultText.divider"
                                        control={celestialForm.control}
                                        render={({ field }) =>
                                            <TextField label={"Текст разделителя по умолчанию"} {...field} />
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} direction="row">
                                    <Controller
                                        name="cardSettings.defaultText.tagline"
                                        control={celestialForm.control}
                                        render={({ field }) =>
                                            <TextField label={"Текст тэглайна по умолчанию"} {...field} />
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} direction="row">
                                    <Controller
                                        name="cardSettings.defaultText.subline"
                                        control={celestialForm.control}
                                        render={({ field }) =>
                                            <TextField label={"Текст сублайна по умолчанию"} {...field} />
                                        }
                                    />
                                </Grid>

                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === '8'} onChange={handleChange('8')} >
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

                            <Button variant="contained" onClick={() => {
                                let text = JSON.stringify(mapProps, null, 2);
                                navigator.clipboard.writeText(text);
                                toast("Тема скопирована")
                            }}>Копировать</Button>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === '9'} onChange={handleChange('9')} >
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
                                control={celestialForm.control}
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
                    <Accordion expanded={expanded === '10'} onChange={handleChange('10')}  >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            Сетка
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={1}>
                                <Grid item xs={12} md={6} direction="row">
                                    <FormControl sx={{ width: "100%" }}>
                                        <ColorPicker name="celestial.lines.graticule.stroke" control={celestialForm.control} label="Цвет"></ColorPicker>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={6} direction="row">
                                    <Controller
                                        name="celestial.lines.graticule.show"
                                        control={celestialForm.control}
                                        render={({ field }) =>
                                            <FormControlLabel
                                                label="Показать"
                                                control={<Switch  {...field} checked={field.value} />}
                                            />
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} direction="row">
                                    <Controller
                                        name="celestial.lines.graticule.width"
                                        control={celestialForm.control}
                                        rules={{ required: true }}
                                        render={({ field }) =>
                                            <FormControlLabel
                                                label="Ширина линии"
                                                control={<Slider step={0.1} min={0} max={3}  {...field} />}
                                            />
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} direction="row">
                                    <Controller
                                        name="celestial.lines.graticule.opacity"
                                        control={celestialForm.control}

                                        rules={{ required: true }}
                                        render={({ field }) =>
                                            <FormControlLabel
                                                label="Ширина прозрачность линии"
                                                control={<Slider step={0.1} min={0} max={1}  {...field} />}
                                            />
                                        }
                                    />
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === '11'} onChange={handleChange('11')}  >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            Экватор
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={1}>
                                <Grid item xs={12} md={6} direction="row">
                                    <FormControl sx={{ width: "100%" }}>
                                        <ColorPicker name="celestial.lines.equatorial.stroke" control={celestialForm.control} label="Цвет"></ColorPicker>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={6} direction="row">
                                    <Controller
                                        name="celestial.lines.equatorial.show"
                                        control={celestialForm.control}
                                        render={({ field }) =>
                                            <FormControlLabel
                                                label="Показать"
                                                control={<Switch  {...field} checked={field.value} />}
                                            />
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} direction="row">
                                    <Controller
                                        name="celestial.lines.equatorial.width"
                                        control={celestialForm.control}
                                        rules={{ required: true }}
                                        render={({ field }) =>
                                            <FormControlLabel
                                                label="Ширина линии"
                                                control={<Slider step={0.1} min={0} max={3}  {...field} />}
                                            />
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} direction="row">
                                    <Controller
                                        name="celestial.lines.equatorial.opacity"
                                        control={celestialForm.control}

                                        rules={{ required: true }}
                                        render={({ field }) =>
                                            <FormControlLabel
                                                label="Ширина прозрачность линии"
                                                control={<Slider step={0.1} min={0} max={1}  {...field} />}
                                            />
                                        }
                                    />
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === '12'} onChange={handleChange('12')}  >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            Линия затмения
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={1}>
                                <Grid item xs={12} md={6} direction="row">
                                    <FormControl sx={{ width: "100%" }}>
                                        <ColorPicker name="celestial.lines.ecliptic.stroke" control={celestialForm.control} label="Цвет"></ColorPicker>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={6} direction="row">
                                    <Controller
                                        name="celestial.lines.ecliptic.show"
                                        control={celestialForm.control}
                                        render={({ field }) =>
                                            <FormControlLabel
                                                label="Показать"
                                                control={<Switch  {...field} checked={field.value} />}
                                            />
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} direction="row">
                                    <Controller
                                        name="celestial.lines.ecliptic.width"
                                        control={celestialForm.control}
                                        rules={{ required: true }}
                                        render={({ field }) =>
                                            <FormControlLabel
                                                label="Ширина линии"
                                                control={<Slider step={0.1} min={0} max={3}  {...field} />}
                                            />
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} direction="row">
                                    <Controller
                                        name="celestial.lines.ecliptic.opacity"
                                        control={celestialForm.control}

                                        rules={{ required: true }}
                                        render={({ field }) =>
                                            <FormControlLabel
                                                label="Ширина прозрачность линии"
                                                control={<Slider step={0.1} min={0} max={1}  {...field} />}
                                            />
                                        }
                                    />
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === '13'} onChange={handleChange('13')}  >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            Млечный путь
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={1}>
                                <Grid item xs={12} md={6} direction="row">
                                    <Controller
                                        name="celestial.mw.show"
                                        control={celestialForm.control}
                                        render={({ field }) =>
                                            <FormControlLabel
                                                label="Показать"
                                                control={<Switch  {...field} checked={field.value} />}
                                            />
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} direction="row">
                                    <FormControl sx={{ width: "100%" }}>
                                        <ColorPicker name="celestial.mw.style.fill" control={celestialForm.control} label="Цвет"></ColorPicker>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={12} direction="row">
                                    <Controller
                                        name="celestial.mw.style.opacity"
                                        control={celestialForm.control}
                                        rules={{ required: true }}
                                        render={({ field }) =>
                                            <div style={{ width: "100%" }}>
                                                <Typography id="input-slider" gutterBottom>
                                                    Volume
                                                </Typography>
                                                <Slider step={0.1} min={0} max={1}  {...field} />
                                            </div>
                                        }
                                    />
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                </Container>
                {/* <CheckoutButton /> */}
            </Grid>
        </Grid>
    </div >
}