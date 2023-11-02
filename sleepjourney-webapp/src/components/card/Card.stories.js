import React from 'react';

import Card from './Card';

const card = {
  title: 'Components/Surfaces/Card',
  component: Card,
  decorators: [
    (Story, { args }) => {
      const { featureCard, firstCard, singleColumn } = args;
      const horizontal = featureCard || firstCard || singleColumn;

      return (
        <div style={{ maxWidth: horizontal ? 1280 : 480, margin: 'auto' }}>
          <Story />
        </div>
      );
    },
  ],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    image: {
      control: { type: null },
    },
    link: {
      control: { type: null },
    },
    tags: {
      control: { type: null },
    },
  },
};

const CardTemplate = (args) => <Card {...args} />;

export const Default = CardTemplate.bind({});

Default.args = {
  category: 'Press Release',
  categoryAlias: 'https://www.vodafone.com/news/press-release',
  categoryColor: '#e94548',
  date: '22 Jul 2021',
  description:
    'This year Vodafone Foundation and their partner, UNHCR, the UN Refugee Agency, reach milestone anniversaries, with a century of activity between them. Andrew Dunnett, Director, SDGs, Sustainable Business and Foundations at Vodafone Group, reflects on the renewed importance of the partnership through the pandemic.',
  featureCard: false,
  firstCard: false,
  image: {
    url: 'https://content-staging.vodafone.com/sites/default/files/2021-08/vodacom-leshoto-foundation.jpg',
    aspectRatio: '16:9',
  },
  link: {
    openAs: 'current-tab',
    url: 'https://www.vodafone.com/news/press-release/vodafone-spain-acquires-2x10mhz-spectrum-expand-5g-services',
  },
  showCategory: true,
  showDate: true,
  showDescription: true,
  showImage: true,
  showLink: true,
  showShareIcons: true,
  showTags: true,
  showTitle: true,
  singleColumn: false,
  tags: [
    '5G',
    'Infrastructure',
    'Mergers and Acquisitions',
    'Networks',
    'Press Release',
  ],
  title:
    'Why Vodafone Foundation’s partnership with UNHCR has never been more important',
};

export const Country = CardTemplate.bind({});

Country.args = {
  ...Default.args,
  isCountry: true,
};

export const Foundation = CardTemplate.bind({});

Foundation.args = {
  ...Default.args,
  image: {
    url: 'https://content-staging.vodafone.com/sites/default/files/2021-08/vodacom-leshoto-foundation.jpg',
    aspectRatio: '1:1',
    toggle: true,
  },
  title: 'Nick Land',
  description: 'Chairman & Trustee',
  isFoundation: true,
};

export default card;
