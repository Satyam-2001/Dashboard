import * as React from 'react';

import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddImage from "../../../components/AddImage";
import CustomModal from "../../../UI/CustomModal";
import { testimonialModalActions } from "../../../store/testimonial_modal-slice";
import { addTestimonial, editTestimonial } from "../../../store/testimonial-slice";
import { useFormik } from 'formik'
import * as yup from "yup";

import FormStepper from "../../../components/FormStepper";

const validationSchema = yup.object().shape({
    name: yup.string().required("required"),
    designation: yup.string().required("required"),
    content: yup.string(),
});


const TestimonialModal = () => {

    const dispatch = useDispatch()
    const { mode, open, testimonial } = useSelector(state => state.testimonial_modal)

    const [imageFile, setImageFile] = useState(undefined)

    const label = mode == 'add' ? 'Write' : 'Edit'

    const steps = [
        `${label} Image`,
        `${label} Name & Designation`,
        `${label} Content`,
    ];

    const { values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setValues
    } = useFormik({
        onSubmit: createTestimonialHandler,
        validationSchema,
        validateOnChange: true,
        validateOnBlur: false,
        initialValues: { name: '', designation: '', content: '', ...testimonial }
    })

    useEffect(() => {
        setImageFile(testimonial.image)
        setValues({ name: '', designation: '', content: '', ...testimonial })
    }, [testimonial])

    function createTestimonialHandler(values) {
        const body = {
            ...values,
            image: imageFile,
        }
        if (mode === 'add') {
            dispatch(addTestimonial(body))
        }
        else {
            dispatch(editTestimonial({ _id: testimonial._id, ...body }))
        }
        closeModal()
    }

    const closeModal = () => {
        dispatch(testimonialModalActions.closeModal())
    }

    const stepComponent = [
        <AddImage imageLink={imageFile} setImageLink={setImageFile} />,
        <React.Fragment>
            <TextField
                fullWidth
                required
                name="name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{ margin: '4px 0' }}
                id="standard-basic"
                label="Name"
                variant="standard" />
            <TextField
                fullWidth
                name="designation"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.designation}
                error={!!touched.designation && !!errors.designation}
                helperText={touched.designation && errors.designation}
                sx={{ margin: '4px 0' }}
                id="standard-basic"
                label="Designation"
                variant="standard" />
        </React.Fragment>,
        <TextField
            fullWidth
            name="content"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.content}
            error={!!touched.content && !!errors.content}
            helperText={touched.content && errors.content}
            sx={{ margin: '4px 0' }}
            id="standard-multiline-static"
            label="Content"
            multiline
            rows={4}
            variant="standard"
        />
    ]

    return (
        <CustomModal
            open={open}
            onClose={closeModal}
            title={mode === 'add' ? 'Create Testimonial' : 'Edit Testimonial'}
        >
            <FormStepper steps={steps} mode={mode} stepComponent={stepComponent} onSubmit={handleSubmit} onClose={closeModal} errors={errors} />

        </CustomModal>)
}

export default TestimonialModal;