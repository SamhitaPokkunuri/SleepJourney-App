import React from 'react';
import IconButton from './IconButton';

const iconButton = {
  title: 'Components/Inputs/IconButton',
  component: IconButton,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    children: {
      control: { type: 'text' },
    },
    customColors: {
      control: { type: null },
    },
    href: {
      control: { type: null },
    },
  },
};

export const Default = (args) => <IconButton {...args} size="large" />;

Default.args = {
  children: 'Icon Button',
  icon: 'SwipeAcross',
  iconSet: 'global',
  chevron: true,
  outline: false,
};

export default iconButton;
