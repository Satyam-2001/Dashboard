import { createSlice } from '@reduxjs/toolkit';
import { callAPI } from '../services/callAPI';
import { courseModalActions } from './course_modal-slice';

const initialState = {
    status: 'loading',
    courses: []
}

const courseSlice = createSlice({
    name: 'course',
    initialState,
    reducers: {
        setFields(state, action) {
            state.status = action.payload.status
            state.courses = action.payload.courses
        },
        addCourse(state, action) {
            state.courses.push(action.payload)
            state.courses.sort((a, b) => a.index - b.index)
        },
        editCourse(state, action) {
            const index = state.courses.findIndex((course) => course._id === action.payload._id)
            if (index === -1) {
                return
            }
            state.courses[index] = action.payload
        },
        removeCourse(state, action) {
            state.courses = state.courses.filter((course) => course._id !== action.payload)
        }
    },
});

export const courseActions = courseSlice.actions;

export const getCourseData = () => {
    return async (dispatch) => {
        dispatch(courseActions.setFields(initialState))
        try {
            const courses = await callAPI('get', 'course', undefined)
            dispatch(courseActions.setFields({ status: 'sucess', courses }))
        } catch {
            dispatch(courseActions.setFields({ status: 'error' }))
        }
    }
}

export const addCourse = (new_course) => {
    return async (dispatch) => {
        try {
            dispatch(courseModalActions.setStatus('loading'))
            const course = await callAPI('post', 'course', new_course)
            dispatch(courseActions.addCourse(course))
            dispatch(courseModalActions.closeModal())
        } catch {
            dispatch(courseModalActions.setStatus('error'))
        }
    }
}

export const removeCourse = (course_id) => {
    return async (dispatch) => {
        try {
            dispatch(courseActions.removeCourse(course_id))
            await callAPI('delete', `course/${course_id}`)
        } catch {

        }
    }
}

export const editCourse = (course) => {
    return async (dispatch) => {
        try {
            dispatch(courseModalActions.setStatus('loading'))
            await callAPI('patch', 'course', course)
            dispatch(courseActions.editCourse(course))
            dispatch(courseModalActions.closeModal())
        } catch {
            dispatch(courseModalActions.setStatus('error'))
        }
    }
}

export default courseSlice;