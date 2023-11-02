import React from 'react';
import CardList from './CardList';
import Card from '../card/Card';
import { addContainer } from 'stories/utils/decorators';

const cardList = {
  title: 'Components/Surfaces/CardList',
  component: CardList,
  decorators: [addContainer('lg')],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    children: {
      control: { type: null },
    },
  },
};
const CardItemTemplate = (args) => <Card {...args} />;

const CardItem1 = CardItemTemplate.bind({});

CardItem1.args = {
  title: {
    toggle: true,
    text: 'Why Vodafone Foundation’s partnership with UNHCR has never been more important',
  },
  description: {
    toggle: true,
    text: 'This year Vodafone Foundation and their partner, UNHCR, the UN Refugee Agency, reach milestone anniversaries, with a century of activity between them. Andrew Dunnett, Director, SDGs, Sustainable Business and Foundations at Vodafone Group, reflects on the renewed importance of the partnership through the pandemic.',
  },

  image: {
    url: 'https://content-staging.vodafone.com/sites/default/files/2021-09/unga-social-sharing.png',
    aspectRatio: '16:9',
    toggle: true,
  },
  link: {
    openAs: 'current-tab',
    url: 'https://www.vodafone.com/news/viewpoint/vodafone-plays-part-respecting-human-rights',
    toggle: true,
  },
};

const CardItem2 = CardItemTemplate.bind({});

CardItem2.args = {
  title: {
    toggle: true,
    text: 'How Vodafone plays its part in respecting human rights',
  },
  description: {
    toggle: false,
    text: 'Human Rights Day is celebrated every year on 10 December in reflection of the day in 1948 the United Nations General Assembly adopted the Universal Declaration of Human Rights (UDHR).  It’s not an exaggeration to say that the UDHR is one of the most important post-war documents ever produced.  Available in 500 languages, it’s certainly the most translated document in the world.',
  },
  link: {
    openAs: 'current-tab',
    url: 'https://www.vodafone.com/news/inclusion/5g-education-learning-experience',
    toggle: false,
  },

  image: {
    url: 'https://content-staging.vodafone.com/sites/default/files/2021-09/vodafone-foundation-connected-women-egypt.jpg',
    aspectRatio: '16:9',
    toggle: true,
  },
};
const CardItem3 = CardItemTemplate.bind({});

CardItem3.args = {
  title: {
    toggle: true,
    text: '5G can help us reimagine education as an amazing learning experience',
  },
  description: {
    toggle: true,
    text: 'The Covid-19 pandemic has overturned our lives for almost two years, but amid the turmoil, there have been some positive lessons. As millions of people around Europe were confined to their homes, they discovered new ways to connect to the outside world',
  },
  link: {
    openAs: 'current-tab',
    url: 'https://www.vodafone.com/news/inclusion/vodafone-new-targets-increase-ethnic-diversity',
    toggle: true,
  },
  image: {
    url: 'https://content-staging.vodafone.com/sites/default/files/2021-07/VodafoneSmartAgriculture5G_01.jpg',
    aspectRatio: '16:9',
    toggle: false,
  },
};
const CardItem4 = CardItemTemplate.bind({});

CardItem4.args = {
  title: {
    toggle: false,
    text: 'Vodafone announces new targets to increase ethnic diversity',
  },
  description: {
    toggle: true,
    text: 'Vodafone today announced new ethnic diversity targets to ensure that by 2030, 25% of the company’s global senior leadership – the most senior 160 leaders across Vodafone’s markets in Europe and Africa – will come from ethnically diverse backgrounds. Based on self-declaration, currently 18% of Vodafone’s global senior leadership team are from ethnically diverse backgrounds.',
  },
  link: {
    openAs: 'current-tab',
    url: 'https://www.vodafone.com/news/vodafone-foundation/equal-access-to-education',
    toggle: true,
  },

  image: {
    url: 'https://content-staging.vodafone.com/sites/default/files/2021-08/vodacom-leshoto-foundation.jpg',
    aspectRatio: '16:9',
    toggle: true,
  },
};

const CardListTemplate = (args) => {
  return (
    <CardList {...args}>
      <CardItem1 {...CardItem1.args}></CardItem1>
      <CardItem2 {...CardItem2.args}></CardItem2>
      <CardItem3 {...CardItem3.args}></CardItem3>
      <CardItem4 {...CardItem4.args}></CardItem4>
    </CardList>
  );
};

export const Primary = CardListTemplate.bind({});

Primary.args = {
  columns: 4,
  variation: 'default',
};

export default cardList;
