/**
 *
 * NavigationBar
 *
 */

import React from 'react';
import { intlShape, injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { CapSideBar } from '@capillarytech/cap-ui-library';
import styled from 'styled-components';
import { Switch, Route, withRouter } from 'react-router-dom';
import { isEmpty, forEach } from 'lodash';
import { loadItem } from 'services/localStorageApi';
import {
  CAP_WHITE,
  CAP_SPACE_64,
} from '@capillarytech/cap-ui-library/styled/variables';
import NotFoundPage from '../../containers/NotFoundPage';
import TopBar from '../TopBar';
import messages from './messages';

const CapWrapper = styled.div`
  position: absolute;
  padding: 0;
  background-color: ${CAP_WHITE};
  width: 100%;
  top: ${CAP_SPACE_64};
  display: flex;
  height: calc(100vh - 100px);
  .ant-collapse {
    background-color: ${CAP_WHITE};
  }
`;

const ComponentWrapper = styled.div`
  max-width: 1180px;
  margin: 0 auto;
  width: ${props => (props.showSidebar ? 'calc(100% - 240px)' : '100%')};
`;

const RenderRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => <Component {...props} />} />
);

class NavigationBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSidebarMenuItem: null,
    };
  }

  getDropdownMenu = () => {
    const { formatMessage } = this.props.intl;
    return [
      {
        label: formatMessage(messages.logout),
        key: formatMessage(messages.logout),
        onClickHandler: this.props.logout,
      },
    ];
  };

  handleOrgChange = orgId => {
    const selectedOrg = loadItem('orgID');
    if (selectedOrg !== orgId) {
      this.props.changeOrg(orgId);
    }
  };

  onSideBarLinkClick = item => {
    const { history } = this.props;
    this.setState({ selectedSidebarMenuItem: item.key });
    history.push(item.link, { code: item.key });
  };

  getProxyOrgList = () => {
    const { userData } = this.props;
    const proxyOrgList = [];
    if (userData && userData.user && userData.user !== '') {
      const { orgName: defaultOrgName, orgID: defaultOrgId } = userData.user;
      proxyOrgList.push({
        label: defaultOrgName,
        value: defaultOrgId,
        key: defaultOrgId,
      });
      const orgList = userData.user.proxyOrgList;
      if (!isEmpty(orgList)) {
        forEach(orgList, item => {
          const id = item.orgID;
          const name = item.orgName;
          if (id !== defaultOrgId) {
            proxyOrgList.push({ label: name, value: id, key: id });
          }
        });
      }
    }
    return proxyOrgList;
  };

  render() {
    const {
      componentRoutes,
      sidebarMenuData,
      sidebarMenuItemsPosition,
      defaultSelectedSidebarMenuItem,
      intl,
    } = this.props;
    console.log('Sidebar menudata: ', sidebarMenuData);
    const proxyOrgList = this.getProxyOrgList();
    const selectedOrg = loadItem('orgID');
    const dropdownMenuProps = this.getDropdownMenu();
    const { selectedSidebarMenuItem } = this.state;
    const customTopBarProps = {};
    return (
      <React.Fragment>
        <TopBar
          proxyOrgList={proxyOrgList}
          selectedOrg={selectedOrg}
          handleOrgChange={this.handleOrgChange}
          dropdownMenuProps={dropdownMenuProps}
          {...customTopBarProps}
        />
        <CapWrapper>
          {sidebarMenuData.length > 0 && sidebarMenuItemsPosition === 'left' ? (
            <CapSideBar
              sidebarItems={sidebarMenuData}
              onLinkClick={this.onSideBarLinkClick}
              selectedMenuItem={
                selectedSidebarMenuItem || defaultSelectedSidebarMenuItem
              }
              pageHeading={intl.formatMessage(messages.settingsLabel)}
            />
          ) : (
            ''
          )}
          <ComponentWrapper
            showSidebar={
              sidebarMenuData.length > 0 && sidebarMenuItemsPosition === 'left'
            }
          >
            <Switch>
              {componentRoutes.map(routeProps => (
                <RenderRoute {...routeProps} key={routeProps.path} />
              ))}
              <RenderRoute component={NotFoundPage} />
            </Switch>
          </ComponentWrapper>
        </CapWrapper>
      </React.Fragment>
    );
  }
}

NavigationBar.propTypes = {
  componentRoutes: PropTypes.array,
  userData: PropTypes.object,
  menuData: PropTypes.array,
  menuItemsPosition: PropTypes.string,
  logout: PropTypes.func,
  changeOrg: PropTypes.func,
  settingsUrl: PropTypes.string,
  intl: intlShape.isRequired,
};

export default withRouter(injectIntl(NavigationBar));
