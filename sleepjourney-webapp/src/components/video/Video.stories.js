import React from 'react';
import { addContainer } from 'stories/utils/decorators';
import Video from './Video';

const video = {
  title: 'Components/Inputs/Video',
  component: Video,
  decorators: [addContainer()],
  parameters: {
    layout: 'centered',
  },
};

export const Default = (args) => <Video {...args} />;

Default.args = {
  aspectRatio: '16:9',
  src: 'https://youtu.be/hNbstfDqC5I',
  layout: 'default',
};

export default video;
