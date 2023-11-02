import React from 'react';
import { addContainer } from 'stories/utils/decorators';
import ScrollingIndicator from './ScrollingIndicator';

const scrollingIndicator = {
  title: 'Components/Inputs/ScrollingIndicator',
  component: ScrollingIndicator,
  decorators: [addContainer('lg')],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    backgroundColor: {
      table: {
        disable: true,
      },
    },
    position: {
      table: {
        disable: true,
      },
    },
    top: {
      table: {
        disable: true,
      },
    },
  },
};

export const Default = (args) => {
  return (
    <div style={{ height: '10000px' }}>
      <ScrollingIndicator {...args} />
    </div>
  );
};

Default.args = {
  backgroundColor: '#f1f1f1',
  position: 'sticky',
  top: '60px',
};

export default scrollingIndicator;
