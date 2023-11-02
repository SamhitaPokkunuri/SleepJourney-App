import React from 'react';
import { addContainer } from 'stories/utils/decorators';
import NavigationControls from './NavigationControls';

const navigationControls = {
  title: 'Components/Navigation/NavigationControls',
  component: NavigationControls,
  decorators: [addContainer('sm')],
  parameters: {
    layout: 'centered',
  },
};

export const Default = (args) => {
  return <NavigationControls {...args} />;
};

export default navigationControls;
