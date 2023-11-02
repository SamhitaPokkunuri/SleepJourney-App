import React from 'react';
import { addContainer } from 'stories/utils/decorators';
import DateRange from './DateRange';

const dateRange = {
  title: 'Components/Inputs/DateRange',
  component: DateRange,
  decorators: [addContainer()],
  argTypes: {
    month: {
      control: { type: null },
    },
    year: {
      control: { type: null },
    },
  },
};

export const Default = (args) => {
  const { month: initialMonth = {}, year: initialYear = {} } = args;

  const [month, setMonth] = React.useState(initialMonth);
  const [year, setYear] = React.useState(initialYear);

  return (
    <DateRange
      {...args}
      month={month}
      year={year}
      onSelect={(monthYear) => (selection, callback) => () => {
        if (monthYear === 'month') {
          setMonth(selection);
        } else {
          setYear(selection);
        }

        if (callback) {
          callback();
        }
      }}
    />
  );
};

Default.args = {
  label: 'Date Range Selector',
  yearFrom: 2020,
};

export default dateRange;
