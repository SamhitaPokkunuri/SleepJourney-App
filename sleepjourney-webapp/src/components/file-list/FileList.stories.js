import React from 'react';
import { addContainer } from 'stories/utils/decorators';
import FileList from './FileList';
import File from '../file/File';

const fileList = {
  title: 'Components/Inputs/FileList',
  component: FileList,
  subComponents: { File },

  decorators: [addContainer()],
  parameters: {
    layout: 'centered',
  },
};

export const Default = (args) => {
  return (
    <FileList {...args}>
      <File
        key="1"
        fileName="Guidance note"
        href="https://content-staging.vodafone.com/sites/default/files/inline-images/Guidance%20note%20-%20Lives%20Improved%20methodology%20Oct%202018.pdf"
        textLinkTarget="_blank"
      />
      <File
        key="2"
        fileName="Vodafone Renewables"
        href="https://content-staging.vodafone.com/sites/default/files/2021-08/vodafone-renewables-approach-aug-2021.pdf"
        textLinkTarget=""
      />
    </FileList>
  );
};

Default.args = {
  title: { toggle: true, text: 'Files List' },
};

export default fileList;
