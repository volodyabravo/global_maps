import { AccordionDetails, Grid, TextField, Typography, Box, CardContent, Card, Button, FormControl, InputLabel, Select, MenuItem, Checkbox, FormControlLabel, TextareaAutosize, Switch, Container, Tabs, Tab } from "@mui/material";
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
import { TabContext, TabPanel } from "@mui/lab";
import { ThemePicker } from "../components/form/ThemePicker";

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

    const [themes, setThemes] = useState<Array<{
        id: number;
        name: string;
        image: string;
    }>>([
        {
            id: 1,
            name: "Theme 1",
            image: ""
        },
        {
            id: 2,
            name: "Theme 2",
            image: ""
        },
        {
            id: 3,
            name: "Theme 3",
            image: ""
        }
    ]);


    // Celestial
    const celestialForm = useForm({
        defaultValues: {
            theme: "1"
        }
    });

    let mapProps = celestialForm.watch();
    // let backProps = backgroundForm.watch();

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };


    const [selectedThemeTab, setSelectedThemeTab] = useState(0);

    return <div>

        <Grid container spacing={1} sx={{
            "minHeight": "100vh"
        }} >
            <Grid container item xs={12} md={8} direction="column" >

                {/* <CardArea className="card-area">
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
                </CardArea> */}
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
                        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                            >
                                Choose the location
                            </AccordionSummary>
                            <AccordionDetails>
                                <Grid container spacing={1}>
                                   
                                </Grid>
                            </AccordionDetails>
                        </Accordion>
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
                                    <TabPanel value="0"  >
                                        <ThemePicker name="theme" control={celestialForm.control} themes={themes} />


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
                        <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                            >

                                Customize the text


                            </AccordionSummary>
                            <AccordionDetails>
                                <Grid container spacing={1}>

                                 

                                </Grid>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                            >

                                Customize the poster size


                            </AccordionSummary>
                            <AccordionDetails>

                            </AccordionDetails>
                        </Accordion>

                    </Typography>
                    <Box sx={{ padding: "10px", background: "#FFFFFF", border: "1px solid #EEEEEE", }}>
                        <CheckoutButton />
                    </Box>

                </Box>

            </Grid>
        </Grid>
    </div >
}