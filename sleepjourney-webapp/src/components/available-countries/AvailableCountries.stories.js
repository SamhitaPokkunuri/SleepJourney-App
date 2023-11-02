import React from 'react';
import { addContainer } from 'stories/utils/decorators';
import AvailableCountries from './AvailableCountries';
import Image from '../image/Image';

const availableCountries = {
  title: 'Components/Layout/AvailableCountries',
  component: AvailableCountries,
  decorators: [addContainer('lg')],
  parameters: {
    layout: 'centered',
  },
};

export const Default = (args) => {
  return (
    <AvailableCountries {...args}>
      <Image
        alt="france"
        key={'fr'}
        url="https://content-staging.vodafone.com/sites/default/files/2021-05/Flag_France.png"
      />
      <Image
        alt="greece"
        key={'gr'}
        url="https://content-staging.vodafone.com/sites/default/files/2021-04/flag-Greece.png"
      />
      <Image
        alt="italy"
        key={'it'}
        url="https://content-staging.vodafone.com/sites/default/files/2021-04/flag-Italy.png"
      />
    </AvailableCountries>
  );
};

Default.args = {
  label: 'Countries',
};

export default availableCountries;
