import React from 'react';
import SocialIcon from './SocialIcon';

const socialIcon = {
  title: 'Components/Data Display/SocialIcon',
  component: SocialIcon,
  parameters: {
    layout: 'centered',
  },
};

export const Default = (args) => {
  return <SocialIcon {...args} />;
};

Default.args = {
  platform: 'twitter',
  elevated: true,
  href: 'https://twitter.com/VodafoneGroup',
  fontSize: 'default',
  style: 'default',
};

export default socialIcon;
