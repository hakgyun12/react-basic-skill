import { handleActions } from "redux-actions";
import { takeLatest } from 'redux-saga/effects';
//import { startLoading, finishLoading } from "./loading";
import * as api from '../lib/api';
import createRequestThunk from "../lib/createRequestThunk";
import createRequestSaga from "../lib/createRequestSaga";

// 액션 타입을 선언합니다.
// 한 요청당 세 개를 만들어야 합니다.

const GET_POST = 'sample/GET_POST';
const GET_POST_SUCCESS = 'sample/GET_POST_SUCCESS';
//const GET_POST_FAILURE = 'sample/GET_POST_FAILURE';

const GET_USERS = 'sample/GET_USERS';
const GET_USERS_SUCCESS = 'sample/GET_USERS_SUCCESS';
//const GET_USERS_FAILURE = 'sample/GET_USERS_FAILURE';

// thunk 함수를 생성합니다.
// thunk 함수 내부에서는 시작 할 때, 성공했을 때, 실패했을 때 다른 액션을 디스패치합니다.

export const getPost = createRequestThunk(GET_POST, id => id);
export const getUsers = createRequestThunk(GET_USERS);

const getPostSage = createRequestSaga(GET_POST, api.getPost);
const getUsersSaga = createRequestSaga(GET_USERS, api.getUsers);

// 초기 상태를 선언합니다
// 요청의 로딩 중 상태는 loading이라는 객체에서 관리합니다.

export function* sampleSage() {
    yield takeLatest(GET_POST, getPostSage);
    yield takeLatest(GET_USERS, getUsersSaga);
}

const initialState = {
    post: null,
    users: null
};

const sample = handleActions(
    {
        [GET_POST_SUCCESS]: (state, action) => ({
            ...state,
            post: action.payload
        }),
        [GET_USERS_SUCCESS]: (state, action) => ({
            ...state,
            users: action.payload
        }),
    },
    initialState
);

export default sample; 