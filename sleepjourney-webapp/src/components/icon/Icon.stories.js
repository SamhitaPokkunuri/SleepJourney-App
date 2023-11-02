import React from 'react';
import Icon from './Icon';

const icon = {
  title: 'Components/Data Display/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
  },
};

export const Default = (args) => {
  return <Icon {...args} />;
};

Default.args = {
  icon: 'Airplane',
  iconSet: 'group',
  outlined: false,
  fontSize: 'inherit',
};

export default icon;
