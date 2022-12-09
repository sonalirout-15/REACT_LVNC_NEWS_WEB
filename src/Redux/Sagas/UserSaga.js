import * as types from '../ActionTypes/UserActionTypes';
    import {
        all,
        put,
        call,
        fork,
        takeEvery,
} from 'redux-saga/effects';
import { loadUserApi } from '../APIs/UserApi';
import { loadUserError, loadUserSuccess } from '../Actions/UserAction';


export function* onLoadUserStartAsync() {
    try {
        const response = yield call(loadUserApi);
        if (response.data.message === "Success") {
            yield put(loadUserSuccess(response.data.data))
        }
    } catch (error) {
        yield put(loadUserError(error.response))
    }
}


export function* onLoadUser() {
    yield takeEvery(types.LOAD_USER_START, onLoadUserStartAsync)
}


const userSagas = [
    fork(onLoadUser),
]

export default function* userSaga() {
    yield all([...userSagas])
}