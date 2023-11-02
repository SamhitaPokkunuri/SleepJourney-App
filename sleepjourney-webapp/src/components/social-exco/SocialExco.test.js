import React from 'react';
import { render, screen } from 'test/utils';
import { SocialButton, Heading } from 'components';
import SocialExco from './SocialExco';

describe('SocialExco', () => {
  const children = (
    <>
      <Heading variant="h5">Follow Nick Read on social</Heading>
      <SocialButton href="https://www.linkedin.com" icon="linkedin" />
      <SocialButton href="https://www.twitter.com" icon="twitter" />
    </>
  );

  it('should render heading', () => {
    render(<SocialExco>{children}</SocialExco>);
    expect(screen.getByRole('heading')).toBeInTheDocument();
  });

  it('should render links', () => {
    render(<SocialExco>{children}</SocialExco>);
    expect(screen.getAllByRole('link')).toHaveLength(2);
  });
});
