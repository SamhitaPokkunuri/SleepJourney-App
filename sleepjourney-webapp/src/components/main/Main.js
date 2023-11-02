import { useSelector } from 'react-redux';
import clsx from 'clsx';
import { styled, css } from '@mui/material/styles';
import MuiBox from '@mui/material/Box';

import { selectUiByKey } from 'lib/slices/uiSlice';

const StyledMain = styled(MuiBox, {
  shouldForwardProp: (prop) => /(isSticky)/.test(prop) === false,
})(
  ({ theme, isSticky }) => css`
    &.main {
      padding-top: 48px;

      ${theme.breakpoints.up('sm')} {
        padding-top: 60px;
      }

      ${theme.breakpoints.up('md')} {
        padding-top: 72px;
      }
    }

    &.inpageNavigation {
      padding-top: 96px;

      ${theme.breakpoints.up('sm')} {
        padding-top: 120px;
      }

      ${theme.breakpoints.up('md')} {
        padding-top: 132px;
      }
    }

    &.previewMode {
      padding-top: ${isSticky ? '146px' : '98px'};

      ${theme.breakpoints.up('sm')} {
        padding-top: ${isSticky ? '170px' : '110px'};
      }

      ${theme.breakpoints.up('md')} {
        padding-top: ${isSticky ? '182px' : '122px'};
      }
    }
  `
);

export default function Main(props) {
  const { children, preview } = props;
  const { isVisible } = useSelector(selectUiByKey('countrySelector'));
  const { isSticky } = useSelector(selectUiByKey('inpageNavigation'));

  return (
    <StyledMain
      component="main"
      className={clsx({
        main: !isVisible,
        inpageNavigation: isSticky,
        previewMode: preview,
      })}
      isSticky={isSticky}
    >
      {children}
    </StyledMain>
  );
}
