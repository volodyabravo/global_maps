import * as React from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, NavLink } from 'react-router-dom';
import { Button, Container, Grid, List, ListItem, SvgIcon, SwipeableDrawer } from '@mui/material';
import { BsFillBagCheckFill } from 'react-icons/bs';
import { inject, observer } from 'mobx-react';
import { Cart } from '../cart/cart.store';


const CartButton = inject("cartStore")(observer(({ cartStore }: { cartStore?: Cart }) => <Link to="/cart/" >
    <IconButton size="medium" aria-label="show 4 new mails" color="inherit">
        <Badge badgeContent={cartStore?.count} sx={{ "color": "#202945" }}>
            <BsFillBagCheckFill />
        </Badge>
    </IconButton>
</Link>))


const links = [
    {
        to: "/street/",
        name: "Карта города"
    },
    {
        to: "/star/",
        name: "Звездное небо"
    },
    // {
    //     to: "/vector/",
    //     name: "Создать постер"
    // },
    // {
    //     to: "/delivery/",
    //     name: "Доставка & оплата"
    // },
    // {
    //     to: "/about/",
    //     name: "О нас"
    // },

]


function AppNavBar(props: any) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
        React.useState<null | HTMLElement>(null);

    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const toggleDrawer = () => {
        setDrawerOpen(prev => !prev)
    };

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';

    const list = (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer}
            onKeyDown={toggleDrawer}
        >
            <List>
                {links.map(({ name, to }) => (
                    <ListItem button key={name}>
                        <NavMobileLink to={to} activeClassName="active" exact>
                            {name}
                        </NavMobileLink>
                    </ListItem>)
                )}
            </List>
        </Box>
    )

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{
                background: "white",
                color: "#3F557F",
                boxShadow: "0px 4px 3px rgba(0, 0, 0, 0.01)",
                zIndex: 2,
                position: "relative",
            }}>

                <Container sx={{ marginLeft: "0px", marginRight: "0px", width: "100%", maxWidth: "100%!important" }}>
                    <Toolbar sx={{ display: "flex", alignItems: "center", justifyContent: "space-betwen" }}>

                        <Grid container spacing={0} sx={{ marginLeft: "0px", }} justifyContent="space-between" alignItems="center" mt={0}>
                            <Grid container xs={1}>
                                <IconButton
                                    size="large"
                                    edge="start"
                                    color="inherit"
                                    aria-label="open drawer"
                                    sx={{
                                        display: {
                                            xs: 'flex',
                                            md: 'none',
                                        },
                                        padding: "2px",
                                        marginLeft: '0px'
                                    }}
                                    onClick={toggleDrawer}
                                >
                                    <MenuIcon />
                                </IconButton>
                            </Grid>
                            <Grid container xs={5} md={2}>
                                <Link to="/" color="inherit">
                                    <Box
                                        sx={{
                                            height: "40px",
                                            width: "205px",
                                            marginRight: "10px",
                                            display: "flex",
                                            flexDirection: "column"
                                        }}>
                                        <SvgIcon sx={{ "width": "100%", "height": "100%" }} width="100%" height="100%" viewBox="0 0 199 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8.952 23.32C7.224 23.32 5.54933 23.0747 3.928 22.584C2.328 22.0933 1.05867 21.4427 0.12 20.632L1.56 17.4C2.47733 18.1253 3.59733 18.7227 4.92 19.192C6.264 19.64 7.608 19.864 8.952 19.864C10.616 19.864 11.8533 19.5973 12.664 19.064C13.496 18.5307 13.912 17.8267 13.912 16.952C13.912 16.312 13.6773 15.7893 13.208 15.384C12.76 14.9573 12.184 14.6267 11.48 14.392C10.776 14.1573 9.816 13.8907 8.6 13.592C6.89333 13.1867 5.50667 12.7813 4.44 12.376C3.39467 11.9707 2.488 11.3413 1.72 10.488C0.973333 9.61333 0.6 8.44 0.6 6.968C0.6 5.73067 0.930667 4.61067 1.592 3.608C2.27467 2.584 3.288 1.77333 4.632 1.176C5.99733 0.578665 7.66133 0.279999 9.624 0.279999C10.9893 0.279999 12.3333 0.450666 13.656 0.792C14.9787 1.13333 16.12 1.624 17.08 2.264L15.768 5.496C14.7867 4.92 13.7627 4.48267 12.696 4.184C11.6293 3.88533 10.5947 3.736 9.592 3.736C7.94933 3.736 6.72267 4.01333 5.912 4.568C5.12267 5.12267 4.728 5.85867 4.728 6.776C4.728 7.416 4.952 7.93867 5.4 8.344C5.86933 8.74933 6.456 9.06933 7.16 9.304C7.864 9.53867 8.824 9.80533 10.04 10.104C11.704 10.488 13.0693 10.8933 14.136 11.32C15.2027 11.7253 16.1093 12.3547 16.856 13.208C17.624 14.0613 18.008 15.2133 18.008 16.664C18.008 17.9013 17.6667 19.0213 16.984 20.024C16.3227 21.0267 15.3093 21.8267 13.944 22.424C12.5787 23.0213 10.9147 23.32 8.952 23.32ZM26.6845 4.12H19.2605V0.599998H38.2685V4.12H30.8445V23H26.6845V4.12ZM51.062 15.096V23H46.902V15.16L38.102 0.599998H42.55L49.11 11.512L55.734 0.599998H59.83L51.062 15.096ZM62.5617 0.599998H66.7217V19.48H78.4338V23H62.5617V0.599998ZM98.838 19.512V23H82.038V0.599998H98.39V4.088H86.198V9.912H97.014V13.336H86.198V19.512H98.838ZM124.372 23L124.34 8.152L116.979 20.44H115.123L107.763 8.344V23H103.795V0.599998H107.219L116.115 15.448L124.851 0.599998H128.275L128.307 23H124.372ZM149.206 17.816H138.006L135.798 23H131.51L141.59 0.599998H145.686L155.798 23H151.446L149.206 17.816ZM147.83 14.552L143.606 4.76L139.414 14.552H147.83ZM168.183 0.599998C170.124 0.599998 171.809 0.919999 173.239 1.56C174.689 2.2 175.799 3.11733 176.567 4.312C177.335 5.50667 177.719 6.92533 177.719 8.568C177.719 10.1893 177.335 11.608 176.567 12.824C175.799 14.0187 174.689 14.936 173.239 15.576C171.809 16.216 170.124 16.536 168.183 16.536H163.127V23H158.967V0.599998H168.183ZM167.991 13.016C169.804 13.016 171.18 12.632 172.119 11.864C173.057 11.096 173.527 9.99733 173.527 8.568C173.527 7.13867 173.057 6.04 172.119 5.272C171.18 4.504 169.804 4.12 167.991 4.12H163.127V13.016H167.991ZM189.449 23.32C187.721 23.32 186.047 23.0747 184.425 22.584C182.825 22.0933 181.556 21.4427 180.617 20.632L182.057 17.4C182.975 18.1253 184.095 18.7227 185.417 19.192C186.761 19.64 188.105 19.864 189.449 19.864C191.113 19.864 192.351 19.5973 193.161 19.064C193.993 18.5307 194.409 17.8267 194.409 16.952C194.409 16.312 194.175 15.7893 193.705 15.384C193.257 14.9573 192.681 14.6267 191.977 14.392C191.273 14.1573 190.313 13.8907 189.097 13.592C187.391 13.1867 186.004 12.7813 184.937 12.376C183.892 11.9707 182.985 11.3413 182.217 10.488C181.471 9.61333 181.097 8.44 181.097 6.968C181.097 5.73067 181.428 4.61067 182.089 3.608C182.772 2.584 183.785 1.77333 185.129 1.176C186.495 0.578665 188.159 0.279999 190.121 0.279999C191.487 0.279999 192.831 0.450666 194.153 0.792C195.476 1.13333 196.617 1.624 197.577 2.264L196.265 5.496C195.284 4.92 194.26 4.48267 193.193 4.184C192.127 3.88533 191.092 3.736 190.089 3.736C188.447 3.736 187.22 4.01333 186.409 4.568C185.62 5.12267 185.225 5.85867 185.225 6.776C185.225 7.416 185.449 7.93867 185.897 8.344C186.367 8.74933 186.953 9.06933 187.657 9.304C188.361 9.53867 189.321 9.80533 190.537 10.104C192.201 10.488 193.567 10.8933 194.633 11.32C195.7 11.7253 196.607 12.3547 197.353 13.208C198.121 14.0613 198.505 15.2133 198.505 16.664C198.505 17.9013 198.164 19.0213 197.481 20.024C196.82 21.0267 195.807 21.8267 194.441 22.424C193.076 23.0213 191.412 23.32 189.449 23.32Z" fill="#202945" />
                                        </SvgIcon>
                                    </Box>
                                </Link>
                            </Grid>
                            <DesktopNav>
                                {
                                    links.map(({ name, to }) => (
                                        <NavDesktopLink
                                            activeClassName="active"
                                            to={to}
                                        >
                                            <DesktopLinkButton
                                                variant="text"
                                            >
                                                {name}
                                            </DesktopLinkButton>
                                        </NavDesktopLink>
                                    ))
                                }
                            </DesktopNav>
                            <Grid container xs={1} md={1}>
                                <Box sx={{ display: { xs: 'flex', md: 'flex' } }}>
                                    <CartButton />
                                </Box>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </Container>
            </AppBar>
            <SwipeableDrawer
                anchor={"left"}
                open={drawerOpen}
                onClose={toggleDrawer}
                onOpen={toggleDrawer}
            >
                {list}
            </SwipeableDrawer>
        </Box >
    );
}

const DesktopNav = styled("div")`
    ${({ theme }) => theme.breakpoints.down("md")} {
        display:none;
    }
`

const NavDesktopLink = styled(NavLink)(`
    text-decoration: none;

    .MuiButton-text {
        color:black;
    }
    &.active .MuiButton-text {
        color:#818FAB;
    }
`)

const NavMobileLink = styled(NavLink)(`
    text-decoration: none;
    .MuiButton-text {
        color:black;
    }
    color: inherit;
    &.active {
        color:#818FAB;
    }
    
`)

const DesktopLinkButton = styled(Button)`
    font-size: 12px;
    color: #3F557F;
    font-weight: 600;
    text-transform: uppercase;
    line-height: 15px;
    justify-content: center;

`

export default AppNavBar