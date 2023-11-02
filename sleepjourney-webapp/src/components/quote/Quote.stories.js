import React from 'react';
import { addContainer } from 'stories/utils/decorators';
import Quote from './Quote';

const quote = {
  title: 'Components/Data Display/Quote',
  component: Quote,
  decorators: [addContainer('lg')],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    citation: {
      control: { type: null },
    },
    value: {
      control: { type: null },
    },
  },
};

export const Default = (args) => {
  return <Quote {...args} />;
};

Default.args = {
  citation: '<strong>Sherif Bakir</strong> CEO Vodafone Roaming Services',
  value:
    "Vodafone's <strong>commitment to connecting people for a better future</strong> is exemplified by its leadership in roaming technologies and services, and ensuring the satisfaction of our customers wherever they are.",
  variant: 'default',
};

export default quote;
