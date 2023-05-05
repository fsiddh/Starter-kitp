import { fromJS } from 'immutable';
import _ from 'lodash';
import * as types from './constants';
import initialState from '../../initialState';

function capReducer(state = fromJS(initialState.cap), action) {
  switch (action.type) {
    case types.LOGIN_REQUEST:
      return state
        .set('login_progress', true)
        .set('errorCode', '')
        .set('message', '');
    case types.LOGIN_SUCCESS:
      return state
        .set('login_progress', false)
        .set('token', action.res.token)
        .set('user', fromJS(action.res.user))
        .set('errorCode', '')
        .set('orgID', action.res.user.orgID)
        .set('message', '')
        .set('authenticated', true)
        .set('isLoggedIn', true);
    case types.LOGIN_FAILURE:
      return state
        .set('login_progress', false)
        .set('message', action.error.message)
        .set('errorCode', action.error.response.status)
        .set('isLoggedIn', false);
    case types.LOGOUT_REQUEST:
      return state.set('login_progress', false);
    case types.LOGOUT_SUCCESS:
      return state;
    case types.LOGOUT_FAILURE:
      return state;
    case types.SWITCH_ORG_REQUEST:
      return state
        .set('settingProxyOrg', true)
        .set('changeProxyOrgSuccess', false);
    case types.SWITCH_ORG_SUCCESS:
      return state
        .set('orgID', action.orgID)
        .set('settingProxyOrg', false)
        .set('changeProxyOrgSuccess', action.isSuccess);
    case types.SWITCH_ORG_FAILURE:
      return state
        .set('settingProxyOrg', false)
        .set('changeProxyOrgSuccess', false);
    case types.ADD_MESSAGE: {
      const message = {
        messageId: action.message.id,
        title: action.message.title,
        text: action.message.text,
        type: action.message.type,
        hideProgressBar: action.message.hideProgressBar,
      };
      return state.set(
        'messages',
        fromJS(state.get('messages').concat(message)),
      );
    }
    case types.REMOVE_MESSAGE: {
      const messageQueue = state.get('messages').toJS();
      const messageIndex = _.findIndex(messageQueue, {
        messageId: action.messageIndex,
      });
      messageQueue.splice(messageIndex, 1);
      return state.set('messages', fromJS(messageQueue));
    }
    case types.GET_USER_DATA_REQUEST:
      return state.set('fetchingUserdata', true);
    case types.GET_USER_DATA_SUCCESS:
      return state
        .set('fetchingUserdata', false)
        .set('user', fromJS(action.userData))
        .set('currentOrgDetails', fromJS(action.currentOrgDetails))
        .set('isLoggedIn', true)
        .set('orgID', action.currentOrgId);
    case types.GET_USER_DATA_FAILURE:
      return state.set('fetchingUserdata', false);
    case types.GET_SIDEBAR_MENU_DATA_REQUEST:
      return state.set('sidebarMenuData', fromJS({ status: 'request' }));
    case types.GET_SIDEBAR_MENU_DATA_SUCCESS:
      return state.set(
        'sidebarMenuData',
        fromJS({ status: 'success', data: action.data }),
      );
    case types.GET_SIDEBAR_MENU_DATA_FAILURE:
      return state.set(
        'sidebarMenuData',
        fromJS({ status: 'failure', error: action.error }),
      );
    case types.CLEAR_SIDEBAR_MENU_DATA:
      return state.set('sidebarMenuData', fromJS({}));
    default:
      return state;
  }
}

export default capReducer;
