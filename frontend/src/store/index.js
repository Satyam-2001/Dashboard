import { configureStore } from '@reduxjs/toolkit';

import courseModal from './course_modal-slice';
import courseSlice from './course-slice';
import testimonialSlice from './testimonial-slice'
import testimonialModalSlice from './testimonial_modal-slice';
import userSlice from './user-slice';

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        course: courseSlice.reducer,
        course_modal: courseModal.reducer,
        testimonial: testimonialSlice.reducer,
        testimonial_modal: testimonialModalSlice.reducer
    },
});

export default store;