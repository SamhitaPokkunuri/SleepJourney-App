import React from 'react';
import { addContainer } from 'stories/utils/decorators';
import SocialExco from './SocialExco';
import { SocialButton, Heading } from 'components';

const socialExco = {
  title: 'Components/Navigation/SocialExco',
  component: SocialExco,
  decorators: [addContainer('md')],
  parameters: {
    layout: 'centered',
  },
};

export const Default = () => {
  return (
    <SocialExco>
      <Heading variant="h5">Follow Nick Read on social</Heading>
      <SocialButton
        href="https://www.linkedin.com"
        icon="linkedin"
        target="_blank"
        rel="noreferrer noopener"
      >
        Find me on LinkedIn
      </SocialButton>
      <SocialButton
        href="https://www.twitter.com"
        icon="twitter"
        target="_blank"
        rel="noreferrer noopener"
      />
    </SocialExco>
  );
};

export default socialExco;
