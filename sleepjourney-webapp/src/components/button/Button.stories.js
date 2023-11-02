import React from 'react';
import Button from './Button';

const button = {
  title: 'Components/Inputs/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    children: {
      control: { type: 'text' },
    },
  },
};

const ButtonTemplate = (args) => <Button {...args} />;
export const Default = ButtonTemplate.bind({});

Default.args = {
  openAsOverlay: false,
  linkTarget: 'current-tab',
  children: 'Button',
  text: 'Button',
  url: 'http://vodafone.com/',
};

export default button;
