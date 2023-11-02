import React from 'react';
import { addContainer } from 'stories/utils/decorators';
import Tabs from './Tabs';
import Tab from '../tab/Tab';

const tabs = {
  title: 'Components/Navigation/Tabs',
  component: Tabs,
  subcomponents: { Tab },
  decorators: [addContainer('lg')],
  argTypes: {
    children: {
      control: { type: null },
    },
    sectionTitle: {
      control: { type: null },
    },
    titles: {
      control: { type: null },
    },
  },
};

export const Default = (args) => {
  return (
    <Tabs {...args}>
      <Tab>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste, placeat
          voluptatem vitae debitis doloribus molestiae minus, eos ratione
          dignissimos pariatur quisquam a ipsam saepe autem earum optio
          similique provident! Impedit.
        </p>
      </Tab>
      <Tab>
        <p>
          Error eveniet quibusdam laboriosam fugit repellat earum et consectetur
          totam, vitae magnam inventore quidem obcaecati reiciendis eum numquam
          dicta amet! Unde labore mollitia perferendis eaque. Incidunt
          aspernatur illo maiores ea.
        </p>
      </Tab>
      <Tab>
        <p>
          Tempora, a. Quo ab aliquid debitis modi sed pariatur placeat possimus,
          temporibus, blanditiis quod iste, illo cupiditate in delectus sint
          perspiciatis eveniet! Molestiae aliquid dolorum, natus voluptas
          deleniti assumenda tempore vero impedit.
        </p>
      </Tab>
      <Tab>
        <p>
          Molestias veniam labore, at velit voluptatibus odio et sed hic nostrum
          saepe tempore fugiat, quis ab aspernatur, voluptates doloribus
          eligendi cum inventore dolores ea sint iusto reprehenderit suscipit
          aliquam. Necessitatibus?
        </p>
      </Tab>
      <Tab>
        <p>
          Quibusdam numquam nostrum necessitatibus esse, unde deleniti dolore
          aperiam doloremque non fugiat praesentium labore magni voluptatem odio
          quidem asperiores facere libero dolor quis, animi tempora natus
          ratione sequi repellat? Voluptate.
        </p>
      </Tab>
    </Tabs>
  );
};

Default.args = {
  orientation: 'horizontal',
  sectionTitle: { text: 'Tabs story', toggle: true },
  titles: [
    { text: 'Tab 1' },
    { text: 'Tab 2' },
    { text: 'Tab 3' },
    { text: 'Tab 4' },
    { text: 'Tab 5' },
  ],
};

export default tabs;
