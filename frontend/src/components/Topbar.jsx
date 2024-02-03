import { Box, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Paper, Popover, Stack, Typography, useTheme } from "@mui/material";
import { Fragment, useContext, useRef, useState } from "react";
import { ColorModeContext, tokens } from "../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { logout } from "../store/user-slice";
import { useDispatch } from "react-redux";
import CustomModal from "../UI/CustomModal";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { callAPI } from "../services/callAPI";

const Topbar = ({ title }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const dispatch = useDispatch()

  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(false)
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false)

  const inputRef = useRef()

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const openPopOver = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const logoutHandler = () => {
    dispatch(logout())
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const password = inputRef.current.value;
      if (password.length < 6) {
        setError('Password must be 6 characters long')
        return;
      }
      const res = await callAPI('post', 'user/password', { password })
      setOpenModal(false)
    } catch (e) {
      setError('Password not changed!')
    }
  }

  // open, title, onClose, status, onSave,

  return (
    <Fragment>
      <CustomModal open={openModal} onClose={() => setOpenModal(false)} title='Change Password' onSave={handleSubmit} >
        <Box component="form" onSubmit={handleSubmit} noValidate mb={3}>
          <FormControl sx={{ width: '100%', marginTop: '1rem' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              inputRef={inputRef}
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
          {error && <Typography color='error'>{error}</Typography>}
        </Box>
      </ CustomModal>
      <Paper elevation={2}>
        <Box display="flex" justifyContent="space-between" p={2} backgroundColor={colors.primary[400]}>
          {/* SEARCH BAR */}
          <Box
            display="flex"
            alignItems="center"

            borderRadius="3px"
            px={2}
          >
            <Typography variant="h3" fontWeight={600} letterSpacing={1} textTransform={"uppercase"} >
              {title}
            </Typography>
            {/* <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton> */}
          </Box>

          {/* ICONS */}
          <Box display="flex" gap={1}>
            <IconButton onClick={colorMode.toggleColorMode}>
              {theme.palette.mode === "dark" ? (
                <DarkModeOutlinedIcon />
              ) : (
                <LightModeOutlinedIcon />
              )}
            </IconButton>
            <IconButton onClick={handleClick}>
              <PersonOutlinedIcon />
            </IconButton>
            <Popover
              open={openPopOver}
              anchorEl={anchorEl}
              onClose={() => setAnchorEl(undefined)}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              sx={{ color: 'rgb(22,27,34)' }}
              PaperProps={{ sx: { backgroundColor: colors.primary[400] } }}
            >
              <Stack px={2} py={2} sx={{ backgroundColor: colors.primary[500] }}>
                <Button onClick={() => setOpenModal(true)} >Change Password</Button>
                <Button onClick={logoutHandler} >Logout</Button>
              </Stack>
            </Popover>
            {/* 
          <IconButton>
            <NotificationsOutlinedIcon />
          </IconButton>
          <IconButton>
            <SettingsOutlinedIcon />
          </IconButton> */}
          </Box>
        </Box>
      </Paper>
    </Fragment>
  );
};

export default Topbar;
