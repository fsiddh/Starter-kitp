import * as types from './constants';

export function authenticate(user) {
  return {
    type: types.LOGIN_REQUEST,
    user,
  };
}

export function logout() {
  return {
    type: types.LOGOUT_REQUEST,
  };
}

export function changeOrg(orgID, successCallback) {
  return {
    type: types.SWITCH_ORG_REQUEST,
    orgID,
    successCallback,
  };
}

export function getUserData() {
  return {
    type: types.GET_USER_DATA_REQUEST,
  };
}

export function getSidebarMenuData() {
  return {
    type: types.GET_SIDEBAR_MENU_DATA_REQUEST,
  };
}
