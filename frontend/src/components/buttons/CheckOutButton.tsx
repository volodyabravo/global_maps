import styled from "@emotion/styled";
import { Button, ButtonTypeMap, ExtendButtonBase } from "@mui/material";
import { BsChevronRight } from "react-icons/bs";
import { FaCartPlus } from "react-icons/fa";

const BootstrapButton = styled(Button)({
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    padding: '20px',
    border: '1px solid',
    lineHeight: 1.5,
    backgroundColor: '#3F557F',
    borderColor: '#3F557F',
    borderRadius: "10px",
    color: "#FCFCFC",
    width: "100%",
    maxWidth: "400px",
    
    margin: "auto",
    fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
    ].join(','),
    fontWeight: 700,
    '&:hover': {
        backgroundColor: '#5371A9',
        borderColor: '#5371A9',
        boxShadow: 'none',
    },
    '&:active': {
        boxShadow: 'none',
        backgroundColor: '#5371A9',
    },
    '&:focus': {
      
    },
});

export function CheckoutButton(props: any) {
    return <BootstrapButton {...props}>
        <div style={{
            display: "flex",
            alignItems: "self-end",
            justifyContent: "space-between",
            width: "100%"
        }}>
            <div>
                <FaCartPlus />
                <span>1000$</span>
            </div>
            <div>
                Add to cart
                <BsChevronRight />
            </div>
        </div>


    </BootstrapButton>
}