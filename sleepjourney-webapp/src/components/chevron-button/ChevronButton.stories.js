import React from 'react';
import ChevronButton from './ChevronButton';

const chevronButton = {
  title: 'Components/Inputs/ChevronButton',
  component: ChevronButton,
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

const ChevronButtonTemplate = (args) => <ChevronButton {...args} />;

export const Primary = ChevronButtonTemplate.bind({});

Primary.args = {
  border: false,
  chevron: true,
  children: 'Chevron Button',
  customColors: {
    background: 'rgb(230, 0, 0)',
    text: '#FFFFFF',
  },
  disabled: false,
  icon: 'ChevronRightCircle',
  pulseAnimate: false,
  rounded: false,
  size: 'default',
};

export const Secondary = ChevronButtonTemplate.bind({});

Secondary.args = {
  ...Primary.args,
  customColors: {
    background: '#FFFFFF',
    text: 'rgb(51, 51, 51)',
  },
};

export const Tertiary = ChevronButtonTemplate.bind({});

Tertiary.args = {
  ...Primary.args,
  customColors: {
    background: 'rgb(51, 51, 51)',
    text: '#FFFFFF',
  },
};

export default chevronButton;
