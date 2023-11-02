import React from 'react';
import { addContainer } from 'stories/utils/decorators';
import Audio from './Audio';

const audio = {
  title: 'Components/Inputs/Audio',
  component: Audio,
  decorators: [addContainer()],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    src: {
      control: { type: null },
    },
  },
};

export const Default = (args) => {
  return <Audio {...args} />;
};

Default.args = {
  src: 'https://content-staging.vodafone.com/sites/default/files/2020-11/DVA_ep2_v2.mp3',
};

export default audio;
