import {Theme as MuiTheme} from "@mui/material/styles";

declare module '@mui/material/styles' {
    interface Theme {
        status: {
            danger: string;
        };
    }
    // allow configuration using `createTheme`
    interface ThemeOptions {
        status?: {
            danger?: string;
        };
    }
}

declare module '@emotion/react' {
    export interface Theme extends MuiTheme{
    }
}