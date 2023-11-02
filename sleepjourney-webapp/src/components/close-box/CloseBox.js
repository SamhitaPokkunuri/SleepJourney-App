import PropTypes from 'prop-types';
import { styled, css } from '@mui/material/styles';
import MuiBox from '@mui/material/Box';
import MuiButton from '@mui/material/Button';

const StyledCloseBox = styled(MuiBox)(
  ({ theme }) => css`
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    text-align: right;
    padding: 16px;
    background-color: rgba(74, 77, 78, 0.8);
    z-index: 2;

    ${theme.breakpoints.up('sm')} {
      padding: ${theme.spacing(6, 6, 2)};
    }

    ${theme.breakpoints.up('md')} {
      padding: ${theme.spacing(10, 14, 2)};
    }

    .close {
      outline: none;
      padding: 0;
      color: ${theme.palette.common.white};

      &::after {
        font-family: VodafoneIcons;
        font-size: 1.5em;
        display: inline-block;
        margin-left: 16px;
        content: ${theme.icons.close};

        ${theme.breakpoints.up('md')} {
          font-size: 2em;
          margin-left: 40px;
        }
      }
    }
  `
);

export default function CloseBox(props) {
  const { children, ...rest } = props;

  return (
    <StyledCloseBox>
      <MuiButton className="close" color="inherit" {...rest}>
        <span>{children}</span>
      </MuiButton>
    </StyledCloseBox>
  );
}

CloseBox.defaultProps = {
  children: 'Close',
};

CloseBox.propTypes = {
  /**
   * The content of the button.
   */
  children: PropTypes.node,
};
