import React from 'react';
import SectionDividerPattern from './SectionDividerPattern';

const sectionDividerPattern = {
  title: 'Components/Layout/SectionDividerPattern',
  component: SectionDividerPattern,
  parameters: {
    layout: 'centered',
  },
};

export const Default = (args) => {
  return <SectionDividerPattern {...args} />;
};

export default sectionDividerPattern;
