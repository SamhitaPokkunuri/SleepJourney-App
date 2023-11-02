import { useSelector } from 'react-redux';
import clsx from 'clsx';
import { styled, css } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import MuiBox from '@mui/material/Box';
import MuiContainer from '@mui/material/Container';
import MuiToolbar from '@mui/material/Toolbar';

import {
  CountrySelector,
  Logo,
  Navigation,
  NavigationIcons,
  GlobalSearch,
} from 'components';
import { selectUiByKey } from 'lib/slices/uiSlice';

const StyledHeader = styled(MuiBox)(
  ({ theme }) => css`
    box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.2);
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 100;

    &.previewMode {
      top: 50px;
    }

    &.headerScroll {
      position: relative;
    }

    .appBar {
      padding: ${theme.spacing(0, 1.6)};

      ${theme.breakpoints.up(480)} {
        padding: ${theme.spacing(0, 2.4)};
      }

      ${theme.breakpoints.up('md')} {
        padding: ${theme.spacing(0, 3.2)};
      }

      ${theme.breakpoints.up('xl')} {
        padding: ${theme.spacing(0, 4.8)};
      }

      ${theme.breakpoints.up('xxl')} {
        padding: ${theme.spacing(0, 6)};
      }
    }

    .container {
      ${theme.breakpoints.up('md')} {
        max-width: ${theme.containers.values.xl}px;
      }
    }

    .toolbar {
      position: static;
      background-color: ${theme.palette.common.white};
      min-height: 0;
      height: 48px;
      align-items: stretch;

      ${theme.breakpoints.up('sm')} {
        height: 60px;
        min-height: 0;
      }

      ${theme.breakpoints.up('md')} {
        height: 72px;
        min-height: 0;
      }
    }
  `
);

function Header(props) {
  const { preview, nonav } = props;
  const { isVisible } = useSelector(selectUiByKey('countrySelector'));

  return (
    <StyledHeader
      component="header"
      className={clsx({
        headerScroll: isVisible,
        previewMode: preview,
      })}
    >
      <CountrySelector />
      <GlobalSearch />
      <MuiAppBar
        className="appBar"
        component="div"
        position="relative"
        elevation={0}
      >
        <MuiContainer className="container">
          <MuiToolbar className="toolbar">
            <Logo nonav={nonav} />
            {!nonav && <Navigation preview={preview} />}
            {!nonav && <NavigationIcons />}
          </MuiToolbar>
        </MuiContainer>
      </MuiAppBar>
    </StyledHeader>
  );
}

export default Header;
