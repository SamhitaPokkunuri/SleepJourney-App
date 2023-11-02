import React from 'react';
import { addContainer } from 'stories/utils/decorators';
import Table from './Table';

const table = {
  title: 'Components/Data Display/Table',
  component: Table,
  decorators: [addContainer('lg')],
  argTypes: {
    body: {
      control: { type: null },
    },
    foot: {
      control: { type: null },
    },
    head: {
      control: { type: null },
    },
  },
};

export const Default = (args) => {
  return <Table {...args} />;
};

function createData(name, calories, fat, carbs, protein) {
  return {
    cells: [
      { content: name },
      { content: calories },
      { content: fat },
      { content: carbs },
      { content: protein },
    ],
  };
}
const header = [
  createData(
    '<strong>Dessert (100g serving)</strong>',
    '<strong>Calories</strong>',
    '<strong>Fat (g)</strong>',
    '<strong>Carbs (g)</strong>',
    '<strong>Protein (g)</strong>'
  ),
];

const body = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const footer = [
  createData(
    '<strong>Total</strong>',
    '<p>1000</p>',
    '<p>678</p>',
    '<p>1170</p>',
    '<p>992</p>'
  ),
];

Default.args = {
  head: header,
  body: body,
  foot: footer,
};

export default table;
