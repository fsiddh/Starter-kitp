import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import path from '../../config/path';

export const DEFAULT_LOCALE = 'en';
export const SWITCH_ORG_REQUEST = 'cap/SWITCH_ORG_REQUEST';
export const SWITCH_ORG_SUCCESS = 'cap/SWITCH_ORG_SUCCESS';
export const SWITCH_ORG_FAILURE = 'cap/SWITCH_ORG_FAILURE';
export const LOGIN_REQUEST = 'cap/LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'cap/LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'cap/LOGIN_FAILURE';

export const LOGOUT_REQUEST = 'cap/LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'cap/LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'cap/LOGOUT_FAILURE';
export const ADD_MESSAGE = 'cap/ADD_MESSAGE';
export const REMOVE_MESSAGE = 'cap/REMOVE_MESSAGE';
export const GET_USER_DATA_REQUEST = 'cap/GET_USER_DATA_REQUEST';
export const GET_USER_DATA_SUCCESS = 'cap/GET_USER_DATA_SUCCESS';
export const GET_USER_DATA_FAILURE = 'cap/GET_USER_DATA_FAILURE';

export const GET_SIDEBAR_MENU_DATA_REQUEST =
  'cap/GET_SIDEBAR_MENU_DATA_REQUEST';
export const GET_SIDEBAR_MENU_DATA_SUCCESS =
  'cap/GET_SIDEBAR_MENU_DATA_SUCCESS';
export const GET_SIDEBAR_MENU_DATA_FAILURE =
  'cap/GET_SIDEBAR_MENU_DATA_FAILURE';
export const CLEAR_SIDEBAR_MENU_DATA = 'cap/CLEAR_SIDEBAR_MENU_DATA';

export const SIDEBAR_MENU_ITEM_POSITION = 'left';
export const PRODUCTION = 'production';

export const getSettingsMenuData = () => [
  {
    title: <FormattedMessage {...messages.eventNotification} />,
    key: 'eventNotification',
    link: `${path.publicPath}`,
  },
];
