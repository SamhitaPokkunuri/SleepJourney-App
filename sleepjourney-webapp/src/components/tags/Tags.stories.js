import React from 'react';
import Tags from './Tags';

const tags = {
  title: 'Components/Data Display/Tags',
  component: Tags,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    data: {
      control: { type: null },
    },
  },
};

export const Default = (args) => {
  return <Tags {...args} />;
};

Default.args = {
  data: ['Tag 1', 'Tag 2'],
};

export default tags;
