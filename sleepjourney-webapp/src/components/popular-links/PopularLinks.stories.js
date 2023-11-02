import React from 'react';
import { addContainer } from 'stories/utils/decorators';
import PopularLinks from './PopularLinks';

const popularLinks = {
  title: 'Components/Navigation/PopularLinks',
  component: PopularLinks,
  decorators: [addContainer('lg')],
  parameters: {
    layout: 'centered',
  },
};

export const Default = (args) => {
  return <PopularLinks {...args} />;
};

export default popularLinks;
