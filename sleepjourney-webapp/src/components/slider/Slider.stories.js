import React from 'react';
import { addContainer } from 'stories/utils/decorators';
import Slider from './Slider';

const slider = {
  title: 'Components/Surfaces/Slider',
  component: Slider,
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

const SliderTemplate = (args) => {
  return (
    /* eslint-disable @next/next/no-img-element */
    <Slider {...args}>
      <img src="images/stock/formula-e.jpg" alt="formula-e" />
      <img src="images/stock/family.jpg" alt="family" />
      <img src="images/stock/education.jpg" alt="education" />
      <img src="images/stock/network.jpg" alt="network" />
    </Slider>
  );
};

export const Default = SliderTemplate.bind();

Default.args = {
  appearance: 'default',
  arrows: true,
  dots: true,
  flex: false,
  marginBottom: false,
};

export const HeroBanner = SliderTemplate.bind();

HeroBanner.args = {
  appearance: 'hero-banner',
  arrows: false,
  dots: false,
  flex: true,
  marginBottom: false,
};

export default slider;
