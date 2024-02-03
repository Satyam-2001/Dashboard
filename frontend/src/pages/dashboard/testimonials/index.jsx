import { Box, Button, Container, IconButton, InputAdornment, styled, TextField, Typography, useTheme } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from '@mui/icons-material/Add';
import { tokens } from "../../../theme";
import Topbar from "../../../components/Topbar";
import { Fragment, useEffect, useState } from "react";
import { callAPI } from "../../../services/callAPI";
import { useDispatch, useSelector } from "react-redux";
// import { courseModalActions } from "../../store/course_modal-slice";
// import CourseModal from "./CourseModal";
import SearchBar from "../../../components/SearchBar";
import TestimonialModal from "./TestimonialModal";
import { testimonialModalActions } from "../../../store/testimonial_modal-slice";
import TestimonialsList from "./TestimonialsList";

const Testimonials = () => {
    const theme = useTheme();

    const dispatch = useDispatch()
    const { testimonials, status } = useSelector(state => state.testimonial)

    const [searchValue, setSearchValue] = useState('')
    const [filteredTestimonials, setFilteredTestimonials] = useState([])

    const handleChangeValue = (event) => {
        setSearchValue(event.target.value)
    }

    const addTestimonialModalHandler = () => {
        dispatch(testimonialModalActions.addTestimonial())
    }

    useEffect(() => {
        setFilteredTestimonials(testimonials.filter((testimonial => testimonial.name.includes(searchValue))))
    }, [searchValue, testimonials])

    return (
        <Fragment>
            <TestimonialModal />
            <Box display='flex' flexDirection='column' sx={{ height: '100vh' }}>
                <Topbar title="Testimonials" />

                <Box display="flex" width={1} p={1} my={1}>

                    <SearchBar value={searchValue} onChange={handleChangeValue} placeholder="Search Testimonials..." />

                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={addTestimonialModalHandler}
                    >
                        Create Testimonial
                    </Button>

                </Box>

                <TestimonialsList testimonials={filteredTestimonials} status={status} />
                {/* <CoursesList courses={filteredTestimonials} /> */}

            </Box>
        </Fragment>
    )
};

export default Testimonials;