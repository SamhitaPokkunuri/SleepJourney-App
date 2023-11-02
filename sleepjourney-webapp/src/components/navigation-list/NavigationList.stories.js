import React from 'react';
import { addContainer } from 'stories/utils/decorators';
import NavigationList from './NavigationList';

const navigationList = {
  title: 'Components/Navigation/NavigationList',
  component: NavigationList,
  decorators: [addContainer('lg')],
};

export const Default = (args) => {
  return (
    <div style={{ position: 'relative' }}>
      <NavigationList {...args} />
    </div>
  );
};

Default.args = {
  data: [
    {
      attributes: {
        id: 1,
        label: 'About',
        path: {
          url: { path: '/about-vodafone' },
        },
        children: [
          {
            attributes: {
              id: 10,
              label: 'Who we are',
              path: {
                url: { path: '/who-we-are' },
              },
            },
          },
          {
            attributes: {
              id: 12,
              label: 'What we do',
              path: {
                url: { path: '/what-we-do' },
              },
            },
          },
        ],
        enabled: true,
      },
    },
    {
      attributes: {
        id: 2,
        label: 'Sustainable Business',
        path: {
          url: { path: '/sustainable-business' },
        },
        children: [],
      },
    },

    {
      attributes: {
        id: 4,
        label: 'Investors',
        path: {
          url: { path: 'https://investors.vodafone.com/' },
          options: { attributes: { target: '_blank' } },
        },
        children: [],
      },
    },

    {
      attributes: {
        id: 7,
        label: 'Vodafone Foundation',
        path: {
          url: { path: '/vodafone-foundation' },
        },
        children: [],
      },
    },
  ],
};

export default navigationList;
