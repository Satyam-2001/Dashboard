import { Fragment, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getUser } from "../../store/user-slice";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Stack, useTheme } from "@mui/material";
import Sidebar from "../../components/Sidebar";

function App() {

    const dispatch = useDispatch()
    const { status } = useSelector(state => state.user)

    const theme = useTheme()

    useEffect(() => {
        dispatch(getUser())
    }, [])

    if (status !== 'login') {
        return <Navigate to='/login' />
    }

    return (
        <Fragment>
            <Sidebar />
            <main className="content" >
                <Outlet />
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme={theme.palette.mode}
                />
            </main>
        </Fragment>
    );
}

export default App;
