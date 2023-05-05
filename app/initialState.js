import { loadItem } from './services/localStorageApi';

export default {
  cap: {
    login_progress: false,
    fetchingUserdata: false,
    token: loadItem('token') || '',
    orgID: loadItem('orgID') || '',
    user: loadItem('user') || '',
    sidebarMenuData: [],
  },
};
