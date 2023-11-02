import React from 'react';
import { addContainer } from 'stories/utils/decorators';
import RoamingHubServicesItem from 'components/roaming-hub-services-item/RoamingHubServicesItem';

const roamingHubServicesItem = {
  title: 'Components/Data Display/RoamingHubServicesItem',
  component: RoamingHubServicesItem,
  decorators: [addContainer('sm')],
};

export const Default = (args) => {
  return <RoamingHubServicesItem {...args} />;
};

Default.args = {
  heading: 'Hub members',
  networks: 184,
  countries: 129,
};

export default roamingHubServicesItem;
