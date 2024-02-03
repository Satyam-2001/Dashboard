import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    mode: '',
    open: false,
    status: 'close',
    course: {}
}

const courseModalSlice = createSlice({
    name: 'course_modal',
    initialState,
    reducers: {
        setStatus(state, action) {
            state.status = action.payload
        },
        closeModal(state) {
            state.open = false
        },
        editCourse(state, action) {
            state.mode = 'edit'
            state.open = true
            state.status = 'open'
            state.course = action.payload
        },
        addCourse(state) {
            state.mode = 'add'
            state.open = true
            state.status = 'open'
            state.course = {}
        },
    },
});

export const courseModalActions = courseModalSlice.actions;

export default courseModalSlice;