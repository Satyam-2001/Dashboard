import * as React from 'react';

import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { addCourse, editCourse } from "../../../store/course-slice";
import { useDispatch, useSelector } from "react-redux";
import { courseModalActions } from "../../../store/course_modal-slice";
import AddImage from "../../../components/AddImage";
import CustomModal from "../../../UI/CustomModal";
import { useFormik } from 'formik'
import * as yup from "yup";

import FormStepper from "../../../components/FormStepper";

const validationSchema = yup.object().shape({
    title: yup.string().required("required"),
    url: yup.string().required("required"),
    description: yup.string(),
});


const CourseModal = () => {

    const dispatch = useDispatch()
    const { open, course, mode } = useSelector(state => state.course_modal)


    const [imageFile, setImageFile] = useState(undefined)

    const label = mode == 'add' ? 'Write' : 'Edit'

    const steps = [
        `${label} Image`,
        `${label} Title & URL`,
        `${label} Description`,
    ];

    const { values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setValues
    } = useFormik({
        onSubmit: createCourseHandler,
        validationSchema,
        validateOnChange: true,
        validateOnBlur: false,
        initialValues: { title: '', url: '', description: '', ...course }
    })

    useEffect(() => {
        setImageFile(course.image)
        setValues({ title: '', url: '', description: '', ...course })
    }, [course])


    function createCourseHandler(values) {
        const body = {
            ...values,
            image: imageFile,
        }
        if (mode === 'add') {
            dispatch(addCourse(body))
        }
        else {
            dispatch(editCourse({ _id: course._id, ...body }))
        }
        closeModal()
    }

    const closeModal = () => {
        dispatch(courseModalActions.closeModal())
    }

    const stepComponent = [
        <AddImage imageLink={imageFile} setImageLink={setImageFile} />,
        <React.Fragment>
            <TextField
                fullWidth
                required
                name="title"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.title}
                error={!!touched.title && !!errors.title}
                helperText={touched.title && errors.title}
                sx={{ margin: '4px 0' }}
                id="standard-basic"
                label="Title"
                variant="standard" />
            <TextField
                fullWidth
                name="url"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.url}
                error={!!touched.url && !!errors.url}
                helperText={touched.url && errors.url}
                sx={{ margin: '4px 0' }}
                id="standard-basic"
                label="url"
                variant="standard" />
        </React.Fragment>,
        <TextField
            fullWidth
            name="description"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.description}
            error={!!touched.description && !!errors.description}
            helperText={touched.description && errors.description}
            sx={{ margin: '4px 0' }}
            id="standard-multiline-static"
            label="Description"
            multiline
            rows={4}
            variant="standard"
        />
    ]

    return (
        <CustomModal
            open={open}
            onClose={closeModal}
            title={mode === 'add' ? 'Create Course' : 'Edit Course'}
        >
            <FormStepper steps={steps} mode={mode} stepComponent={stepComponent} onSubmit={handleSubmit} onClose={closeModal} errors={errors} />

        </CustomModal>)
}

export default CourseModal;