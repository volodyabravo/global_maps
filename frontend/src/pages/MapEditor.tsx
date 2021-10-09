import { Accordion, AccordionDetails, AccordionSummary, Grid, TextField, Typography, Box, CardContent, Card, Button } from "@mui/material";
import { Celestial } from "d3-celestial/celestial";
import { useState } from "react";
import { CelestialReact } from "../components/CelestialForeign";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export function MapEditorPage() {
    // Accordion control
    const [expanded, setExpanded] = useState<string | false>(false);

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };


    return <div>
        <Grid container spacing={1} sx={{
            "minHeight": "100vh"
        }} >
            <Grid container item xs={12} md={8} direction="column" sx={{
                "pointerEvents": "none"
            }} >
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    minHeight="90vh"
                >
                    <div style={{ width: "400px" }}>
                        <CelestialReact zoom={3} config={{
                            center: [0, 3, 0],
                            controls: false,
                            constellations: {
                                names: false
                            },
                            planets: {
                                show: true,
                                names: false, 
                            },
                            width: 400,
                            stars: {
                                show: false
                            },
                            dsos: {
                                show: false
                            }
                        }} />
                    </div>
                </Box>
            </Grid>
            <Grid container item xs={12} md={4} direction="column" >
                <Card>  
                    <CardContent>
                        <Accordion  expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                            >
                                <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                    Choose the location
                                </Typography>
                                <Typography sx={{ color: 'text.secondary' }}>I am an accordion</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
                                    Aliquam eget maximus est, id dignissim quam.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2bh-content"
                                id="panel2bh-header"
                            >
                                <Typography sx={{ width: '33%', flexShrink: 0 }}>Users</Typography>
                                <Typography sx={{ color: 'text.secondary' }}>
                                    Customize the theme
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus,
                                    varius pulvinar diam eros in elit. Pellentesque convallis laoreet
                                    laoreet.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel3bh-content"
                                id="panel3bh-header"
                            >
                                <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                    Customize the text
                                </Typography>
                                <Typography sx={{ color: 'text.secondary' }}>
                                    Filtering has been entirely disabled for whole web server
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit
                                    amet egestas eros, vitae egestas augue. Duis vel est augue.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel4bh-content"
                                id="panel4bh-header"
                            >
                                <Typography sx={{ width: '33%', flexShrink: 0 }}>Customize the poster size</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit
                                    amet egestas eros, vitae egestas augue. Duis vel est augue.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Button title="Купить" />
                    </CardContent>
                </Card>

            </Grid>
        </Grid>
    </div>
}