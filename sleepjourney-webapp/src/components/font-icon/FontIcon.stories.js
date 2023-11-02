import React from 'react';

import FontIcon from './FontIcon';

const fontIcon = {
  title: 'Components/Data Display/FontIcon',
  component: FontIcon,
  parameters: {
    layout: 'centered',
  },
};

export const Default = (args) => <FontIcon {...args} />;

Default.args = {
  color: 'darkGrey',
  fontSize: 'default',
  icon: 'popOut',
  pointer: false,
};

export default fontIcon;
