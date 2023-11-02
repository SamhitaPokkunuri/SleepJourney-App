import React from 'react';
import { addContainer } from 'stories/utils/decorators';
import Paragraph from './Paragraph';

const paragraph = {
  title: 'Components/Data Display/Paragraph',
  component: Paragraph,
  decorators: [addContainer()],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    children: {
      control: { type: null },
    },
  },
};

export const Default = (args) => {
  return (
    <Paragraph {...args}>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate,
      doloribus aliquam excepturi impedit rem id eius minima pariatur natus iure
      quasi similique dolore a iusto alias dicta eos error omnis odit
      repellendus blanditiis possimus.
    </Paragraph>
  );
};

Default.args = {
  align: 'inherit',
  color: 'inherit',
};

export default paragraph;
