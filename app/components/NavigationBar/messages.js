/*
 * NavigationBar Messages
 *
 * This contains all the text for the NavigationBar component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.NavigationBar';

export default defineMessages({
  settingsLabel: {
    id: `${scope}.settingsLabel`,
    defaultMessage: 'Tools',
  },
  logout: {
    id: `${scope}.logout`,
    defaultMessage: 'Logout',
  },
});
