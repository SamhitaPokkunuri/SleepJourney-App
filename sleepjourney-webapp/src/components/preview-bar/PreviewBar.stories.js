import React from 'react';
import { addContainer } from 'stories/utils/decorators';
import PreviewBar from './PreviewBar';

const previewBar = {
  title: 'Components/Layout/PreviewBar',
  component: PreviewBar,
  decorators: [addContainer('lg')],
  parameters: {
    layout: 'centered',
  },
};

export const Default = (args) => {
  return <PreviewBar {...args} />;
};

export default previewBar;
