import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import { styled, css } from '@mui/material/styles';
import MuiBox from '@mui/material/Box';
import MuiButton from '@mui/material/Button';

import { updateMainMenu } from 'lib/slices/uiSlice';

const StyledNavigationControls = styled(MuiBox)(
  ({ theme }) => css`
    position: absolute;
    z-index: 10;
    bottom: 0;
    left: 0;
    right: 0;
    border-top: 1px solid ${theme.palette.common.shadeGrey};
    height: 50px;
    display: flex;

    .button {
      font-weight: 900;
      text-transform: uppercase;
      font-size: 1rem;
      color: inherit;

      & > span {
        width: 100%;
        padding-top: 2px;
      }

      &:before,
      &:after {
        font-family: vodafoneIcons;
        color: ${theme.palette.common.red};
      }
    }

    & .backButton {
      &:before {
        content: ${theme.icons.chevronLeftLG};
        font-size: 1.375rem;
        margin-right: 2px;
      }
    }

    & .exitButton {
      margin-left: auto;

      &:after {
        content: ${theme.icons.close};
        font-size: 1.625rem;
        margin-left: 8px;
      }
    }
  `
);

export default function NavigationControls(props) {
  const { expanded, open, handleClose } = props;
  const dispatch = useDispatch();

  function handleGoBack() {
    if (expanded.length > 0) {
      dispatch(
        updateMainMenu({
          expanded: [...expanded].pop(),
        })
      );
    } else {
      handleClose();
    }
  }

  return (
    <StyledNavigationControls>
      <MuiButton
        className={clsx('button', 'backButton')}
        onClick={handleGoBack}
      >
        <span>Back</span>
      </MuiButton>
      <MuiButton
        className={clsx('button', 'exitButton')}
        aria-label={'Close menu'}
        aria-expanded={open}
        onClick={handleClose}
      >
        <span>Exit</span>
      </MuiButton>
    </StyledNavigationControls>
  );
}
