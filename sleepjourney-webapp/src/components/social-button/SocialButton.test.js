import React from 'react';
import { render, screen } from 'test/utils';
import SocialButton from './SocialButton';

describe('SocialButton', () => {
  const socialButtonProps = {
    href: 'https://www.twitter.com',
  };

  it('should render link', () => {
    render(<SocialButton {...socialButtonProps} />);
    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('should render icon', () => {
    render(<SocialButton {...socialButtonProps} icon="twitter" />);
    expect(screen.getByRole('img')).toBeInTheDocument();
  });
});
