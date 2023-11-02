import React from 'react';
import { addContainer } from 'stories/utils/decorators';
import FoundationProgramme from './FoundationProgramme';

const foundationProgramme = {
  title: 'Components/Navigation/FoundationProgramme',
  component: FoundationProgramme,
  decorators: [addContainer('sm')],
  parameters: {
    layout: 'centered',
  },
};

export const Default = (args) => {
  return <FoundationProgramme {...args} />;
};

Default.args = {
  image: {
    alt: 'agriculture',
    id: 22,
    url: 'https://content-staging.vodafone.com/sites/default/files/2021-07/VodafoneSmartAgriculture5G_01.jpg',
    width: 100,
    toggle: true,
  },
  title: {
    toggle: true,
    text: 'Agriculture',
  },
  link: {
    toggle: true,
    openAs: 'current-tab',
    rel: 'noreferrer noopener',
    url: 'https://staging.vodafone.com/news/digital-society/digitalisation-future-agriculture',
  },
};

export default foundationProgramme;
