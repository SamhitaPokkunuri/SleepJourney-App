import PropTypes from 'prop-types';
import clsx from 'clsx';
import { styled, css } from '@mui/material/styles';
import MuiButton from '@mui/material/Button';

const StyledToggleButton = styled(MuiButton)(
  ({ theme }) => css`
    &.toggle-button {
      min-height: 44px;
      padding: ${theme.spacing(0.5, 1, 0.5, 1.5)};
      font-size: 1.125rem;
      white-space: nowrap;

      ${theme.breakpoints.down('md')} {
        min-width: 0;
        flex-grow: 1;
      }
    }

    & > span {
      width: 100%;
      display: inherit;
      align-items: inherit;
      justify-content: inherit;
    }

    & > span::after {
      font-family: VodafoneIcons;
      content: ${theme.icons.chevronDownXL};
      font-size: 0.625em;
      margin-left: auto;
      padding-left: ${theme.spacing(1)};
      transition: transform 0.6s ease-in-out;
    }

    &:hover {
      background-color: ${theme.palette.common.shadeGrey};
    }

    &.active {
      background-color: ${theme.palette.common.white};

      &:hover {
        background-color: ${theme.palette.common.white};
      }

      & > span:after {
        transform: rotateX(180deg);
      }
    }

    &.collapseBorder {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
  `
);

function ToggleButton(props) {
  const { label, active, collapseBorder, ...rest } = props;

  return (
    <StyledToggleButton
      variant="outlined"
      color="inherit"
      className={clsx('toggle-button', {
        active: active,
        collapseBorder: active && collapseBorder,
      })}
      {...rest}
    >
      <span>{label}</span>
    </StyledToggleButton>
  );
}

ToggleButton.propTypes = {
  /**
   * @ignore
   */
  active: PropTypes.bool,
  /**
   * @ignore
   */
  collapseBorder: PropTypes.bool,
  /**
   * The label of the button.
   */
  label: PropTypes.string.isRequired,
};

export default ToggleButton;
