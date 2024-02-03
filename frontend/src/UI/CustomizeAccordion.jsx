import React, { useState } from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, ButtonGroup, IconButton, Paper, Stack, ToggleButton, ToggleButtonGroup, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';




const CustomizeAccordion = (props) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [expanded, setExpanded] = useState(false)

    return (
        <Accordion
            expanded={expanded}
            onChange={() => setExpanded(prop => !prop)}
        >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header">
                <Typography fontSize={'1rem'} fontWeight={550}>{props.title}</Typography>
            </AccordionSummary>
            {props.children}
        </Accordion>
    )
}

export default CustomizeAccordion