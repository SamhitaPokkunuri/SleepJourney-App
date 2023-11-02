import PropTypes from 'prop-types';
import { styled, css } from '@mui/material/styles';
import MuiBox from '@mui/material/Box';
import MuiIconButton from '@mui/material/IconButton';

import { TextField, FontIcon } from 'components';

const StyledSearch = styled(MuiBox, {
  shouldForwardProp: (prop) => /(square)/.test(prop) === false,
})(
  ({ theme, square }) => css`
    flex-grow: 1;
    display: flex;

    .iconButton {
      padding: 0 12px;
      border-radius: ${square ? '0' : '0 6px 6px 0'};
      background-color: ${theme.palette.common.red};
      color: ${theme.palette.common.white};

      &:hover {
        background-color: ${theme.palette.common.red};
        color: ${theme.palette.common.white};
      }

      &:active {
        background-color: ${theme.palette.common.darkRed};
        color: ${theme.palette.common.white};
      }

      &.Mui-disabled {
        background-color: ${theme.palette.common.silver};
        color: ${theme.palette.common.white};
      }
    }
  `
);

function Search(props) {
  const { value, placeholder, square, handleOnClick, ...rest } = props;

  const collapseBorders = square ? ['tr', 'br', 'bl', 'tl'] : ['tr', 'br'];

  return (
    <StyledSearch square={square}>
      <TextField
        collapseBorders={collapseBorders}
        placeholder={placeholder}
        value={value}
        {...rest}
      />
      <MuiIconButton
        color="secondary"
        className="iconButton"
        aria-label="search"
        type="submit"
        disabled={value.length === 0}
        onClick={() => {
          handleOnClick(value);
        }}
        size="large"
      >
        <FontIcon icon="search" color="inherit" fontSize="inherit" />
      </MuiIconButton>
    </StyledSearch>
  );
}

Search.propTypes = {
  /**
   * Callback fired when the value is submitted.
   */
  handleOnClick: PropTypes.func,
  /**
   * The short hint displayed in the input before the user enters a value.
   */
  placeholder: PropTypes.string,
  /**
   * Collapses the borders of the component.
   */
  square: PropTypes.bool,
  /**
   * The value of the input element, required for a controlled component.
   */
  value: PropTypes.string.isRequired,
};

Search.defaultProps = {
  square: false,
};

export default Search;
