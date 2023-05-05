/**
 *
 * Cap
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import { find } from 'lodash';
import { injectIntl } from 'react-intl';
import { CapSpin } from '@capillarytech/cap-ui-library';
import injectSaga from '../../utils/injectSaga';
import componentRoutes from './routes';
import NavigationBar from '../../components/NavigationBar';
import { makeSelectCap, makeSelectSidebarMenuData } from './selectors';
import sagas from './saga';
import * as actions from './actions';
import { SIDEBAR_MENU_ITEM_POSITION, PRODUCTION } from './constants';
import config from '../../config/app';
import './_cap.scss';

const gtm = window.dataLayer || [];

export class Cap extends React.Component {
  componentDidMount() {
    if (!this.props.Global.fetchingUserdata) {
      this.props.actions.getUserData();
    }
    if (this.props.Global.user) {
      const userGtmData = this.getUserGtmData(this.props);
      gtm.push(userGtmData);
    }
    if (this.props.Global.orgID !== undefined) {
      gtm.push({ orgId: this.props.Global.orgID });
    }
    this.props.actions.getSidebarMenuData();
  }

  getUserGtmData = props => {
    const { user: userData } = props.Global;
    const userName = userData.attributes.USERNAME;
    const userEmail = userData.attributes.EMAIL;
    const orgObj = find(userData.proxyOrgList, { orgID: props.Global.orgID });
    const gtmData = {
      orgId: props.Global.orgID,
      orgName: orgObj && orgObj.orgName,
      userId: userData.refID,
      userName: userName && userName.value,
      userEmail: userEmail && userEmail.value,
      isCapUser: userData.isCapUser,
    };
    return gtmData;
  };

  navigateToDashboard = () => {
    const defaultPage =
      process.env.NODE_ENV === PRODUCTION
        ? `${config.production.dashboard_url}/`
        : config.development.dashboard_url;
    const originUrl = window.location.origin;
    window.location.href = `${originUrl}${defaultPage}`;
  };

  logout = () => {
    if (process.env.NODE_ENV === PRODUCTION) {
      const logoutUrl = config.production.logout_url;
      const originUrl = window.location.origin;
      const logoutpage = `${originUrl}${logoutUrl}`;
      localStorage.removeItem('token');
      localStorage.removeItem('orgID');
      localStorage.removeItem('ouId');
      localStorage.removeItem('user');
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('lastReport');
      window.location.href = logoutpage;
    } else {
      this.props.actions.logout();
    }
  };

  changeOrg = orgId => {
    this.props.actions.changeOrg(orgId, this.navigateToDashboard);
  };

  getDefaultSelectedSidebarMenuItem = () => {
    const { sidebarMenuData, history } = this.props;
    const { pathname } = history.location;
    let selectedMenuItem = '';
    sidebarMenuData.forEach(obj => {
      if (obj.link === pathname) {
        selectedMenuItem = obj.key;
      }
    });
    return selectedMenuItem;
  };

  render() {
    const { sidebarMenuData, Global } = this.props;
    const { isLoggedIn, orgID, fetchingUserdata } = Global;
    const loggedIn = isLoggedIn && (orgID === 0 || orgID);
    return (
      <CapSpin spinning={fetchingUserdata} className="cap-container spinner">
        {loggedIn && (
          <NavigationBar
            componentRoutes={componentRoutes}
            userData={this.props.Global}
            sidebarMenuItemsPosition={SIDEBAR_MENU_ITEM_POSITION}
            changeOrg={this.changeOrg}
            logout={this.logout}
            sidebarMenuData={sidebarMenuData}
            defaultSelectedSidebarMenuItem={this.getDefaultSelectedSidebarMenuItem()}
          />
        )}
      </CapSpin>
    );
  }
}

Cap.propTypes = {
  Global: PropTypes.object,
  history: PropTypes.object,
  actions: PropTypes.object,
  sidebarMenuData: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  Global: makeSelectCap(),
  sidebarMenuData: makeSelectSidebarMenuData(),
});

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withSaga = sagas.map((saga, index) =>
  injectSaga({ key: `cap-${index}`, saga }),
);

export default compose(
  ...withSaga,
  withConnect,
)(injectIntl(Cap));
