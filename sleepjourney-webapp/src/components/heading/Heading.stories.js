import React from 'react';
import Heading from './Heading';

const heading = {
  title: 'Components/Data Display/Heading',
  component: Heading,
  argTypes: {
    children: {
      control: { type: null },
    },
    component: {
      control: { type: null },
    },
  },
};

const HeadingTemplate = (args) => <Heading {...args} />;

export const Heading1 = HeadingTemplate.bind({});

Heading1.args = {
  children: 'The quick brown fox jumps over the lazy dog',
  variant: 'h1',
  color: 'inherit',
  align: 'inherit',
  fontWeight: 'default',
};

export const Heading2 = HeadingTemplate.bind({});

Heading2.args = {
  ...Heading1.args,
  variant: 'h2',
};

export const Heading3 = HeadingTemplate.bind({});

Heading3.args = {
  ...Heading1.args,
  variant: 'h3',
};

export const Heading4 = HeadingTemplate.bind({});

Heading4.args = {
  ...Heading1.args,
  variant: 'h4',
};

export const Heading5 = HeadingTemplate.bind({});

Heading5.args = {
  ...Heading1.args,
  variant: 'h5',
};

export const Heading6 = HeadingTemplate.bind({});

Heading6.args = {
  ...Heading1.args,
  variant: 'h6',
};

export const HeadingLink = HeadingTemplate.bind({});

HeadingLink.args = {
  ...Heading1.args,
  children:
    '<a href="/" target="_blank">The quick brown fox jumps over the lazy dog</a>',
  variant: 'h4',
};

export const ThinFontWeight = HeadingTemplate.bind({});

ThinFontWeight.args = {
  ...Heading1.args,
  children:
    'The <strong>quick brown</strong> fox jumps over the <strong>lazy</strong> dog',
  variant: 'h2',
  fontWeight: 'thin',
};

export const MixedFontWeight = HeadingTemplate.bind({});

MixedFontWeight.args = {
  ...Heading1.args,
  children:
    'The <strong>quick brown</strong> fox jumps over the <strong>lazy</strong> dog',
  variant: 'h2',
  fontWeight: 'mixed',
};

export default heading;
