import { Stack, Box, Typography, OutlinedInput, InputAdornment, IconButton, FormControl, InputLabel } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import { getUser, login } from '../../store/user-slice';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { toast } from 'react-toastify';



const Login = (props) => {

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const dispatch = useDispatch();
    const { status } = useSelector(state => state.user)

    useEffect(() => {
        dispatch(getUser())
    }, [])

    useEffect(() => {
        if (status === 'login') {
            toast.success('Login Succesfully')
        }
    }, [status])

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        dispatch(login(data.get("username"), data.get("password")))
    };

    if (status === 'login') {
        return <Navigate to='/' />
    }

    return (
        <Stack>
            <Box
                width='100vw'
                display='flex'
                justifyContent={'flex-start'}
                alignItems={'center'}
                gap={4}
                sx={{
                    zIndex: 5,
                    top: 0,
                    px: { xs: 4, md: 8 },
                    py: { xs: 1, md: 2 },
                    boxShadow: 2,
                    backgroundColor: 'rgb(250, 250, 250)',
                    fontFamily: 'Alumni Sans Inline One'
                }}
            >
                <a href='/'>
                    <img src={require('../../assets/logoblue.png')} height='40px' />
                </a>
            </Box>
            <Container component="main" maxWidth="sm" sx={{ overflow: 'auto', flexGrow: 1, width: '100vw' }} >
                <Box
                    sx={{
                        boxShadow: 3,
                        borderRadius: 2,
                        px: 4,
                        py: 6,
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Log in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoFocus
                        />
                        <FormControl sx={{ width: '100%', marginTop: '1rem' }} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                id="password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            // onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                            />
                        </FormControl>
                        {status === 'invalid' && <Typography color='error'>Invalid username or password</Typography>}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Log In
                        </Button>
                    </Box>
                </Box>
            </Container>
        </Stack>
    )
}

export default Login