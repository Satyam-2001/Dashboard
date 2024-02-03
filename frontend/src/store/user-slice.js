import { createSlice } from '@reduxjs/toolkit';
import { callAPI } from '../services/callAPI';


const initialState = {
    username: '',
    status: 'pending'
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            state.username = action.payload
            state.status = 'login'
        },
        setStatus(state, action) {
            state.status = action.payload
        }
    },
});

export const userActions = userSlice.actions;

export const getUser = () => {
    return async (dispatch) => {
        const user = localStorage.getItem('user')
        if (!user) {
            dispatch(userActions.setStatus('logout'))
        }
        else {
            dispatch(userActions.setStatus('login'))
        }
    }
}

export const login = (username, password) => {
    return async (dispatch) => {
        dispatch(userActions.setStatus('fetching'))
        try {
            const { user, token } = await callAPI('post', 'user/login', { username, password })
            dispatch(userActions.setUser(user.username))
            localStorage.setItem('token', token)
            localStorage.setItem('user', user.username)
        } catch (e) {
            dispatch(userActions.setStatus('invalid'))
        }
    }
}

export const logout = () => {
    return async (dispatch) => {
        dispatch(userActions.setStatus('pending'))
        try {
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            dispatch(userActions.setStatus('logout'))
            await callAPI('post', 'user/logout')
        } catch (e) {
            dispatch(userActions.setStatus('logout'))
            localStorage.removeItem('token')
            localStorage.removeItem('user')
        }
    }
}

export default userSlice;