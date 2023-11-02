import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme, styled, css } from '@mui/material/styles';
import MuiBackdrop from '@mui/material/Backdrop';
import MuiBox from '@mui/material/Box';

import { Portal, NavigationControls, NavigationList } from 'components';
import { selectUiByKey, updateMainMenu } from 'lib/slices/uiSlice';

const StyledNavigation = styled(MuiBox, {
  shouldForwardProp: (prop) => /(preview)/.test(prop) === false,
})(
  ({ theme, preview }) => css`
    display: flex;

    ${theme.breakpoints.down('md')} {
      background: ${theme.palette.common.white};
      padding-bottom: 50px;
      width: 100%;
      max-width: 400px;
      transform: translateX(100%);
      position: fixed;
      right: 0;
      bottom: 0;
      transition: transform 250ms ease;
    }

    ${theme.breakpoints.up('sm')} {
      flex: 1;
    }

    &.expanded {
      transform: translateX(0);
    }

    &.position {
      top: 48px;

      ${theme.breakpoints.up('sm')} {
        top: ${preview ? '110px' : '60px'};
      }

      ${theme.breakpoints.up('md')} {
        top: ${preview ? '122px' : '72px'};
      }
    }
  `
);

const StyledMuiBackdrop = styled(MuiBackdrop, {
  shouldForwardProp: (prop) => /(preview)/.test(prop) === false,
})(
  ({ theme, preview }) => css`
    z-index: 19;

    &.position {
      top: 48px;

      ${theme.breakpoints.up('sm')} {
        top: ${preview ? '110px' : '60px'};
      }

      ${theme.breakpoints.up('md')} {
        top: ${preview ? '122px' : '72px'};
      }
    }
  `
);

export default function Navigation(props) {
  const { preview } = props;
  const { breakpoints } = useTheme();
  const isMobile = useMediaQuery(breakpoints.down('md'));
  const dispatch = useDispatch();
  const { mobileDrawerOpen, desktopDrawerOpen, expanded, links } = useSelector(
    selectUiByKey('mainMenu')
  );

  function handleClose() {
    dispatch(
      updateMainMenu({
        isAnimating: !isMobile,
        mobileDrawerOpen: false,
        desktopDrawerOpen: false,
        expanded: [],
      })
    );

    if (!isMobile) {
      setTimeout(() => {
        dispatch(updateMainMenu({ isAnimating: false }));
      }, 1000);
    }
  }

  const open =
    (isMobile && mobileDrawerOpen) || (!isMobile && desktopDrawerOpen);

  return (
    <Fragment>
      <StyledNavigation
        className={clsx('position', {
          expanded: mobileDrawerOpen,
        })}
        preview={preview}
      >
        <NavigationList data={links} />
        {isMobile && (
          <NavigationControls
            handleClose={handleClose}
            open={open}
            expanded={expanded}
          />
        )}
      </StyledNavigation>
      <Portal>
        <StyledMuiBackdrop
          className="position"
          open={open}
          onClick={handleClose}
          transitionDuration={250}
          preview={preview}
        />
      </Portal>
    </Fragment>
  );
}
