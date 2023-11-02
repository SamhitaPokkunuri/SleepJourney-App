import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

export const initialState = {
  countrySelector: {
    // isExpanded is used for the main drawer
    isExpanded: false,
    // isVisible is used to determine if the drawer is fully closed
    isVisible: false,
    // expanded holds the titles of each region [title]
    expanded: [],
  },
  mainMenu: {
    // mobileDrawerOpen is used to toggle the mobile drawer
    mobileDrawerOpen: false,
    // desktopDrawerOpen is used to toggle the desktop drawer
    desktopDrawerOpen: false,
    // isAnimating is used to add a css transition property
    isAnimating: false,
    // breadcrumbs holds an array expanded breadcrumb ids
    breadcrumbs: [],
    // expanded holds an array of expanded sub menu ids
    expanded: [],
    // heights holds an array of expanded list heights
    heights: [],
  },
  globalSearch: {
    // isExpanded is used for the search dialog
    isExpanded: false,
    // value is used to update the search term
    value: '',
    endValue: '',
  },
  inpageNavigation: {
    // isSticky is used to determine the position of the nav
    isSticky: false,
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    updateCountrySelector: (state, { payload }) => {
      const {
        countrySelector: { expanded },
      } = state;

      if (payload.hasOwnProperty('isExpanded')) {
        state.countrySelector.isExpanded = payload.isExpanded;
      }

      if (payload.hasOwnProperty('isVisible')) {
        state.countrySelector.isVisible = !!payload.isVisible;
      }

      if (payload.hasOwnProperty('expanded')) {
        const index = expanded.indexOf(payload.expanded[0]);

        if (index < 0) {
          state.countrySelector.expanded = expanded.concat(payload.expanded);
        } else {
          expanded.splice(index, 1);
        }
      }
    },
    updateMainMenu: (state, { payload }) => {
      const {
        mainMenu: { expanded, breadcrumbs, heights },
      } = state;

      if (payload.hasOwnProperty('mobileDrawerOpen')) {
        state.mainMenu.mobileDrawerOpen = payload.mobileDrawerOpen;
      }

      if (payload.hasOwnProperty('desktopDrawerOpen')) {
        state.mainMenu.desktopDrawerOpen = payload.desktopDrawerOpen;
      }

      if (payload.hasOwnProperty('isAnimating')) {
        state.mainMenu.isAnimating = payload.isAnimating;
      }

      if (payload.hasOwnProperty('breadcrumbs')) {
        const index = breadcrumbs.indexOf(payload.breadcrumbs);

        if (index < 0) {
          breadcrumbs.unshift(payload.breadcrumbs);
        }
      }

      if (payload.hasOwnProperty('heights')) {
        if (Array.isArray(payload.heights)) {
          state.mainMenu.heights = payload.heights;
        }

        if (typeof payload.heights === 'number') {
          const index = heights.indexOf(payload.heights);

          if (index < 0) {
            heights.push(payload.heights);
          }
        }
      }

      if (payload.hasOwnProperty('expanded')) {
        if (Array.isArray(payload.expanded)) {
          state.mainMenu.expanded = payload.expanded;
        }

        if (typeof payload.expanded === 'string') {
          const index = expanded.indexOf(payload.expanded);

          if (index < 0) {
            expanded.push(payload.expanded);
          } else {
            expanded.splice(index, 1);
          }
        }
      }
    },
    updateGlobalSearch: (state, { payload }) => {
      const { globalSearch } = state;

      return {
        ...state,
        globalSearch: {
          ...globalSearch,
          ...payload,
        },
      };
    },
    updateInpageNavigation: (state, { payload }) => {
      return {
        ...state,
        inpageNavigation: {
          ...payload,
        },
      };
    },
  },
});

export const selectUiByKey = (key) =>
  createSelector(
    (state) => state.ui,
    (ui) => ui[key]
  );

export const { updateCountrySelector, updateMainMenu, updateGlobalSearch, updateInpageNavigation } =
  uiSlice.actions;

export default uiSlice.reducer;
