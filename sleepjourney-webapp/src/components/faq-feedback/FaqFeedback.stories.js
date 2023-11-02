import React from 'react';
import FaqFeedback from './FaqFeedback';

const faqFeedback = {
  title: 'Components/Layout/FaqFeedback',
  component: FaqFeedback,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    children: {
      control: { type: null },
    },
    align: {
      options: ['top', 'center', 'bottom'],
      control: { type: 'select' },
    },
  },
};

export const Default = (args) => {
  return <FaqFeedback {...args} />;
};

Default.args = {
  align: 'center',
  label: 'Your opinion matters to us',
};
export default faqFeedback;
