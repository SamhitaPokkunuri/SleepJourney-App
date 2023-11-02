import React from 'react';

import Header from './Header';

const header = {
  title: 'Components/Layout/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
};

export const Default = (args) => <Header {...args} />;

export default header;
