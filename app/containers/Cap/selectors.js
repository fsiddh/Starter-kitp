import { createSelector } from 'reselect';

/**
 * Direct selector to the cap state domain
 */

const selectCap = state => state.get('cap');

/**
 * Other specific selectors
 */

const makeSelectCap = () =>
  createSelector(selectCap, substate => substate.toJS());

const makeSelectSidebarMenuData = () =>
  createSelector(selectCap, substate => {
    const sidebarMenuData = substate.get('sidebarMenuData').toJS();
    let parsedMenuData = [];
    if (sidebarMenuData.status === 'success' && sidebarMenuData.data) {
      parsedMenuData = sidebarMenuData.data;
    }
    return parsedMenuData;
  });
export { selectCap, makeSelectCap, makeSelectSidebarMenuData };
