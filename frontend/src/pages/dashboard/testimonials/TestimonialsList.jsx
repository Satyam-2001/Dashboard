import { Box } from "@mui/material";
import { useSelector, useDispatch } from 'react-redux'
import { orderDownCourse, orderUpCourse, removeCourse } from '../../../store/course-slice'
import { courseModalActions } from "../../../store/course_modal-slice";
import CustomCard from "../../../components/CustomCard";
import CustomSkeleton from "../../../UI/CustomSkeleton";
import { ErrorOccured, NoCourseExist } from '../../../UI/StaticMessage'
import { orderDownTestimonial, orderUpTestimonial, removeTestimonial } from "../../../store/testimonial-slice";
import { testimonialModalActions } from '../../../store/testimonial_modal-slice'

const TestimonialCard = ({ testimonial }) => {

    const dispatch = useDispatch()

    const removeTestimonialHandler = () => {
        dispatch(removeTestimonial(testimonial._id))
    }

    const openEditModal = () => {
        dispatch(testimonialModalActions.editTestimonial(testimonial))
    }

    return <CustomCard
        title={testimonial.name}
        subtitle={testimonial.designation}
        description={testimonial.content}
        image={testimonial.image}
        editHandler={openEditModal}
        removeHandler={removeTestimonialHandler}
    />
}

const TestimonialsList = ( { testimonials, status }) => {

    if (status === 'loading') {
        return <CustomSkeleton />
    }

    if (status === 'error') {
        return <ErrorOccured />
    }

    if (testimonials.length === 0) {
        return <NoCourseExist />
    }

    return (
        <Box px={2} overflow={'auto'}>
            {testimonials.map(testimonial => {
                return (
                    <TestimonialCard key={testimonial._id} testimonial={testimonial} />
                )
            })}
        </Box>
    )
};

export default TestimonialsList;