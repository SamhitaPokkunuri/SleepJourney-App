import React from 'react';
import { addContainer } from 'stories/utils/decorators';
import ReactSelect from './ReactSelect';

const reactSelect = {
  title: 'Components/Inputs/ReactSelect',
  component: ReactSelect,
  decorators: [addContainer('sm')],
  argTypes: {
    options: {
      control: { type: null },
    },
  },
};

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

export const Default = (args) => {
  const [value, setValue] = React.useState();

  return (
    <ReactSelect
      {...args}
      value={value}
      onChange={(value) => {
        setValue(value);
      }}
    />
  );
};

Default.args = {
  options,
};

export default reactSelect;
