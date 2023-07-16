import { AccordionDetails, Grid, TextField, Typography, Box, CardContent, Card, Button, FormControl, InputLabel, Select, MenuItem, Checkbox, FormControlLabel, TextareaAutosize, Switch, Container, Tabs, Tab } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { CelestialReact } from "../../components/CelestialForeign";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { useForm, Controller } from "react-hook-form";
import { ColorPicker } from "../../components/form/ColorPicker";
import styled from "@emotion/styled";
import { Accordion, AccordionSummary } from "../../components/editor/Accordion";
import { CheckoutButton } from "../../components/buttons/CheckOutButton";
import { TabContext, TabPanel } from "@mui/lab";
import { ThemePicker } from "../../components/form/ThemePicker";
import { getSizes, getThemes, MapTheme, MapType, Size, UserCustomizations } from "../../api/themes";
import { MapView } from "../../components/MapView";
import { LocationSelector } from "../../components/geocoder/LocationSelector";
import { toast } from "react-toastify";
import { inject, observer } from 'mobx-react';
import { Cart } from "../../cart/cart.store";
import useClient from "../../hooks/useClient";
import { LoadingOverlay } from "../../components/LoadingOverlay";
import { VersionPicker } from "../../components/form/VersionPicker";
import AppNavBar from "../../components/AppBar";

const hasGeo = 'geolocation' in navigator;


function MapClientPage({ cartStore }: {
    cartStore?: Cart
}) {
    
    // Accordion control
    const [expanded, setExpanded] = useState<string | false>("panel1");

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    const [selectedThemeTab, setSelectedThemeTab] = useState(0);

    const {
        sizes,
        size,
        versions,
        theme,
        themes,
        form,
        addToCart,
        hasGeo,
        getGeolocation,
        setLocationAutocomplete,
        loading,
        price
    } = useClient(cartStore, MapType.Star)


    const custom = form.watch();

    return <div style={{ "backgroundColor": "#F8F8F8", }}>
        <AppNavBar />
        <Container sx={{
            "backgroundColor": "#F8F8F8",
            "paddingLeft": "0!important",
            "paddingRight": "0!important",
            "maxWidth": "100%!important"
        }}>
            {loading && <LoadingOverlay />}
            <Grid container spacing={1} sx={{
                "minHeight": "calc(100vh - 64px)",
                "backgroundColor": "#F8F8F8",
                "width": "100%",
                "marginTop": "0px",
                "marginLeft": "0px",
            }} >
                <Grid container item xs={12} md={9} direction="column" >
                    {theme &&
                        <MapView theme={theme} custom={custom} size={size} />}
                </Grid>
                <Grid item xs={12} md={3} style={{
                    padding: "0px 0px",
                    height: "100% - 64px",

                }} spacing={0}>
                    <Box sx={{
                        padding: "20px 0px 5px 20px",
                        height: "40px"
                    }}>

                        <Typography fontSize="12px" fontWeight="700" align="left" color="#C5C5C5">Измените вашу векторную карту</Typography>
                    </Box>
                    <Box sx={{ boxShadow: "-5px -5px 10px rgba(0, 0, 0, 0.05)", height: "calc(100% - 75px)", "background": "#FFFFFF", "display": "flex", "flexDirection": "column", "justifyContent": "space-between" }}>
                        <Typography align="left" fontSize="12px" fontWeight="400">
                            <Box sx={{ borderBottom: "1px solid #E5E5E5" }}>
                                <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                    >
                                        Выберите тему
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <TabContext value={selectedThemeTab.toString()}>
                                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                                <Tabs value={selectedThemeTab} onChange={(e, value) => setSelectedThemeTab(value)} aria-label="basic tabs example" centered>
                                                    <Tab label="Популярные стили" />
                                                    <Tab label="Настроить" />
                                                </Tabs>
                                            </Box>
                                            <TabPanel value="0" sx={{
                                                padding: "0"
                                            }} >
                                                <ThemePicker name="theme" control={form.control} themes={themes} />

                                                <Typography fontWeight="400" color="#A8A8A8" fontSize="10px">
                                                    Мы все за свободу выбора. Если вы хотите попробовать комбинации, отличные от наших любимых, нажмите кнопку «Настроить» и выберите свою!
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
                                    >
                                        Введите текст
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Grid container spacing={1} columnSpacing={1} rowSpacing={3}>
                                            <Grid item xs={5}>
                                                <Box sx={{ display: "flex", flexDirection: "column", justifyContent: 'center', alignItems: "flex-start", width: "100%", height: "100%" }}>
                                                    <Typography marginLeft="10px" fontWeight="700" color="#A8A8A8" fontSize="14px" lineHeight="12px">
                                                        Заголовок
                                                    </Typography>
                                                </Box>
                                            </Grid>
                                            <Grid item xs={7}>
                                                <Box sx={{ display: "flex", justifyContent: 'end' }}>
                                                    <Controller
                                                        name="headline"
                                                        control={form.control}
                                                        render={({ field }) =>
                                                            <TextField fullWidth size="small" placeholder={theme?.data?.cardSettings?.defaultText?.headline} {...field} />
                                                        }
                                                    />
                                                </Box>
                                            </Grid>
                                            <Grid item xs={5}>
                                                <Box sx={{ display: "flex", flexDirection: "column", justifyContent: 'center', alignItems: "flex-start", width: "100%", height: "100%" }}>
                                                    <Typography marginLeft="10px" fontWeight="700" color="#A8A8A8" fontSize="14px" lineHeight="12px">
                                                        Разделитель
                                                    </Typography>
                                                </Box>
                                            </Grid>
                                            <Grid item xs={7}>
                                                <Box sx={{ display: "flex", justifyContent: 'end' }}>
                                                    <Controller
                                                        name="divider"
                                                        control={form.control}
                                                        render={({ field }) =>
                                                            <TextField fullWidth size="small" placeholder={theme?.data?.cardSettings?.defaultText?.divider} {...field} />
                                                        }
                                                    />
                                                </Box>
                                            </Grid>
                                            <Grid item xs={5}>
                                                <Box sx={{ display: "flex", flexDirection: "column", justifyContent: 'center', alignItems: "flex-start", width: "100%", height: "100%" }}>
                                                    <Typography marginLeft="10px" fontWeight="700" color="#A8A8A8" fontSize="14px" lineHeight="12px">
                                                        Тэглайн
                                                    </Typography>
                                                </Box>
                                            </Grid>
                                            <Grid item xs={7}>
                                                <Box sx={{ display: "flex", justifyContent: 'end' }}>
                                                    <Controller
                                                        name="tagline"
                                                        control={form.control}
                                                        render={({ field }) =>
                                                            <TextField fullWidth size="small" placeholder={theme?.data?.cardSettings?.defaultText?.tagline}  {...field} />
                                                        }
                                                    />
                                                </Box>
                                            </Grid>
                                            <Grid item xs={5}>
                                                <Box sx={{ display: "flex", flexDirection: "column", justifyContent: 'center', alignItems: "flex-start", width: "100%", height: "100%" }}>
                                                    <Typography marginLeft="10px" fontWeight="700" color="#A8A8A8" fontSize="14px" lineHeight="12px">
                                                        Саблайн
                                                    </Typography>
                                                </Box>
                                            </Grid>
                                            <Grid item xs={7}>
                                                <Box sx={{ display: "flex", justifyContent: 'end' }}>
                                                    <Controller
                                                        name="subline"
                                                        control={form.control}
                                                        render={({ field }) =>
                                                            <TextField fullWidth size="small" placeholder={theme?.data?.cardSettings?.defaultText?.subline} {...field} />
                                                        }
                                                    />
                                                </Box>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Typography marginLeft="20px" fontWeight="500" color="#A8A8A8" fontSize="12px" lineHeight="14px" height="100%">
                                                    Вы можете установить свой собственный текст в качестве слогана.
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </AccordionDetails>
                                </Accordion>
                            </Box>
                            <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                >
                                    Выберите размер постера
                                </AccordionSummary>
                                <AccordionDetails>
                                    <VersionPicker sizes={sizes} versions={versions} form={form}/>
                                </AccordionDetails>
                            </Accordion>

                        </Typography>
                        <Box sx={{ padding: "10px", background: "#FFFFFF" }}>
                            <Grid container>
                                <CheckoutButton price={price?.toString()} onClick={() => addToCart("Векторная карта")} />
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const LocationBlock = styled.div`
    margin-top: 1em;
    display:flex;
    justify-content: space-between;
    align-items: center;
    span {
        color: #818FAB;
        /* span */
    }

    button {
        /* background  */
        cursor: pointer;
        padding: 8px;
        font-family: Roboto;
        font-style: normal;
        font-weight: normal;
        color: #818FAB;
        background: #FFFFFF;
        border: 1px solid #EEEEEE;
    }
`

export default inject("cartStore")(observer(MapClientPage))