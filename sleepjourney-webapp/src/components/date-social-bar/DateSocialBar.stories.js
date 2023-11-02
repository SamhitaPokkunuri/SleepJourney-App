import React from 'react';
import { addContainer } from 'stories/utils/decorators';
import DateSocialBar from './DateSocialBar';

const dateSocialBar = {
  title: 'Components/Navigation/DateSocialBar',
  component: DateSocialBar,
  decorators: [addContainer('sm')],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    type: {
      control: { type: 'radio', options: ['', 'fill'] },
    },
    fontSize: {
      control: {
        type: 'radio',
        options: ['inherit', 'default', 'small', 'medium', 'large', 'xlarge'],
      },
    },
  },
};

export const Default = (args) => {
  return <DateSocialBar {...args} />;
};

Default.args = {
  showDate: true,
  showCategory: true,
  date: '29-03-2022',
  category: 'Inclusion',
  categoryColor: 'purple',
  categoryAlias: 'https://staging.vodafone.com/news/inclusion',
  showShareIcons: true,
  canonical:
    'https://www.vodafone.com/news/press-release/vodafone-spain-acquires-2x10mhz-spectrum-expand-5g-services',
  title: 'spectrum',
  description: 'Spectrum',
  collapsed: false,
  facebook: true,
  linkedin: true,
  twitter: true,
  email: true,
  fontSize: 'small',
  type: 'fill',
};

export default dateSocialBar;
