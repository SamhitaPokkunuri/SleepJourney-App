import React from 'react';
import { addContainer } from 'stories/utils/decorators';
import File from './File';

const file = {
  title: 'Components/Inputs/File',
  component: File,
  decorators: [addContainer()],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    src: {
      control: { type: null },
    },
  },
};

export const Default = (args) => {
  return <File {...args} />;
};

Default.args = {
  fileName:
    'Guidance note - Lives Improved methodology Oct 2018.pdf Add to Default shortcuts',
  href: 'https://content-staging.vodafone.com/sites/default/files/inline-images/Guidance%20note%20-%20Lives%20Improved%20methodology%20Oct%202018.pdf',
  textLinkTarget: '_blank',
};

export default file;
