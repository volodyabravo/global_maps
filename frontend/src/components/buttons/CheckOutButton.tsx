import styled from "@emotion/styled";
import { Button, ButtonTypeMap, ExtendButtonBase, Typography } from "@mui/material";
import { BsChevronRight } from "react-icons/bs";
import { FaCartPlus } from "react-icons/fa";

const BootstrapButton = styled(Button)(({ theme }) => {
  console.log(theme.breakpoints.down("sm"))
  return ({
    width: "100%",
    height: "60px",
    fontSize: "14px",
    boxShadow: "none",
    textTransform: "none",
    fontWeight: 700,
    padding: "20px 40px!important",
    border: "1px solid",
    lineHeight: 1.5,
    backgroundColor: "#3F557F",
    borderColor: "#3F557F",
    borderRadius: "10px",
    color: "#FCFCFC",
    // width: "100%",
    maxWidth: "400px",

    margin: "auto",
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    [theme.breakpoints.down("sm")]: {
      padding: "10px",
    },
    "&:hover": {
      backgroundColor: "#5371A9",
      borderColor: "#5371A9",
      boxShadow: "none",
    },
    "&:active": {
      boxShadow: "none",
      backgroundColor: "#5371A9",
    },
    "&:focus": {},
    "& span": {
      padding: "0 5px",
    },
  })
});

interface CheckoutButtonProps {
  /**
   * Formatted price with currency attached
   */
  price?: string;
  /**
   * On click handler
   */
  onClick?: () => void;
}

export function CheckoutButton(props: CheckoutButtonProps) {
  return (
    <BootstrapButton {...props}>
      <div
        style={{
          display: "flex",
          alignItems: "self-end",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <div>
          <FaCartPlus />
          <span>{props.price || "0"}</span>
        </div>
        <div>
          <span>Добавить в корзину</span>
          <BsChevronRight style={{ height: "0.75em" }} />
        </div>
      </div>
    </BootstrapButton>
  );
}
