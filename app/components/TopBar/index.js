import React from 'react';
import PropTypes from 'prop-types';
import { CapTopBar } from '@capillarytech/cap-ui-library';
import { intlShape, injectIntl } from 'react-intl';
import messages from './messages';
const TopBar = props => {
  const {
    proxyOrgList,
    selectedOrg,
    handleOrgChange,
    dropdownMenuProps,
    intl,
  } = props;

  return (
    <CapTopBar
      selectProps={{
        items: proxyOrgList,
        selectedItem: selectedOrg,
        handleItemChange: handleOrgChange,
        selectPlaceholder: intl.formatMessage(messages.selectOrganization),
        showSearch: true,
        showHeader: true,
        title: intl.formatMessage(messages.selectOrganization),
        placeholder: intl.formatMessage(messages.organization),
        noResultText: intl.formatMessage(messages.noResultText),
      }}
      dropdownMenuProps={dropdownMenuProps}
    />
  );
};

TopBar.propTypes = {
  proxyOrgList: PropTypes.array,
  selectedOrg: PropTypes.number,
  handleOrgChange: PropTypes.func,
  dropdownMenuProps: PropTypes.array,
  intl: intlShape.isRequired,
};

export default injectIntl(TopBar);
