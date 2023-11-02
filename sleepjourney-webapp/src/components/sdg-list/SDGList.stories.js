import React from 'react';
import SDGList from './SDGList';
import { SDGCard } from '../sdg-card/SDGCard';

const sdgList = {
  title: 'Components/Surfaces/SDGList',
  component: SDGList,
};
const CardTemplate = (args) => <SDGCard {...args} />;
const SDGCardDefault = CardTemplate.bind({});

SDGCardDefault.args = {
  post: {
    id: 1,
    heroImageUrl: '',
    title: 'TINALP - 5G Education',
    description:
      'Together we can help create new ways of learning. Vodafone Italy’s Action For 5G initiative invited startups, small and medium-sized enterprises and social businesses to contribute to a project that could be developed or strengthened with Vodafone 5G technology. ',
    url: '/sustainable-business/our-contribution-to-un-sdgs/SDG-7',
  },
  target: 'overlay',
};

const SDGCardPrimary = CardTemplate.bind({});

SDGCardPrimary.args = {
  post: {
    id: 2,
    heroImageUrl: '',
    title:
      'Ensure access to affordable, reliable, sustainable and modern energy for all',
    description:
      'Vodafone’s IoT solutions help governments and businesses address environmental issues and are enabling the development of connected and smart cities, helping them to run more efficiently.',
    url: '/sustainable-business/our-contribution-to-un-sdgs/SDG-11',
  },
  target: 'overlay',
};
export const Default = (args) => {
  return (
    <SDGList {...args}>
      <SDGCardDefault {...SDGCardDefault.args} />
      <SDGCardPrimary {...SDGCardPrimary.args} />
    </SDGList>
  );
};

Default.args = {
  columns: 2,
  hideDescription: false,
  title: 'Explore the world of possibilities for the digital era',
};

export default sdgList;
