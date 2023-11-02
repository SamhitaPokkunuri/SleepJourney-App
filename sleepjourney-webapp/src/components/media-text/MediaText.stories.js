import React from 'react';
import { addContainer } from 'stories/utils/decorators';
import MediaText from './MediaText';
import { Heading, Paragraph, ChevronButton } from 'components';

const mediaText = {
  title: 'Components/Layout/MediaText',
  component: MediaText,
  decorators: [addContainer()],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    badge: {
      control: { type: null },
    },
    caption: {
      control: { type: null },
    },
    children: {
      control: { type: null },
    },
    image: {
      control: { type: null },
    },
    imageMask: {
      control: { type: null },
    },
    mediaPosition: {
      control: { type: null },
    },
    padding: {
      control: { type: null },
    },
  },
};

export const Default = (args) => {
  return <MediaText {...args} />;
};

const MediaTextChildren = () => {
  return (
    <>
      <Heading>Test title</Heading>
      <Paragraph>Test description</Paragraph>
      <ChevronButton>Test Button</ChevronButton>
    </>
  );
};

Default.args = {
  align: 'center',
  children: <MediaTextChildren />,
  columns: 'half',
  image: {
    alt: 'The connected consumer 2030',
    id: 1,
    size: 'medium',
    url: 'https://content.vodafone.com/sites/default/files/2022-01/the-connected-consumer-2030.png',
    width: 350,
    height: 350,
  },
};

export default mediaText;
