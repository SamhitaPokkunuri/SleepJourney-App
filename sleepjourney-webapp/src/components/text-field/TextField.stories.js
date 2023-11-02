import React from 'react';
import { addContainer } from 'stories/utils/decorators';
import TextField from './TextField';

const textField = {
  title: 'Components/Inputs/TextField',
  component: TextField,
  decorators: [addContainer('sm')],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    collapseBorders: {
      options: ['tr', 'br', 'bl', 'tl'],
      control: { type: 'check' },
    },
    value: {
      control: { type: null },
    },
  },
};

export const Default = (args) => {
  const [value, setValue] = React.useState(args.value ?? '');

  return (
    <TextField
      {...args}
      value={value}
      onChange={(event) => setValue(event.target.value)}
      onClear={() => setValue('')}
      placeholder="Start typing here..."
    />
  );
};

export default textField;
