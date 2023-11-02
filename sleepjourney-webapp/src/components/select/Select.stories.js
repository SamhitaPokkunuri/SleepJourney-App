import React from 'react';
import { addContainer } from '../../stories/utils/decorators';
import Select from './Select';

const select = {
  title: 'Components/Inputs/Select',
  component: Select,
  decorators: [addContainer('sm')],
  argTypes: {
    options: {
      control: { type: null },
    },
    value: {
      control: { type: null },
    },
  },
};

export const Default = (args) => {
  const [value, setValue] = React.useState(args.value ?? args.options[0].name);

  return (
    <Select
      {...args}
      value={value}
      onSelect={(item, callback) => () => {
        setValue(item.name);
        if (callback) {
          callback();
        }
      }}
    />
  );
};

Default.args = {
  boxShadow: 'off',
  options: [
    {
      name: 'Option 1',
      value: 'option1',
    },
    {
      name: 'Option 2',
      value: 'option2',
    },
    {
      name: 'Option 3',
      value: 'option3',
    },
    {
      name: 'Option 4',
      value: 'option4',
    },
  ],
  overlayDropdown: false,
};

export default select;
