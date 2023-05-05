import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';
import connectedAuthWrapper from 'redux-auth-wrapper/connectedAuthWrapper';
import config from '../config/app';

const loginUrl =
  process.env.NODE_ENV === 'production'
    ? `${config.production.login_url}`
    : `${config.development.login_url}`;

const getIsLoggedIn = () => {
  let isLoggedIn = false;
  if (
    process.env.NODE_ENV === 'production' &&
    JSON.parse(window.localStorage.getItem('isLoggedIn'))
  ) {
    isLoggedIn = true;
  } else if (localStorage.getItem('token')) {
    isLoggedIn = true;
  }
  return isLoggedIn;
};

const userIsAuthenticatedDefaults = {
  authenticatedSelector: getIsLoggedIn,
  wrapperDisplayName: 'UserIsAuthenticated',
};

export const userIsAuthenticated = connectedAuthWrapper(
  userIsAuthenticatedDefaults,
);

export const userIsAuthenticatedRedir = connectedRouterRedirect({
  ...userIsAuthenticatedDefaults,
  redirectPath: loginUrl,
});
