import React from 'react';
import Link from './Link';

const link = {
  title: 'Components/Navigation/Link',
  component: Link,
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
  },
};

export const Default = (args) => <Link {...args} />;

Default.args = {
  animate: true,
  backgroundLink: false,
  children: 'Lorem Ipsum',
  greyCircle: false,
  href: '/',
  icon: 'ChevronRightCircle',
  largeLink: true,
  showIcon: true,
};

export default link;
