import * as types from '../ActionTypes/UserActionTypes';

export const loadUserStart = (user) => ({
    type: types.LOAD_USER_START,
    payload: user
})

export const loadUserSuccess = (user) => ({
    type: types.LOAD_USER_SUCCESS,
    payload: user,
})

export const loadUserError = (error) => ({
    type: types.LOAD_USER_ERROR,
    payload: error
})