import React from 'react';
import FeaturedText from './FeaturedText';

const featuredText = {
  title: 'Components/Layout/FeaturedText',
  component: FeaturedText,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    title: {
      control: { type: 'text' },
    },
  },
};

export const Default = (args) => {
  return <FeaturedText {...args} />;
};

Default.args = {
  title: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit',
};

export default featuredText;
