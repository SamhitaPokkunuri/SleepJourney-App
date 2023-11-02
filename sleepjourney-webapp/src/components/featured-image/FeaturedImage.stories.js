import React from 'react';
import FeaturedImage from './FeaturedImage';

const featuredImage = {
  title: 'Components/Data Display/FeaturedImage',
  component: FeaturedImage,
};

export const Default = (args) => {
  return <FeaturedImage {...args} />;
};

Default.args = {
  title: 'leshoto',
  src: 'https://content-staging.vodafone.com/sites/default/files/2021-08/vodacom-leshoto-foundation.jpg',
  level: 2,
};
export default featuredImage;
