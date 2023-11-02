import PropTypes from 'prop-types';
import { styled, css } from '@mui/material/styles';
import MuiCheckbox from '@mui/material/Checkbox';
import MuiFormControlLabel from '@mui/material/FormControlLabel';
import MuiFormGroup from '@mui/material/FormGroup';

import { FontIcon } from 'components';

const StyledCheckbox = styled(MuiFormGroup)(
  ({ theme }) => css`
    .MuiCheckbox-root:hover {
      background-color: transparent;
    }

    .formControlLabel {
      flex-basis: 50%;
      padding-right: 20px;
      margin-right: 0;

      ${theme.breakpoints.up('sm')}
        flex-basis: 33.33%;
      },

      ${theme.breakpoints.up('md')} {
        flex-basis: 25%;
      }
    }

    .checkboxLabel {
      font-size: 1.125rem;
    }

    .checkboxIcon {
      border: 1px solid ${theme.palette.common.spanishGrey};
      width: 20px;
      height: 20px;
      border-radius: 3px;
      background-color: ${theme.palette.common.white};
      font-size: 0.75rem;
      display: flex;
      align-items: center;
      justify-content: center;

      &.checked {
        border-color: ${theme.palette.common.teal};
        background-color: ${theme.palette.common.teal};
        color: ${theme.palette.common.white};
      }
    }
`
);

function CheckboxIcon({ checked, ...rest }) {
  return (
    <span {...rest}>
      {checked && <FontIcon icon="tick" color="inherit" fontSize="inherit" />}
    </span>
  );
}

function Checkbox(props) {
  const { data, onChange, checked } = props;

  return (
    <StyledCheckbox row>
      {data.map((item) => (
        <MuiFormControlLabel
          key={item.tid}
          className="formControlLabel"
          control={
            <MuiCheckbox
              checked={Boolean(checked.find((x) => x.tid === item.tid))}
              onChange={onChange(item)}
              name={item.name}
              color="secondary"
              icon={<CheckboxIcon className="checkboxIcon" />}
              checkedIcon={
                <CheckboxIcon className={'checkboxIcon checked'} checked />
              }
            />
          }
          label={<span className="checkboxLabel">{item.name}</span>}
        />
      ))}
    </StyledCheckbox>
  );
}

Checkbox.propTypes = {
  /**
   * An array of checked elements.
   */
  checked: PropTypes.arrayOf(
    PropTypes.shape({
      tid: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.string,
    })
  ).isRequired,
  /**
   * The data for the `Checkbox` component.
   */
  data: PropTypes.arrayOf(
    PropTypes.shape({
      tid: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.string,
    })
  ).isRequired,
  /**
   * Callback fired when the state is changed.
   */
  onChange: PropTypes.func.isRequired,
};

export default Checkbox;
