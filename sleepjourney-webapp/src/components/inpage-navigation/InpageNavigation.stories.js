import React from 'react';
import InpageNavigation from './InpageNavigation';
import InPageLink from './InpageLink';

const inpageNavigation = {
  title: 'Components/Navigation/InpageNavigation',
  component: InpageNavigation,
  parameters: {
    layout: 'fullscreen',
  },
};

export const Default = (args) => (
  <InpageNavigation {...args}>
    <InPageLink anchor="#introduction" title="Introduction" key={1} />
    <InPageLink anchor="#mwc-demos" title="MVC Demos" key={2} />
    <InPageLink anchor="#latest-news" title="Latest news" key={3} />
  </InpageNavigation>
);

export default inpageNavigation;
