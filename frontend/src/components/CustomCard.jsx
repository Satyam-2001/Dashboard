import { Box, useTheme, Stack, IconButton } from "@mui/material";
import { tokens } from "../theme";
import { Fragment, useState } from "react";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ImageIcon from '@mui/icons-material/Image';

const DummyImage = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return <ImageIcon
        sx={{
            height: '100%',
            width: '100%',
            color: 'rgba(0, 0, 0, 0.3)',
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            borderRadius: '3px'
        }} />
}

const CustomCard = ({ title, subtitle, image, description, removeHandler, exploreHandler, editHandler }) => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [expanded, setExpanded] = useState(false)

    return (
        <Fragment>
            <Accordion
                expanded={expanded}
                // onChange={() => setExpanded(prop => !prop)}
                sx={{ backgroundColor: colors.primary[500], margin: '0 0 6px 0' }}>
                <AccordionSummary
                    expandIcon={<IconButton onClick={() => setExpanded(prop => !prop)}><ExpandMoreIcon /></IconButton>}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header">
                    <Stack
                        direction='row'
                        gap={1}
                        flexGrow={1}>
                        <Box width={'70px'} height={'55px'} display={'flex'} alignItems={'center'} justifyContent={'center'} >
                            {image ? <img src={image} style={{ maxHeight: '100%', maxWidth: '100%', borderRadius: '3px' }} /> : <DummyImage />}
                        </Box>
                        <Stack direction={'row'} justifyContent={'space-between'} flexGrow={1}>
                            <Stack px={3} flexGrow={1}>
                                <Typography gutterBottom variant="h5" component="div">
                                    {title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {subtitle}
                                </Typography>
                            </Stack>
                            <Stack direction={'row'} justifyContent={'flex-end'} px={2} gap={1}>
                                {!!exploreHandler && <IconButton onClick={exploreHandler} >
                                    <OpenInNewIcon sx={{ color: theme.palette.primary.main }} />
                                </IconButton>}
                                <IconButton onClick={editHandler} >
                                    <EditOutlinedIcon sx={{ color: theme.palette.primary.main }} />
                                </IconButton>
                                <IconButton onClick={removeHandler} >
                                    <DeleteOutlinedIcon sx={{ color: theme.palette.primary.main }} />
                                </IconButton>
                            </Stack>
                        </Stack>
                    </Stack >
                </AccordionSummary>

                <AccordionDetails>
                    <Typography variant="body2" color="text.secondary">
                        Description
                    </Typography>
                    <Typography>
                        {description || 'No description to show'}
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </Fragment>
    )
}

export default CustomCard