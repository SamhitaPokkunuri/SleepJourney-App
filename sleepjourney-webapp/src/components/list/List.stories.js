import React from 'react';
import { addContainer } from 'stories/utils/decorators';
import List from './List';
import ListItem from '../list-item/ListItem';

const list = {
  title: 'Components/Data Display/List',
  component: List,
  subcomponents: { ListItem },
  decorators: [addContainer()],
  argTypes: {
    children: {
      control: { type: null },
    },
  },
};

const ListTemplate = (args) => {
  return (
    <List {...args}>
      <ListItem>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis
        nesciunt aspernatur voluptates, fuga perspiciatis accusamus, a corporis
        corrupti assumenda explicabo cumque nobis deleniti, commodi repellat
        quas! Eius dolorum at quasi.
      </ListItem>
      <ListItem>
        Eum impedit facilis debitis quo. Dolores, non? Laboriosam facilis
        repellat ipsa perspiciatis itaque dolore, quam labore accusamus fugit
        maiores facere quasi error ducimus similique autem iure aliquid est quia
        odio?
      </ListItem>
      <ListItem>
        Quibusdam aspernatur inventore quaerat architecto nemo, porro dolorum
        distinctio illo. Perferendis quod maxime, sit modi aperiam aliquam
        labore facilis! Laborum id debitis fuga eligendi, iure unde? Iste harum
        voluptates ut?
      </ListItem>
    </List>
  );
};

export const Ordered = ListTemplate.bind({});

Ordered.args = {
  color: 'inherit',
  component: 'ol',
  density: 'default',
};

export const Unordered = ListTemplate.bind({});

Unordered.args = {
  ...Ordered.args,
  component: 'ul',
};

export default list;
