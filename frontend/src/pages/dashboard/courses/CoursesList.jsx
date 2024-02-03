import { Box } from "@mui/material";
import { useSelector, useDispatch } from 'react-redux'
import { removeCourse } from '../../../store/course-slice'
import { courseModalActions } from "../../../store/course_modal-slice";
import CustomCard from "../../../components/CustomCard";
import CustomSkeleton from "../../../UI/CustomSkeleton";
import { ErrorOccured, NoCourseExist } from '../../../UI/StaticMessage'

const CourseCard = ({ course }) => {

    const dispatch = useDispatch()

    const removeCourseHandler = () => {
        dispatch(removeCourse(course._id))
    }

    const openLinkHandler = () => {
        let url = course.url
        if (!course.url.startsWith('https:')) {
            url = 'https://' + url
        }
        window.open(url, '_blank');
    }

    const openEditModal = () => {
        dispatch(courseModalActions.editCourse(course))
    }

    return <CustomCard
        title={course.title}
        subtitle={course.url}
        description={course.description}
        image={course.image}
        editHandler={openEditModal}
        exploreHandler={openLinkHandler}
        removeHandler={removeCourseHandler}
    />
}

const CoursesList = ({ courses, status }) => {

    if (status === 'loading') {
        return <CustomSkeleton />
    }

    if (status === 'error') {
        return <ErrorOccured />
    }

    if (courses.length === 0) {
        return <NoCourseExist />
    }

    return (
        <Box px={2} overflow={'auto'}>
            {courses.map(course => {
                return (
                    <CourseCard key={course._id} course={course} />
                )
            })}
        </Box>
    )
};

export default CoursesList;