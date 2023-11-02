import React from 'react';
import { addContainer } from 'stories/utils/decorators';
import RoamingHubServices from './RoamingHubServices';
import RoamingHubServicesItem from 'components/roaming-hub-services-item/RoamingHubServicesItem';

const roamingHubServices = {
  title: 'Components/Data Display/RoamingHubServices',
  component: RoamingHubServices,
  subcomponents: { RoamingHubServicesItem },
  decorators: [addContainer('xxl')],
};

export const Default = () => {
  return (
    <RoamingHubServices>
      <RoamingHubServicesItem
        key="Hub members"
        heading="Hub members"
        networks="184"
        countries="129"
      />
      <RoamingHubServicesItem
        key="GSM footprint"
        heading="GSM footprint"
        networks="184"
        countries="129"
      />
      <RoamingHubServicesItem
        key="GPRS members"
        heading="GPRS members"
        networks="182"
        countries="128"
      />
      <RoamingHubServicesItem
        key="3G members"
        heading="3G members"
        networks="181"
        countries="128"
      />
      <RoamingHubServicesItem
        key="CAMEL footprint"
        heading="CAMEL footprint"
        networks="170"
        countries="125"
      />
      <RoamingHubServicesItem
        key="4G footprint"
        heading="4G footprint"
        networks="156"
        countries="114"
      />
    </RoamingHubServices>
  );
};

export default roamingHubServices;
