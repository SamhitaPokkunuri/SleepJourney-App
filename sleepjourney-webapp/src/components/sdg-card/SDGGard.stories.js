import React from 'react';
import { addContainer } from 'stories/utils/decorators';
import SDGCard from './SDGCard';

const sdgCard = {
  title: 'Components/Surfaces/SDGCard',
  component: SDGCard,
  decorators: [addContainer('lg')],
  parameters: {
    layout: 'centered',
  },
  image: {
    control: { type: null },
  },

  link: {
    control: { type: null },
  },
};

export const Default = (args) => {
  return <SDGCard {...args} />;
};

Default.args = {
  image: {
    src: '',
  },
  title: 'TINALP - 5G Education',
  description:
    'Together we can help create new ways of learning. Vodafone Italy’s Action For 5G initiative invited startups, small and medium-sized enterprises and social businesses to contribute to a project that could be developed or strengthened with Vodafone 5G technology. ',

  link: {
    target: '_blank',
    url: 'https://www.vodafone.com/mobile-world-congress-2021/tinalp-5g-education',
  },
  hideDescription: false,
  chevron: false,
};
export default sdgCard;
