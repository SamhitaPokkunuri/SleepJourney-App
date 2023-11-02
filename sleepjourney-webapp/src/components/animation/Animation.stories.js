import React from 'react';
import { addContainer } from 'stories/utils/decorators';
import animationData from 'stories/data/animationData.json';
import Animation from './Animation';

const animation = {
  title: 'Components/Data Display/Animation',
  component: Animation,
  decorators: [addContainer('sm')],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    data: {
      control: { type: null },
    },
    renderer: {
      control: { type: null },
    },
  },
};

export const Default = (args) => {
  return <Animation {...args} />;
};

Default.args = {
  autoPlay: true,
  data: animationData,
  infiniteLoop: true,
};

export default animation;
