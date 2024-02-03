import { createSlice } from '@reduxjs/toolkit';
import { callAPI } from '../services/callAPI';
import { testimonialModalActions } from './testimonial_modal-slice';

const initialState = {
    status: 'loading',
    testimonials: []
}

const testimonialSlice = createSlice({
    name: 'testimonial',
    initialState,
    reducers: {
        setFields(state, action) {
            state.status = action.payload.status
            state.testimonials = action.payload.testimonials
        },
        addTestimonial(state, action) {
            state.testimonials.push(action.payload)
        },
        editTestimonial(state, action) {
            const index = state.testimonials.findIndex((testimonial) => testimonial._id === action.payload._id)
            if (index === -1) {
                return
            }
            state.testimonials[index] = action.payload
        },
        removeTestimonial(state, action) {
            state.testimonials = state.testimonials.filter((testimonial) => testimonial._id !== action.payload)
        },
    },
});

export const testimonialActions = testimonialSlice.actions;

export const getTestimonialData = () => {
    return async (dispatch) => {
        dispatch(testimonialActions.setFields(initialState))
        try {
            const testimonials = await callAPI('get', 'testimonial')
            dispatch(testimonialActions.setFields({ status: 'sucess', testimonials }))
        } catch {
            dispatch(testimonialActions.setFields({ status: 'error' }))
        }
    }
}

export const addTestimonial = (new_testimonial) => {
    return async (dispatch) => {
        try {
            dispatch(testimonialModalActions.setStatus('loading'))
            const testimonial = await callAPI('post', 'testimonial', new_testimonial)
            dispatch(testimonialActions.addTestimonial(testimonial))
            dispatch(testimonialModalActions.closeModal())
        } catch (e) {
            dispatch(testimonialModalActions.setStatus('error'))
        }
    }
}

export const removeTestimonial = (testimonial_id) => {
    return async (dispatch) => {
        try {
            dispatch(testimonialActions.removeTestimonial(testimonial_id))
            await callAPI('delete', `testimonial/${testimonial_id}`)
        } catch {

        }
    }
}

export const editTestimonial = (testimonial) => {
    return async (dispatch) => {
        try {
            dispatch(testimonialModalActions.setStatus('loading'))
            await callAPI('patch', 'testimonial', testimonial)
            dispatch(testimonialActions.editTestimonial(testimonial))
            dispatch(testimonialModalActions.closeModal())
        } catch {
            dispatch(testimonialModalActions.setStatus('error'))
        }
    }
}

export default testimonialSlice;