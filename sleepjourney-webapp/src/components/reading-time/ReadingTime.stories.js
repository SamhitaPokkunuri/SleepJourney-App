import React from 'react';
import { addContainer } from 'stories/utils/decorators';
import ReadingTime from './ReadingTime';

const readingTime = {
  title: 'Components/Data Display/ReadingTime',
  component: ReadingTime,
  decorators: [addContainer('sm')],
  parameters: {
    layout: 'centered',
  },
};

export const Default = (args) => {
  return <ReadingTime {...args} />;
};

Default.args = {
  text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
};

export default readingTime;
