import React from 'react';
import SocialShare from './SocialShare';

const socialShare = {
  title: 'Components/Navigation/SocialShare',
  component: SocialShare,
  decorators: [
    (Story) => {
      return (
        <div style={{ display: 'flex' }}>
          <Story />
        </div>
      );
    },
  ],
  argTypes: {
    children: {
      control: { type: null },
    },
  },
};

export const Default = (args) => {
  return <SocialShare {...args} />;
};

Default.args = {
  canonical:
    'https://www.vodafone.com/news/press-release/vodafone-spain-acquires-2x10mhz-spectrum-expand-5g-services',
  title: 'spectrum',
  description: 'Spectrum',
  className: 'default',
  collapsed: false,
  facebook: true,
  linkedin: true,
  twitter: true,
  email: true,
  fontSize: 'small',
  type: 'fill',
};
export default socialShare;
