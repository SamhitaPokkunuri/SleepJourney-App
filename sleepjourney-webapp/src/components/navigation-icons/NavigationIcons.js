import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme, styled, css } from '@mui/material/styles';
import MuiBox from '@mui/material/Box';
import MuiButton from '@mui/material/Button';

import {
  selectUiByKey,
  updateCountrySelector,
  updateMainMenu,
  updateGlobalSearch,
} from 'lib/slices/uiSlice';

const StyledNavigationIcons = styled(MuiBox)(
  ({ theme }) => css`
    display: flex;
    align-items: center;

    ${theme.breakpoints.down('md')} {
      margin-left: auto;
    }

    ${theme.breakpoints.up('lg')} {
      padding-left: 20px;
    }

    & .iconButton {
      height: 2rem;
      width: 2rem;
      padding: 0;
      min-width: 0;
      margin: 0 6px;
      display: flex;
      border-radius: 0;
      transition: none;
      color: inherit;

      &:hover {
        background-color: transparent;
      }

      &:before {
        line-height: 1;
        font-family: VodafoneIcons;
        font-style: normal;
        font-weight: 400;
        font-size: 1.75rem;
      }

      & > span {
        display: none;
      }

      ${theme.breakpoints.up('sm')} {
        margin: 0 8px;
      }
    }

    & .countriesButton {
      &:before {
        content: ${theme.icons.globe};
      }

      &.active:before,
      &:hover:before {
        color: ${theme.palette.common.red};
      }
    }

    & .searchButton {
      &:before {
        content: ${theme.icons.search};
      }

      &.active:before,
      &:hover:before {
        color: ${theme.palette.common.red};
      }
    }

    & .menuButton {
      margin-left: 8px;
      margin-right: 0;

      &:before {
        content: ${theme.icons.hamburger};
        font-size: 1rem;
      }
    }
  `
);

export default function NavigationIcons() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const mainMenu = useSelector(selectUiByKey('mainMenu'));
  const globalSearch = useSelector(selectUiByKey('globalSearch'));
  const countrySelector = useSelector(selectUiByKey('countrySelector'));

  function updateCountry(callback) {
    if (countrySelector.isExpanded) {
      dispatch(updateCountrySelector({ isExpanded: false }));

      setTimeout(() => {
        dispatch(updateCountrySelector({ isVisible: false }));

        if (typeof callback === 'function') {
          setTimeout(callback, 0);
        }
      }, 500);
    } else {
      window.scrollTo(0, 0);
      dispatch(updateCountrySelector({ isExpanded: true, isVisible: true }));
    }
  }

  function updateMenu(callback) {
    dispatch(
      updateMainMenu({
        mobileDrawerOpen: !mainMenu.mobileDrawerOpen,
      })
    );

    setTimeout(() => {
      if (typeof callback === 'function') {
        setTimeout(callback, 0);
      }
    }, 500);
  }

  function handleMobileMenu() {
    if (!mainMenu.isAnimating) {
      if (countrySelector.isExpanded) {
        updateCountry(updateMenu);
      } else {
        updateMenu();
      }
    }
  }

  function handleCountrySelector() {
    if (!mainMenu.isAnimating) {
      if (mainMenu.mobileDrawerOpen) {
        updateMenu(updateCountry);
      } else {
        updateCountry();
      }
    }
  }

  function handleSearchPanel() {
    dispatch(updateGlobalSearch({ isExpanded: !globalSearch.isExpanded }));
  }

  return (
    <StyledNavigationIcons component="nav">
      <MuiButton
        className={clsx('iconButton', 'countriesButton', {
          active: countrySelector.isExpanded,
        })}
        onClick={handleCountrySelector}
        color="inherit"
      >
        <span>Countries</span>
      </MuiButton>
      <MuiButton
        className={clsx('iconButton', 'searchButton')}
        aria-label="Search website"
        aria-describedby="global-search"
        aria-haspopup={true}
        onClick={handleSearchPanel}
      >
        <span>Search</span>
      </MuiButton>
      {isMobile && (
        <MuiButton
          className={clsx('iconButton', 'menuButton')}
          aria-label={mainMenu.mobileDrawerOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mainMenu.mobileDrawerOpen}
          onClick={handleMobileMenu}
        >
          <span>Mobile menu</span>
        </MuiButton>
      )}
    </StyledNavigationIcons>
  );
}
