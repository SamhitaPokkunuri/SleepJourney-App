import React from 'react';
import Breadcrumbs from './Breadcrumbs';

const breadcrumbs = {
  title: 'Components/Navigation/Breadcrumbs',
  component: Breadcrumbs,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    breadcrumbs: {
      control: { type: null },
    },
  },
};

export const Default = (args) => {
  return <Breadcrumbs {...args} />;
};

Default.args = {
  breadcrumbs: [
    {
      title: 'home',
      url: { path: '/' },
    },
    {
      title: 'articles',
      url: { path: '/' },
    },
  ],
};

export default breadcrumbs;
