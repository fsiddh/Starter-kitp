/*
 * Cap Messages
 *
 * This contains all the text for the Cap container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Cap';

export default defineMessages({
  done: {
    id: `${scope}.done`,
    defaultMessage: 'Done',
  },
  cancel: {
    id: `${scope}.cancel`,
    defaultMessage: 'Cancel',
  },
  eventNotification: {
    id: `${scope}.eventNotification`,
    defaultMessage: 'Card configuration',
  },
});
