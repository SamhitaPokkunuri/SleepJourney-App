import PropTypes from 'prop-types';
import { styled, css } from '@mui/material/styles';
import MuiTextField from '@mui/material/TextField';

import { FontIcon } from 'components';

const StyledTextField = styled(MuiTextField, {
  shouldForwardProp: (prop) => /(collapseBorders)/.test(prop) === false,
})(
  ({ collapseBorders }) => css`
    flex-grow: 1;

    .collapseBorders {
      border-top-right-radius: ${collapseBorders.indexOf('tr') > -1
        ? 0
        : undefined};
      border-bottom-right-radius: ${collapseBorders.indexOf('br') > -1
        ? 0
        : undefined};
      border-bottom-left-radius: ${collapseBorders.indexOf('bl') > -1
        ? 0
        : undefined};
      border-top-left-radius: ${collapseBorders.indexOf('tl') > -1
        ? 0
        : undefined};
    }
  `
);

function TextField(props) {
  const { collapseBorders = [], onClear, value, ...rest } = props;

  return (
    <StyledTextField
      variant="outlined"
      value={value}
      InputProps={{
        classes: {
          root: 'collapseBorders',
        },
        endAdornment:
          onClear && value.length > 0 ? (
            <FontIcon
              id="closeIcon"
              icon="close"
              color="inherit"
              fontSize="small"
              onClick={onClear}
              pointer
            />
          ) : null,
      }}
      collapseBorders={collapseBorders}
      {...rest}
    />
  );
}

TextField.propTypes = {
  /**
   * Select corners of the input element to collapse.
   */
  collapseBorders: PropTypes.arrayOf(PropTypes.oneOf(['tr', 'br', 'bl', 'tl'])),
  /**
   * Callback fired to clear the input element.
   */
  onClear: PropTypes.func,
  /**
   * The value of the input element, required for a controlled component.
   */
  value: PropTypes.string.isRequired,
};

export default TextField;
