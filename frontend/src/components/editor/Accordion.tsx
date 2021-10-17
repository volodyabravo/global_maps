/**
 * Custom styled accordion for maps project
 */
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordionSummary, {
    AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import styled from "@emotion/styled";

export const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid white`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
    '& .MuiAccordionDetails-root': {
        //@ts-expect-error
        background: theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, .05)'
            : '#F9FAFB',
    }
}));


export const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor:
        //@ts-expect-error
        theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, .05)'
            : '#fff',
    flexDirection: 'row-reverse',
    border: "1px solid #EEEEEE",
    borderTop: "none",
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        //@ts-expect-error
        marginLeft: theme.spacing(1),
    },
}));