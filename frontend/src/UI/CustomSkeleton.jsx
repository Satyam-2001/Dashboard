import { Box, useTheme, Stack, Skeleton } from "@mui/material";
import { tokens } from "../theme";

const CustomSkeleton = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box px={2} overflow={'auto'} gap={1}>
            {
                Array.from({ length: 3 }, (v, i) => {
                    return (
                        <Stack key={i} direction='row' height='70px' p={1} flexGrow={1} gap={1} sx={{ backgroundColor: colors.primary[500], margin: '0 0 6px 0' }}>
                            <Skeleton key={i} variant="rectangular" width='60px' height='50px' />
                            <Stack justifyContent='space-around' >
                                <Skeleton variant="rectangular" width='140px' height='14px' sx={{ borderRadius: '4px' }} />
                                <Skeleton variant="rectangular" width='90px' height='14px' sx={{ borderRadius: '4px' }} />
                            </Stack>
                            <Stack direction='row' flexGrow={1} gap={1} alignItems='center' justifyContent='flex-end'>
                                <Skeleton variant="circular" width='30px' height='30px' />
                                <Skeleton variant="circular" width='30px' height='30px' />
                                <Skeleton variant="circular" width='30px' height='30px' />
                            </Stack>
                        </Stack>)
                })
            }
        </Box>
    )
}

export default CustomSkeleton