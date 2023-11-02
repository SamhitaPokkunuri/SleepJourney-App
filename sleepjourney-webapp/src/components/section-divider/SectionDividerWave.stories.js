import React from 'react';
import SectionDividerWave from './SectionDividerWave';

const sectionDividerWave = {
  title: 'Components/Layout/SectionDividerWave',
  component: SectionDividerWave,
  parameters: {
    layout: 'centered',
  },
};

export const Default = (args) => {
  return <SectionDividerWave {...args} />;
};

Default.args = {
  divider: {
    path: 'M0,180C235.3,214.62,371.28,30,684,30c314.73,0,562.81,180,920,180,189,0,316-50,316-50V0H0Z',
    invertedPath:
      'M0,240H1920V160s-127,50-316,50C1246.81,210,998.73,30,684,30,371.28,30,235.3,214.62,0,180Z',
    viewBox: '0 0 1920 240',
    mobile: {
      path: 'M0,130V88s37.27,12,104,12c131.79,0,271-70,271-70V130Z',
      viewBox: '0 0 375 130',
    },
  },
};

export default sectionDividerWave;
