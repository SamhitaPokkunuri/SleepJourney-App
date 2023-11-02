import React from 'react';
import EndTextIcon from './EndTextIcon';

const endTextIcon = {
  title: 'Components/Data Display/EndTextIcon',
  component: EndTextIcon,
  parameters: {
    layout: 'centered',
  },
};

export const Default = (args) => {
  return <EndTextIcon {...args} />;
};

Default.args = {
  children: 'EndTextIcon',
  icon: 'ChevronRightCircle',
  greyCircle: false,
};

export default endTextIcon;
