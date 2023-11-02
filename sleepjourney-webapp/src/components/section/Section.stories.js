import React from 'react';
import Section from './Section';
import { Heading, Paragraph } from 'components';

const section = {
  title: 'Components/Layout/Section',
  component: Section,
  parameters: {
    layout: 'centered',
  },
};
const SectionChildren = () => {
  return (
    <>
      <Heading>About Us</Heading>
      <Paragraph>
        Through a strategy of Connecting for Good, Vodafone Foundation (UK
        registered charity 1193984) combines Vodafone charitable giving and
        technology to create long-term, sustainable programmes that help to
        address the worlds most pressing problems. Vodafone Group Plc is our
        principal funder for projects around the world that are run in
        partnership with other charitable organisations & NGOs. Our work is
        centred around four core pillars of activity; Connected Learning,
        Connected Health, Connected Living, and a portfolio of apps.
      </Paragraph>
    </>
  );
};
export const Default = (args) => {
  return <Section {...args} />;
};

Default.args = {
  children: <SectionChildren />,
  customColors: {
    text: '#FFFFFF',
    background: 'linear-gradient(301deg, #e60000, #820000)',
  },
  backgroundDivider: {
    hasDivider: true,
    type: 'wave',
    patternName: 'Pattern01',
    hasOverlap: false,
    svgDivider: {
      divider: {
        name: 'wave-3',
        path: 'M0,210S250,30,656,30c373.46,0,578.16,126,922,126,167.74,0,342-64,342-64V0H0Z',
        invertedPath:
          'M0,240H1920V92s-174.26,64-342,64c-343.84,0-548.54-126-922-126C250,30,0,210,0,210Z',
        viewBox: '0 0 1920 240',
        mobile: {
          path: 'M0,130V88s37.27,12,104,12c131.79,0,271-70,271-70V130Z',
          viewBox: '0 0 375 130',
        },
      },
      height: '240px',
      width: '100%',
      color: '#FFFFFF',
      flipped: false,
      inverted: false,
      dropShadow: true,
      align: 'bottom',
    },
  },
};

export default section;
