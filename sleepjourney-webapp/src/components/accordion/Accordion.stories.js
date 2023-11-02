import React from 'react';
import { addContainer } from 'stories/utils/decorators';
import Accordion from './Accordion';
import AccordionItem from 'components/accordion-item/AccordionItem';
import Paragraph from 'components/paragraph/Paragraph';

const accordion = {
  title: 'Components/Surfaces/Accordion',
  component: Accordion,
  subcomponents: { AccordionItem },
  decorators: [addContainer('lg')],
  argTypes: {
    children: {
      control: { type: null },
    },
    sectionTitle: {
      control: { type: 'text' },
    },
  },
};

const Template = ({ isExpanded, ...args }) => {
  return (
    <Accordion {...args}>
      <AccordionItem open={isExpanded} title="AccordionItem">
        <Paragraph>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero corporis
          nulla aperiam ipsam voluptatem expedita tempore? Consectetur pariatur
          non assumenda cupiditate dolores! Nam tenetur, quis earum illum
          reiciendis quidem deleniti.
        </Paragraph>
      </AccordionItem>
    </Accordion>
  );
};

export const Expanded = Template.bind({});

Expanded.args = {
  sectionTitle: 'Expanded State Accordion',
  isExpanded: true,
};

export const Collasped = Template.bind({});

Collasped.args = {
  sectionTitle: 'Collapsed State Accordion',
  isExpanded: false,
};

export default accordion;
