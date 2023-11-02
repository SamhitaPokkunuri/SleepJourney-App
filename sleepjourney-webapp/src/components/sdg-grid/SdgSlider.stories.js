import React from 'react';
import { addContainer } from 'stories/utils/decorators';
import SdgSlider from './SdgSlider';

const sdgSlider = {
  title: 'Components/Surfaces/SdgSlider',
  component: SdgSlider,
  decorators: [addContainer('lg')],
  parameters: {
    layout: 'centered',
  },
  image: {
    control: { type: null },
  },

  link: {
    control: { type: null },
  },
};

export const Default = (args) => {
  return <SdgSlider {...args} />;
};

Default.args = {
  sdgs: [
    {
      id: 1,
      title: 'IoT portable traffic emergency light',
      heroImageUrl:
        'https://content-staging.vodafone.com/sites/default/files/2021-06/Demo%201%20IoT%20portable%20traffic%20emergency%20light.jpg',
      description:
        'Help Flash IoT is a luminous device that can replace emergency warning triangles for motorists providing security and safety while travelling.',

      url: '/mobile-world-congress-2021/iot-portable-traffic-emergency-light',
      ctaText: 'View demo',
      sdgImageUrl:
        'https://content-staging.vodafone.com/sites/default/files/2021-06/Grid%20IoT%20portable%20traffic%20emergency%20light.png',
      sdgOrder: '1',
    },
    {
      id: 2,
      title: 'Curve Bike Light & GPS tracker',
      heroImageUrl:
        'https://content-staging.vodafone.com/sites/default/files/2021-06/CurveBike_ProductRender_Beauty_03_Angled_Right_Top_light_on.png',
      description:
        'Designed to give you confidence as you ride. Feel safer on the roads and connected to your bike when you’re not.',
      ctaText: 'View demo',
      url: '/mobile-world-congress-2021/curve-bike-light-gps-tracker',
      sdgImageUrl:
        'https://content-staging.vodafone.com/sites/default/files/2021-06/Grid%20Curve%20Bike%20Light%20%26%20GPS%20tracker.png',
      sdgOrder: '2',
    },
    {
      id: 3,
      title: 'Assisted Driving',
      heroImageUrl:
        'https://content-staging.vodafone.com/sites/default/files/2021-06/demo-3-assisted-driving%403x.jpg',
      ctaText: 'View demo',
      url: '/mobile-world-congress-2021/curve-bike-light-gps-tracker',
      description:
        'See how IoT can be used to redefine how road networks, vehicles and other road users interact to create safer, more sustainable cities.',
      sdgImageUrl:
        'https://content-staging.vodafone.com/sites/default/files/2021-06/Grid%20Assisted%20Driving.png',
      sdgOrder: '3',
    },
    {
      id: 4,
      title: 'DreamLab',
      heroImageUrl:
        'https://content-staging.vodafone.com/sites/default/files/2021-06/demo-4-dream-lab%403x.jpg',
      description:
        'Speeding up cancer and coronavirus research with the processing power of smartphones.',
      url: '/mobile-world-congress-2021/dreamlab',
      ctaText: 'View demo',

      sdgImageUrl:
        'https://content-staging.vodafone.com/sites/default/files/2021-06/Grid%20DreamLab.png',
      sdgOrder: '4',
    },
  ],
};
export default sdgSlider;
