import React from 'react';
import CloseBox from './CloseBox';

const closeBox = {
  title: 'Components/Inputs/CloseBox',
  component: CloseBox,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    children: {
      control: { type: 'text' },
    },
  },
};

export const Default = (args) => {
  return <CloseBox {...args} />;
};

Default.args = {
  children: 'Close box',
};

export default closeBox;
