import React from 'react';
import { addContainer } from 'stories/utils/decorators';
import NavigationLink from './NavigationLink';

const navigationLink = {
  title: 'Components/Navigation/NavigationLink',
  component: NavigationLink,
  decorators: [addContainer('sm')],
  parameters: {
    layout: 'centered',
  },
};

export const Default = (args) => {
  return <NavigationLink {...args} />;
};
Default.args = {
  label: 'Navigation Link',
  path: {
    url: { path: 'https://www.vodafone.com/' },
    options: { attributes: { target: '_blank' } },
  },
};

export default navigationLink;
