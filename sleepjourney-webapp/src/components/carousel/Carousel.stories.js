import React from 'react';
import { addContainer } from 'stories/utils/decorators';
import Carousel from './Carousel';

const images = [
  {
    id: 1,
    url: 'https://content-staging.vodafone.com/sites/default/files/2021-05/Vodafone%20-%20Family%20using%20a%20device.png',
    caption: 'family',
    linkToURL: '',
    alt: 'family',
  },
  {
    id: 2,
    url: 'https://content-staging.vodafone.com/sites/default/files/2021-02/Ratio%2016_9-Porsche_formulaE_drivers_2021%204.jpg',
    caption: 'formula',
    linkToURL: '',
    alt: 'formula',
  },
  {
    id: 3,
    url: 'https://content-staging.vodafone.com/sites/default/files/2021-11/Demand%20testing%20couple%20smiling.png',
    caption: 'smiling',
    linkToURL: '',
    alt: 'smiling',
  },
  {
    id: 4,
    url: 'https://content-staging.vodafone.com/sites/default/files/2021-09/julius-mbura.png',
    caption: 'julius',
    linkToURL: '',
    alt: 'julius',
  },
];

const carousel = {
  title: 'Components/Surfaces/Carousel',
  component: Carousel,
  decorators: [addContainer('md')],
  argTypes: {
    children: {
      control: { type: null },
    },
  },
};
const CarouselTemplate = (args) => <Carousel {...args}></Carousel>;

export const Primary = CarouselTemplate.bind({});

Primary.args = {
  appearance: 'default',
  images: images,
  hasDots: true,
  widthControlExt: 'desktop',
  responsiveControl: true,
  autoplay: false,
  autoplaySpeed: 3000,
};

export const HeroBannerCarousel = CarouselTemplate.bind({});

HeroBannerCarousel.args = {
  ...Primary.args,
  appearance: 'hero-banner',
  autoplay: true,
};

export default carousel;
