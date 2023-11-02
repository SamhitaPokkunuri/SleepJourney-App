/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render } from 'test/utils';

import { Default } from './Logo.stories';

describe('Logo', () => {
  it('should render icon', () => {
    const { getByRole } = render(<Default {...Default.args} />);
    expect(
      getByRole('link').querySelector(
        '[data-src="/icons/group/logo-vodafone.svg"]'
      )
    ).toBeTruthy();
  });
  it('should navigate', () => {
    const { getByRole } = render(<Default {...Default.args} />);
    expect(getByRole('link')).toHaveAttribute('href', '/');
  });
  it('shouldnt navigate', () => {
    const { container } = render(<Default {...Default.args} nonav />);
    expect(container.querySelector('a')).not.toHaveAttribute('href', '/');
  });
});
