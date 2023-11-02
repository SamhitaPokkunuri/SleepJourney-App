import React from 'react';
import { addContainer } from 'stories/utils/decorators';
import LargeNumber from './LargeNumber';

const largeNumber = {
  title: 'Components/Data Display/LargeNumber',
  component: LargeNumber,
  decorators: [addContainer('lg')],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    numberSize: { control: { type: null } },
    customColors: {
      control: { type: null },
    },
  },
};

export const Default = (args) => {
  return <LargeNumber {...args} />;
};

Default.args = {
  value: '123...',
};
export default largeNumber;
