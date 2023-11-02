import React from 'react';

import Footer from './Footer';

const footer = {
  title: 'Components/Layout/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
  },
};

export const Default = (args) => <Footer {...args} />;

export default footer;
