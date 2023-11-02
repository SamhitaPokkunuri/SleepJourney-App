import React from 'react';
import { addContainer } from 'stories/utils/decorators';
import Columns from './Columns';
import Column from '../column/Column';

const columns = {
  title: 'Components/Layout/Columns',
  component: Columns,
  subcomponents: { Column },
  decorators: [addContainer('lg')],
  argTypes: {
    children: {
      control: { type: null },
    },
    spacing: {
      options: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      control: { type: 'select' },
    },
  },
};

export const Default = (args) => {
  return (
    <Columns {...args}>
      <Column key={1}>
        <h2>First column</h2>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero optio
          deleniti veniam aspernatur est assumenda ullam accusantium totam
          necessitatibus! Natus porro aliquid quos quaerat unde, eius accusamus
          ullam assumenda iusto soluta voluptatem fugiat maxime expedita.
        </p>
        <p>
          In ab sint, dolorem sequi placeat voluptatem incidunt numquam quisquam
          vitae facilis sit quis magni, facere aut veritatis esse maiores
          consequatur ullam commodi.
        </p>
        <p>
          Sed mollitia, vero aliquid et esse, illo, expedita doloremque suscipit
          deleniti assumenda sunt! Voluptatem error laudantium, sequi provident
          rem repudiandae sit voluptas dicta cumque quae itaque sed consectetur
          officia ab ex tenetur, illum officiis iste, ratione omnis eveniet.
        </p>
      </Column>
      <Column key={2}>
        <h2>Second column</h2>
        <p>
          Quasi, voluptatum totam sunt molestiae placeat fugit facere tenetur
          deserunt numquam repudiandae veniam laboriosam doloremque odio culpa a
          unde laborum voluptatem obcaecati quo necessitatibus aliquam
          excepturi.
        </p>
        <p>
          Exercitationem, quaerat culpa? Voluptatibus quod doloremque excepturi,
          necessitatibus sequi error maiores vitae at nesciunt unde repudiandae,
          optio magnam soluta nisi corporis.
        </p>
        <p>Quia exercitationem voluptates eius maxime, optio nobis?</p>
      </Column>
    </Columns>
  );
};

Default.args = {
  verticalAlignment: 'top',
  spacing: 2,
};

export default columns;
