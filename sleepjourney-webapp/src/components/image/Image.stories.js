import React from 'react';
import { addContainer } from 'stories/utils/decorators';
import Image from './Image';

const image = {
  title: 'Components/Layout/Image',
  component: Image,
  decorators: [addContainer()],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    width: {
      control: { type: null },
    },
    height: {
      control: { type: null },
    },

    href: {
      control: { type: null },
    },
  },
};

export const Default = (args) => {
  return <Image {...args} />;
};

Default.args = {
  caption: 'leshoto',
  url: 'https://content-staging.vodafone.com/sites/default/files/2021-08/vodacom-leshoto-foundation.jpg',
  mediaSize: 'large',
  className: 'is-style-rounded',
  href: 'https://www.vodafone.com/news/viewpoint/vodafone-plays-part-respecting-human-rights',
  marginBottom: false,
  marginTop: false,
  hasBorder: false,
  align: 'center',
};

export default image;
