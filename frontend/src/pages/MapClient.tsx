import { AccordionDetails, Grid, TextField, Typography, Box, CardContent, Card, Button, FormControl, InputLabel, Select, MenuItem, Checkbox, FormControlLabel, TextareaAutosize, Switch, Container, Tabs, Tab } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
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
import { TabContext, TabPanel } from "@mui/lab";
import { ThemePicker } from "../components/form/ThemePicker";
import { getSizes, getThemes, MapTheme, Size, UserCustomizations } from "../api/themes";
import { MapView } from "../components/MapView";
import { LocationSelector } from "../components/geocoder/LocationSelector";


export function MapClientPage() {
    // Accordion control
    const [expanded, setExpanded] = useState<string | false>("panel1");

    const [themes, setThemes] = useState<Array<MapTheme>>([]);
    const [sizes, setSizes] = useState<Array<Size>>([]);

    // Celestial
    const userForm = useForm<UserCustomizations>({
        defaultValues: {
            orientation: "portrait"
        }
    });

    let custom = userForm.watch();
    let theme = useMemo(() => { return themes.find((theme) => theme.id == custom.theme) }, [custom.theme]);

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    const [selectedThemeTab, setSelectedThemeTab] = useState(0);

    let size: Size | null = null;
    if (custom.sizeId != null) {
        size = sizes[custom.sizeId];
    }

    useEffect(() => {
        (async () => {
            let themesData = await getThemes();
            setThemes(themesData);
            let sizesData = await getSizes();
            setSizes(sizesData)
            if (!custom.theme && themesData && themesData.length > 0) {
                setTimeout(() => {
                    userForm.setValue("theme", themesData[0].id);
                }, 500)

            }

        })();
        return () => {
            //cleanup
        }
    }, [])

    return <div style={{ "backgroundColor": "#F8F8F8", }}>
        <Container sx={{
            "backgroundColor": "#F8F8F8",
        }}>
            <Grid container spacing={1} sx={{
                "minHeight": "100vh",
                "backgroundColor": "#F8F8F8",
                "paddingTop": "10px"
            }} >
                <Grid container item xs={12} md={8} direction="column" >
                    {theme &&
                        <MapView theme={theme} custom={custom} />}
                </Grid>
                <Grid item xs={12} md={4} style={{
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
                            <Box sx={{ borderBottom: "1px solid #E5E5E5" }}>
                                <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1bh-content"
                                        id="panel1bh-header"
                                    >
                                        Choose the location
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <LocationSelector></LocationSelector>
                                    </AccordionDetails>
                                </Accordion>
                            </Box>
                            <Box sx={{ borderBottom: "1px solid #E5E5E5" }}>
                                <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1bh-content"
                                        id="panel1bh-header"
                                    >

                                        Customize the theme


                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <TabContext value={selectedThemeTab.toString()}>
                                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                                <Tabs value={selectedThemeTab} onChange={(e, value) => setSelectedThemeTab(value)} aria-label="basic tabs example" centered>
                                                    <Tab label="Popular styles" />
                                                    <Tab label="Customize" />
                                                </Tabs>
                                            </Box>
                                            <TabPanel value="0" sx={{
                                                padding: "0"
                                            }} >
                                                <ThemePicker name="theme" control={userForm.control} themes={themes} />

                                                <Typography fontWeight="400" color="#A8A8A8" fontSize="10px">
                                                    We are all for freedom of choice, if you want to try different combinations than our favorites - go ahead and click customize and roll your own!
                                                </Typography>
                                            </TabPanel>
                                            <TabPanel value="1">
                                                Item Two
                                            </TabPanel>
                                        </TabContext>

                                    </AccordionDetails>
                                </Accordion>
                            </Box>
                            <Box sx={{ borderBottom: "1px solid #E5E5E5" }}>
                                <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1bh-content"
                                        id="panel1bh-header"
                                    >
                                        Customize the text
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Grid container spacing={1} columnSpacing={1} rowSpacing={3}>
                                            <Grid item xs={5}>
                                                <Box sx={{ display: "flex", flexDirection: "column", justifyContent: 'center', alignItems: "flex-start", width: "100%", height: "100%" }}>
                                                    <Typography marginLeft="10px" fontWeight="700" color="#A8A8A8" fontSize="14px" lineHeight="12px">
                                                        Headline
                                                    </Typography>
                                                </Box>
                                            </Grid>
                                            <Grid item xs={7}>
                                                <Box sx={{ display: "flex", justifyContent: 'end' }}>
                                                    <Controller
                                                        name="headline"
                                                        control={userForm.control}
                                                        render={({ field }) =>
                                                            <TextField fullWidth size="small" placeholder={theme?.data?.cardSettings?.defaultText?.headline} {...field} />
                                                        }
                                                    />
                                                </Box>
                                            </Grid>
                                            <Grid item xs={5}>
                                                <Box sx={{ display: "flex", flexDirection: "column", justifyContent: 'center', alignItems: "flex-start", width: "100%", height: "100%" }}>
                                                    <Typography marginLeft="10px" fontWeight="700" color="#A8A8A8" fontSize="14px" lineHeight="12px">
                                                        Divider
                                                    </Typography>
                                                </Box>
                                            </Grid>
                                            <Grid item xs={7}>
                                                <Box sx={{ display: "flex", justifyContent: 'end' }}>
                                                    <Controller
                                                        name="divider"
                                                        control={userForm.control}
                                                        render={({ field }) =>
                                                            <TextField fullWidth size="small" placeholder={theme?.data?.cardSettings?.defaultText?.divider} {...field} />
                                                        }
                                                    />
                                                </Box>
                                            </Grid>
                                            <Grid item xs={5}>
                                                <Box sx={{ display: "flex", flexDirection: "column", justifyContent: 'center', alignItems: "flex-start", width: "100%", height: "100%" }}>
                                                    <Typography marginLeft="10px" fontWeight="700" color="#A8A8A8" fontSize="14px" lineHeight="12px">
                                                        Tagline
                                                    </Typography>
                                                </Box>
                                            </Grid>
                                            <Grid item xs={7}>
                                                <Box sx={{ display: "flex", justifyContent: 'end' }}>
                                                    <Controller
                                                        name="tagline"
                                                        control={userForm.control}
                                                        render={({ field }) =>
                                                            <TextField fullWidth size="small" placeholder={theme?.data?.cardSettings?.defaultText?.tagline}  {...field} />
                                                        }
                                                    />
                                                </Box>
                                            </Grid>
                                            <Grid item xs={5}>
                                                <Box sx={{ display: "flex", flexDirection: "column", justifyContent: 'center', alignItems: "flex-start", width: "100%", height: "100%" }}>
                                                    <Typography marginLeft="10px" fontWeight="700" color="#A8A8A8" fontSize="14px" lineHeight="12px">
                                                        Subline
                                                    </Typography>
                                                </Box>
                                            </Grid>
                                            <Grid item xs={7}>
                                                <Box sx={{ display: "flex", justifyContent: 'end' }}>
                                                    <Controller
                                                        name="subline"
                                                        control={userForm.control}
                                                        render={({ field }) =>
                                                            <TextField fullWidth size="small" placeholder={theme?.data?.cardSettings?.defaultText?.subline} {...field} />
                                                        }
                                                    />
                                                </Box>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Typography marginLeft="20px" fontWeight="500" color="#A8A8A8" fontSize="12px" lineHeight="14px" height="100%">
                                                    Updating coordinates when map position changes. You can set your own text as tagline if you disable this.
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </AccordionDetails>
                                </Accordion>
                            </Box>
                            <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1bh-content"
                                    id="panel1bh-header"
                                >
                                    Customize the poster size
                                </AccordionSummary>
                                <AccordionDetails>
                                    Select poster size
                                    <SizesContainer>
                                        <Controller control={userForm.control} name="sizeId" render={(form) => {
                                            return (<>{sizes.length > 0 && sizes.map((item, index) => {
                                                return (
                                                    <SizeButton className={index == form.field.value ? "active" : ""} key={item.id} onClick={() => { form.field.onChange(index) }}>{item.name}</SizeButton>
                                                )
                                            })}</>)
                                        }} />
                                    </SizesContainer>
                                    Select orientation
                                    <SizesContainer>
                                        <Controller control={userForm.control} name="orientation" render={(form) => {
                                            return (<>
                                                <SizeButton className={form.field.value == "landscape" ? "active" : ""} onClick={() => { form.field.onChange("landscape") }}>Landscape</SizeButton>
                                                <SizeButton className={form.field.value == "portrait" ? "active" : ""} onClick={() => { form.field.onChange("portrait") }}>Portrait</SizeButton>
                                            </>)
                                        }} />
                                    </SizesContainer>
                                </AccordionDetails>
                            </Accordion>

                        </Typography>
                        <Box sx={{ padding: "10px", background: "#FFFFFF", borderTop: "1px solid #EEEEEE", }}>
                            <Grid container>
                                <CheckoutButton />
                            </Grid>
                        </Box>

                    </Box>

                </Grid>
            </Grid>
        </Container>
    </div >
}

const SizesContainer = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
`

const SizeButton = styled.div`
    display: block;
    background: #F3F3F3;
    padding: 9px;
    text-align: center;
    cursor: pointer;
    color: #3F557F;
    margin: 9px 0;
    flex-basis: 33%;
    max-width: 150px;

    &.active {
        color: #FFFFFF;
        background: #818FAB;
    }
`