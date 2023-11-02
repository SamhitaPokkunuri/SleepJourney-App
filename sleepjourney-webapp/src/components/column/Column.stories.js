import React from 'react';
import { addContainer } from 'stories/utils/decorators';
import Column from './Column';

const column = {
  title: 'Components/Layout/Column',
  component: Column,
  decorators: [addContainer('lg')],
  argTypes: {
    children: {
      control: { type: null },
    },
    width: {
      control: { type: 'range', min: 0, max: 100 },
    },
  },
};

export const Default = (args) => {
  return (
    <Column {...args}>
      <h2>Column Test</h2>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero optio
        deleniti veniam aspernatur est assumenda ullam accusantium totam
        necessitatibus! Natus porro aliquid quos quaerat unde, eius accusamus
        ullam assumenda iusto soluta voluptatem fugiat maxime expedita. Sed
        mollitia, vero aliquid et esse, illo, expedita doloremque suscipit
        deleniti assumenda sunt! Voluptatem error laudantium, sequi provident
        rem repudiandae sit voluptas dicta cumque quae itaque sed consectetur
        officia ab ex tenetur, illum officiis iste, ratione omnis eveniet.
      </p>
    </Column>
  );
};

Default.args = {
  verticalAlignment: 'center',
};

export default column;
