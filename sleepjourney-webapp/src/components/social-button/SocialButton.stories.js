import React from 'react';
import { addContainer } from 'stories/utils/decorators';
import SocialButton from './SocialButton';

const socialButton = {
  title: 'Components/Navigation/SocialButton',
  component: SocialButton,
  decorators: [addContainer('md')],
  parameters: {
    layout: 'centered',
  },
};

export const Default = (args) => {
  return <SocialButton {...args} />;
};

Default.args = {
  children: 'Find me on Twitter',
  href: 'https://www.twitter.com',
  icon: 'twitter',
  target: '_blank',
};

export default socialButton;
