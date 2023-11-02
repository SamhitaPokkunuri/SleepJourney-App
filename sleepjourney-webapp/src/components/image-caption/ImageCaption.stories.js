import React from 'react';
import { addContainer } from 'stories/utils/decorators';
import ImageCaption from './ImageCaption';

const imageCaption = {
  title: 'Components/Data Display/ImageCaption',
  component: ImageCaption,
  decorators: [addContainer()],
  parameters: {
    layout: 'centered',
  },
};

export const Default = (args) => {
  return <ImageCaption {...args} />;
};

Default.args = {
  children: 'leshoto',
  size: 'default',
  color: 'black',
};

export default imageCaption;
