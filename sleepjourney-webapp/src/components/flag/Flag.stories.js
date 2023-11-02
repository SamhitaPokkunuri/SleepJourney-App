import React from 'react';
import Flag from './Flag';

const flag = {
  title: 'Components/Data Display/Flag',
  component: Flag,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    code: {
      control: { type: 'text' },
    },
  },
};

export const Default = (args) => {
  return <Flag {...args} />;
};

export default flag;
