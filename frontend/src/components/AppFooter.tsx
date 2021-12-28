import * as React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { Button, Container, Grid, SvgIcon, Typography } from '@mui/material';


function AppFooter(props: any) {
    return (
        <Box
            sx={{
                display: "flex",
                backgroundColor: "#3F557F",
            }}>
            <Grid container
                sx={{
                    display: "flex",
                    backgroundColor: "#3F557F",
                    justifyContent: "space-between;",
                    padding: "50px",
                    maxWidth: "1000px",
                    margin: "0 auto",
                    color: "white",
                    width: "100%"
                }}>
                <Grid container item xs={12} md={6}>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between;",
                            flexDirection: "column",
                            width: "100%"
                        }}>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between;",
                                flexDirection: "column"
                            }}>
                            <Link href="tel:+79160703653" color="#FFF" underline="hover">
                                <Typography fontSize="20px" fontWeight="600">+7 (916) 070 36 53</Typography>
                            </Link>
                            <Link href="mailto:info@stylemaps.ru" color="#FFF" underline="hover">
                                <Typography marginBottom="10px" marginTop="10px" fontSize="20px" fontWeight="600">info@stylemaps.ru</Typography>
                            </Link>
                            <Link href="https://wa.me/79160703653" color="#FFF" underline="hover">
                                <Typography fontSize="20px" fontWeight="600">WhatsApp +7 916 070 36 53</Typography>
                            </Link>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "flex-start"
                            }}>
                            <Link href="/" color="#FFF" underline="none">
                                <SvgIcon sx={{ marginBottom: "10px", marginTop: "40px" }} width="9" height="22" viewBox="0 0 9 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.14494 22H1.32234L1.28177 11.0043H0V6.87207H1.28177V4.93513C1.28177 1.83984 3.12007 0 6.31963 0H8.9854V4.12533H6.42996C5.18713 4.12533 5.14494 4.51375 5.14494 5.50217V6.87207H9L8.68199 11.0043H5.14494V22Z" fill="white" />
                                </SvgIcon>
                            </Link>
                            <Link href="/" color="#FFF" underline="none">
                                <SvgIcon sx={{ marginLeft: "40px", marginBottom: "10px", marginTop: "40px" }} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14.8018 0.336914H5.48851C2.68209 0.336914 0.400391 2.61679 0.400391 5.41955V14.7401C0.400391 17.5502 2.68026 19.8228 5.48851 19.8228H14.8018C17.6082 19.8228 19.8899 17.5502 19.8899 14.7401V5.42137C19.8881 2.61861 17.6082 0.336914 14.8018 0.336914ZM14.8018 17.382H5.48851C4.03136 17.382 2.84846 16.1955 2.84846 14.742V5.42137C2.84846 3.96789 4.03136 2.79047 5.48851 2.79047H14.8018C16.2589 2.79047 17.4418 3.96972 17.4418 5.42137V14.742C17.44 16.1955 16.2571 17.382 14.8018 17.382Z" fill="white" />
                                    <path d="M10.1441 4.58398C7.11467 4.58398 4.64648 7.05217 4.64648 10.0853C4.64648 13.1093 7.11467 15.5793 10.1441 15.5793C13.1773 15.5793 15.6418 13.1111 15.6418 10.0853C15.6418 7.05217 13.1773 4.58398 10.1441 4.58398ZM10.1441 13.1276C8.46028 13.1276 7.09821 11.7691 7.09821 10.0853C7.09821 8.40144 8.46028 7.03571 10.1441 7.03571C11.8225 7.03571 13.1937 8.40327 13.1937 10.0853C13.1937 11.7691 11.8225 13.1276 10.1441 13.1276Z" fill="white" />
                                    <path d="M15.2617 3.55859C14.5358 3.55859 13.9453 4.15644 13.9453 4.87496C13.9453 5.60079 14.5358 6.19864 15.2617 6.19864C15.9838 6.19864 16.578 5.60079 16.578 4.87496C16.5762 4.15644 15.9838 3.55859 15.2617 3.55859Z" fill="white" />
                                </SvgIcon>
                            </Link>
                            <Link href="/" color="#FFF" underline="none">
                                <SvgIcon sx={{ marginLeft: "40px", marginBottom: "10px", marginTop: "40px" }} width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M23.275 0.0391176L0.337066 9.32236C-0.0997139 9.4996 -0.115974 10.1295 0.311513 10.3283L5.38327 12.7018C5.52034 12.7665 5.6249 12.8886 5.66904 13.0371L7.84597 20.1744C7.95516 20.5336 8.378 20.6749 8.67074 20.4474L12.4577 17.5063C12.6389 17.365 12.8852 17.3602 13.0734 17.4895L19.4253 21.906C19.7413 22.1263 20.1734 21.9395 20.2431 21.5515L23.9906 0.645067C24.0672 0.225932 23.663 -0.118956 23.275 0.0391176ZM9.37469 13.7149L8.68933 17.7242L6.92362 11.9809L19.035 4.23047L9.37469 13.7149Z" fill="white" />
                                </SvgIcon>
                            </Link>
                        </Box>
                        <Link href="/" color="#FFF" underline="always">
                            <Typography fontSize="10px">пользовательское соглашение</Typography>
                        </Link>

                    </Box>
                </Grid>
                <Grid container item xs={12} md={6}>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between;",
                            flexDirection: "column",
                            width: "100%"
                        }}>
                        <Box
                            sx={{
                                justifyContent: "space-around;",
                                display: {
                                    xs: 'none',
                                    md: 'flex',
                                }
                            }}>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between;",
                                    flexDirection: "column"
                                }}>
                                <Typography fontSize="20px" fontWeight="600" marginBottom="15px">Меню</Typography>
                                <Link href="/street/" color="#FFF" underline="hover">
                                    <Typography fontSize="12px">Карта города</Typography>
                                </Link>
                                <Link href="/star/" color="#FFF" underline="hover">
                                    <Typography fontSize="12px">Звездное небо</Typography>
                                </Link>
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between;",
                                    flexDirection: "column"
                                }}>
                                <Typography fontSize="20px" fontWeight="600" marginBottom="15px">Помощь</Typography>
                                <Link href="/delivery/" color="#FFF" underline="hover">
                                    <Typography fontSize="12px">доставка и оплата</Typography>
                                </Link>
                                <Link href="/about/" color="#FFF" underline="hover">
                                    <Typography fontSize="12px">О нас</Typography>
                                </Link>
                            </Box>

                        </Box>
                        <Typography fontSize="10px">© 2021 ИП Пасека Илья Андреевич и ООО ПКФ Черкизово</Typography>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}


export default AppFooter
