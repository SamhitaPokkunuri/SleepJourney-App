import React from 'react';
import { addContainer } from 'stories/utils/decorators';
import NavigationIcons from './NavigationIcons';
import CountrySelector from '../country-selector/CountrySelector';
import GlobalSearch from '../global-search/GlobalSearch';

const navigationIcons = {
  title: 'Components/Navigation/NavigationIcons',
  component: NavigationIcons,
  decorators: [addContainer('lg')],
};

export const Default = (args) => {
  return (
    <>
      <NavigationIcons {...args} />
      <CountrySelector />
      <GlobalSearch />
    </>
  );
};

export default navigationIcons;
