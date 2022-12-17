import { all } from 'redux-saga/effects';
import adminSaga from './AdminSaga';
import campaignSaga from './CampaningSaga';
import categorySaga from './CategorySaga';
import latestNewsSaga from './LatestNewsSaga';
import mettersSaga from './MattersSaga';
import postSaga from './PostSaga';
import subcategorySaga from './SubcategorySaga';
import userSaga from './UserSaga';

export default function* rootSaga() {
    yield all([
        adminSaga(),
        categorySaga(),
        subcategorySaga(),
        mettersSaga(),
        postSaga(),
        campaignSaga(),
        userSaga(),
        latestNewsSaga()
    ])
}