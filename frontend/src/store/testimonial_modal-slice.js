import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    mode: '',
    open: false,
    status: 'close',
    testimonial: {}
}

const testimonialModalSlice = createSlice({
    name: 'testimonial_modal',
    initialState,
    reducers: {
        setStatus(state, action) {
            state.status = action.payload
        },
        closeModal(state) {
            state.open = false
        },
        editTestimonial(state, action) {
            state.mode = 'edit'
            state.open = true
            state.status = 'open'
            state.testimonial = action.payload
        },
        addTestimonial(state) {
            state.mode = 'add'
            state.open = true
            state.status = 'open'
            state.testimonial = {}
        },
    },
});

export const testimonialModalActions = testimonialModalSlice.actions;

export default testimonialModalSlice;