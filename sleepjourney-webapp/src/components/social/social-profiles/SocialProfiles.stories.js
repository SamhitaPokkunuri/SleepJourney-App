import React from 'react';
import { addContainer } from 'stories/utils/decorators';
import SocialProfiles from './SocialProfiles';

const socialProfiles = {
  title: 'Components/Navigation/SocialProfiles',
  component: SocialProfiles,
  decorators: [addContainer('lg')],
  argTypes: {
    className: {
      control: { type: 'radio', options: ['is-style-brand', 'is-style-light'] },
    },
  },
};

export const Default = (args) => <SocialProfiles {...args} />;

Default.args = {
  linkedin: 'https://www.linkedin.com/company/vodafone/',
  twitter: 'https://twitter.com/VodafoneGroup',
  youtube: 'https://www.youtube.com/vodafonemedia',
  instagram: 'https://www.instagram.com/vodafone_group/',
  facebook: 'https://www.facebook.com/thevodafonegroup/',
  className: 'default',
  disableMargin: false,
};

export default socialProfiles;
