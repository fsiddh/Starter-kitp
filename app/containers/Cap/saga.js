import { fork, take, call, put, cancel, takeLatest } from 'redux-saga/effects';
import * as Api from '../../services/api';
import * as LocalStorage from '../../services/localStorageApi';
import * as types from './constants';
import config from '../../config/app';

function* authorize(user) {
  try {
    const res = yield call(Api.authorize, user);
    yield call(LocalStorage.saveItem, 'token', res.token);
    yield call(LocalStorage.saveItem, 'orgID', res.user.orgID);
    yield call(LocalStorage.saveItem, 'user', res.user);
    yield call(LocalStorage.saveItem, 'isLoggedIn', true);
    yield put({ type: types.LOGIN_SUCCESS, res });
  } catch (error) {
    yield put({ type: types.LOGIN_FAILURE, error });
  }
}

function* switchOrg({ orgID, successCallback }) {
  try {
    LocalStorage.saveItem('orgID', orgID);
    const res = yield call(Api.changeProxyOrg, orgID);
    yield [
      put({ type: types.SWITCH_ORG_SUCCESS, orgID, isSuccess: res.success }),
    ];
    yield successCallback();
  } catch (error) {
    yield put({ type: types.SWITCH_ORG_FAILURE, error });
  }
}

function* loginFlow() {
  const condition = true;
  while (condition) {
    const { user } = yield take(types.LOGIN_REQUEST);
    const task = yield fork(authorize, user);
    const action = yield take([types.LOGOUT_REQUEST, types.LOGIN_FAILURE]);
    if (action.type === types.LOGOUT_REQUEST) {
      yield cancel(task);
    }
  }
}

function* logoutFlow() {
  try {
    const serverLogout = yield call(Api.logout);
    if (serverLogout.success && serverLogout.success === true) {
      const loginUrl =
        process.env.NODE_ENV === 'production'
          ? `${config.production.login_url}`
          : `${config.development.login_url}`;
      yield [put({ type: types.LOGOUT_SUCCESS })];
      yield call(LocalStorage.clearItem, 'token');
      yield call(LocalStorage.clearItem, 'orgID');
      yield call(LocalStorage.clearItem, 'user');
      yield call(LocalStorage.clearItem, 'isLoggedIn');
      window.location.href = loginUrl;
    }
  } catch (error) {
    yield put({ type: types.LOGOUT_FAILURE, error });
  }
}

export function* fetchUserInfo({ callback }) {
  try {
    const result = yield call(Api.getUserData);
    const userData = result.user;
    const { currentOrgDetails } = result;
    if (
      !(
        currentOrgDetails &&
        currentOrgDetails.basic_details &&
        currentOrgDetails.basic_details.base_language &&
        (currentOrgDetails.basic_details.base_language !== '' ||
          currentOrgDetails.basic_details.base_language === null)
      )
    ) {
      currentOrgDetails.basic_details.base_language = 'en';
    }
    if (
      !(
        currentOrgDetails &&
        currentOrgDetails.basic_details &&
        currentOrgDetails.basic_details.supported_languages &&
        currentOrgDetails.basic_details.supported_languages.length > 0
      )
    ) {
      currentOrgDetails.basic_details.supported_languages = [
        {
          lang_id: 69,
          language: 'English',
          iso_code: 'en',
        },
      ];
    }
    yield call(LocalStorage.saveItem, 'orgID', result.currentOrgId);
    yield call(LocalStorage.saveItem, 'user', userData);

    yield put({
      type: types.GET_USER_DATA_SUCCESS,
      userData,
      currentOrgId: result.currentOrgId,
      currentOrgDetails,
    });
    if (callback) {
      callback(userData);
    }
  } catch (error) {
    yield call(LocalStorage.clearItem, 'user');
    yield put({
      type: types.GET_USER_DATA_FAILURE,
      error,
    });
  }
}

function* watchForFetchUserInfo() {
  yield takeLatest(types.GET_USER_DATA_REQUEST, fetchUserInfo);
}

function* watchForOrgChange() {
  yield takeLatest(types.SWITCH_ORG_REQUEST, switchOrg);
}

function* watchForLogoutFlow() {
  yield takeLatest(types.LOGOUT_REQUEST, logoutFlow);
}

function* getSidebarMenuData() {
  try {
    yield put({
      type: types.GET_SIDEBAR_MENU_DATA_SUCCESS,
      data: types.getSettingsMenuData(),
    });
  } catch (error) {
    yield put({ type: types.GET_SIDEBAR_MENU_DATA_FAILURE, error });
  }
}

function* watchGetSidebarMenuData() {
  yield takeLatest(types.GET_SIDEBAR_MENU_DATA_REQUEST, getSidebarMenuData);
}

export default [
  loginFlow,
  watchForOrgChange,
  watchForLogoutFlow,
  watchGetSidebarMenuData,
  watchForFetchUserInfo,
];
