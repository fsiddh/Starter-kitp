import { defineMessages } from 'react-intl';

export default defineMessages({
  pageTitle: {
    id: 'app.containers.Login.pageTitle',
    defaultMessage: 'Login',
  },
  invalidCredential: {
    id: 'app.containers.Login.invalidCredential',
    defaultMessage: 'Invalid Username or Password',
  },
  somethingWrong: {
    id: 'app.containers.Login.somethingWrong',
    defaultMessage: 'Something Went Wrong',
  },
  sessionExpired: {
    id: 'app.containers.Login.sessionTimedOut',
    defaultMessage: `We have logged you out either because your log in time has exceeded <b>24 hrs</b><br />
      or because you <b>logged out in another tab</b>. Please log in again to continue.`,
  },
});
