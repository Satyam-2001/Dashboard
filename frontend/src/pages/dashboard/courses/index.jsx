import { Box, Button, useTheme } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { tokens } from "../../../theme";
import Topbar from "../../../components/Topbar";
import { Fragment, useEffect, useState } from "react";
import CoursesList from "./CoursesList";
import { useDispatch, useSelector } from "react-redux";
import { courseModalActions } from "../../../store/course_modal-slice";
import CourseModal from "./CourseModal";
import SearchBar from "../../../components/SearchBar";

const Courses = () => {
  const theme = useTheme();

  const dispatch = useDispatch()
  const { courses, status } = useSelector(state => state.course)

  const [searchValue, setSearchValue] = useState('')
  const [filteredCourses, setFilteredCourses] = useState([])

  const handleChangeValue = (event) => {
    setSearchValue(event.target.value)
  }

  const addCourseMadalHandler = () => {
    dispatch(courseModalActions.addCourse())
  }

  useEffect(() => {
    setFilteredCourses(courses.filter((course => course.title.includes(searchValue))))
  }, [searchValue, courses])

  return (
    <Fragment>
      <CourseModal />
      <Box display='flex' flexDirection='column' sx={{ height: '100vh' }}>
        <Topbar title="Courses" />

        <Box display="flex" width={1} p={1} my={1}>

          <SearchBar value={searchValue} onChange={handleChangeValue} placeholder="Search Course..." />

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={addCourseMadalHandler}>
            Create Course
          </Button>

        </Box>

        <CoursesList courses={filteredCourses} status={status} />

      </Box>
    </Fragment>
  )
};

export default Courses;