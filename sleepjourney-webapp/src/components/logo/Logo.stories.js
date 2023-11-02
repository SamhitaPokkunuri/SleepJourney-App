import React from 'react';
import { addContainer } from 'stories/utils/decorators';
import Logo from './Logo';

const logo = {
  title: 'Components/Data Display/Logo',
  component: Logo,
  decorators: [addContainer('sm')],
  parameters: {
    layout: 'centered',
  },
};

export const Default = (args) => {
  return <Logo {...args} />;
};

Default.args = {
  nonav: false,
};

export default logo;
