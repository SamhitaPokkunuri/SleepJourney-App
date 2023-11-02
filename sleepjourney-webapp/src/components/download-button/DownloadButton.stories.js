import React from 'react';
import { addContainer } from 'stories/utils/decorators';
import DownloadButton from './DownloadButton';

const downloadButton = {
  title: 'Components/Inputs/DownloadButton',
  component: DownloadButton,
  decorators: [addContainer('sm')],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    children: {
      control: { type: 'text' },
    },
  },
};

export const Default = (args) => {
  return <DownloadButton {...args} />;
};

Default.args = {
  children: 'Download Button',
  icon: 'Download',
  fullWidth: true,
};

export default downloadButton;
