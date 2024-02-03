import { Box, Button, CircularProgress, IconButton, Typography, useTheme } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { StyledModal } from "./StyledModal";


const CustomModal = ({ open, title, onClose, status, onSave, children }) => {

    const theme = useTheme();

    return (
        <StyledModal open={open} onClose={onClose} color={theme.palette.background.default} width='40vw'>
            <Box display='flex' justifyContent='space-between' alignItems='center' width={1}>
                <Typography variant='h5'>
                    {title}
                </Typography>
                <IconButton onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </Box>

            <Box m={1} gap={1}>
                {children}
            </Box>
        </StyledModal>
    )
};

export default CustomModal;