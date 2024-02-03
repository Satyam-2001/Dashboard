import { Box, useTheme } from "@mui/material";
import SearchOffIcon from '@mui/icons-material/SearchOff';
import { tokens } from "../theme";
import Typography from '@mui/material/Typography';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const Message = ({ message, icon }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <Box
            display='flex'
            flexDirection='column'
            flexGrow={1}
            alignItems='center'
            justifyContent='center'
            sx={{ opacity: 0.3 }}>
            {icon({ fontSize: "large", sx: { color: colors.grey[500], fontSize: '100px' } })}
            <Typography variant='h2' fontWeight={500} color={colors.grey[500]} >
                {message}
            </Typography>
        </Box>
    )
}

export const ErrorOccured = () => {
    return <Message message={'Unknown Error Occured!'} icon={(prop) => <ErrorOutlineIcon {...prop} />} />
}

export const NoCourseExist = () => {
    return <Message message={'No Course Exist!'} icon={(prop) => <SearchOffIcon {...prop} />} />
}