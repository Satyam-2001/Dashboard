import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/dashboard/index";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Courses from "./pages/dashboard/courses";
import { useDispatch } from 'react-redux';
import { getCourseData } from "./store/course-slice";
import { useEffect } from "react";
import Testimonials from "./pages/dashboard/testimonials";
import { getTestimonialData } from "./store/testimonial-slice";
import Login from "./pages/login";

window.Buffer = window.Buffer || require("buffer").Buffer;

const router = createBrowserRouter([
  {
    path: '/',
    element: <Dashboard />,
    children: [
      {
        index: true,
        element: <Courses />
      },
      {
        path: 'testimonials',
        element: <Testimonials />
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
])


function App() {
  const dispatch = useDispatch()
  const [theme, colorMode] = useMode();


  useEffect(() => {
    dispatch(getCourseData())
    dispatch(getTestimonialData())
  }, [])

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <RouterProvider router={router} />
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
