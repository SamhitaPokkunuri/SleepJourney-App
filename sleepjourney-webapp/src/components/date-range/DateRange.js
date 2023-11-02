import PropTypes from 'prop-types';
import { styled, css } from '@mui/material/styles';
import MuiBox from '@mui/material/Box';
import MuiFormGroup from '@mui/material/FormGroup';

import { Select } from 'components';

const StyledDateRange = styled(MuiFormGroup)(
  ({ theme }) => css`
    flex: 1;

    .label {
      font-size: 1.125rem;
      margin-bottom: ${theme.spacing(1)};
    }

    .dateRangeContainer {
      display: flex;
      margin-bottom: ${theme.spacing(2)};
    }
  `
);

const monthOptions = [
  { id: 0, name: 'Month', value: '' },
  { id: 1, name: 'January', value: 'january' },
  { id: 2, name: 'February', value: 'february' },
  { id: 3, name: 'March', value: 'march' },
  { id: 4, name: 'April', value: 'april' },
  { id: 5, name: 'May', value: 'may' },
  { id: 6, name: 'June', value: 'june' },
  { id: 7, name: 'July', value: 'july' },
  { id: 8, name: 'August', value: 'august' },
  { id: 9, name: 'September', value: 'september' },
  { id: 10, name: 'October', value: 'october' },
  { id: 11, name: 'November', value: 'november' },
  { id: 12, name: 'December', value: 'december' },
];

function DateRange(props) {
  const { label, yearFrom, month, year, onSelect } = props;

  const yearOptions = [{ id: 0, name: 'Year', value: '' }];
  const currentYear = new Date().getFullYear();
  let count = Number(yearFrom);

  if (typeof count === 'number') {
    while (count <= currentYear) {
      yearOptions.push({
        id: count,
        name: count.toString(),
        value: count.toString(),
      });
      count += 1;
    }
  }

  return (
    <StyledDateRange>
      <label className="label">{label}</label>
      <MuiBox className="dateRangeContainer">
        <MuiBox flexBasis="60%">
          <Select
            value={month.name || monthOptions[0].name}
            options={monthOptions}
            boxShadow="on"
            onSelect={onSelect('month')}
          />
        </MuiBox>
        <MuiBox pl={{ xs: 1, sm: 2 }} flexBasis="40%" flexShrink={0}>
          <Select
            value={year.name || yearOptions[0].name}
            options={yearOptions}
            boxShadow="on"
            onSelect={onSelect('year')}
          />
        </MuiBox>
      </MuiBox>
    </StyledDateRange>
  );
}

DateRange.propTypes = {
  /**
   * The label to display above the component.
   */
  label: PropTypes.string,
  /**
   * Data used to display the chosen month.
   */
  month: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    value: PropTypes.string,
  }).isRequired,
  /**
   * Callback function fired when an option is selected.
   */
  onSelect: PropTypes.func.isRequired,
  /**
   * Data used to display the chosen year.
   */
  year: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    value: PropTypes.string,
  }).isRequired,
  /**
   * Defines the date parameters for the year range.
   */
  yearFrom: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

DateRange.defaultProps = {
  yearFrom: 1985,
};

export default DateRange;
