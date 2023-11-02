/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render } from 'test/utils';
import { Default } from './FeaturedText.stories';

describe('Featured Text', () => {
  it('should render featured-text ', () => {
    const { getByRole } = render(<Default {...Default.args} />);
    expect(getByRole('heading')).toBeInTheDocument();
    expect(getByRole('heading').className).toMatch(/text/i);
    expect(getByRole('heading').parentElement).toHaveClass(
      'MuiContainer-fixed'
    );
    expect(getByRole('heading').parentElement).toHaveStyle(`flex: 1 1 auto;
    width: 100%;
    align-items: center;`);
  });
});
