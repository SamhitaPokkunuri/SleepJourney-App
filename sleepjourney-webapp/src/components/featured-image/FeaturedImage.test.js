/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render } from 'test/utils';
import { Default } from './FeaturedImage.stories';

describe('Featured Image', () => {
  it('should render featured-image', () => {
    const { getByRole } = render(<Default {...Default.args} />);
    expect(getByRole('figure').children).toHaveLength(2);
  });

  it('should render featured-image image styles', () => {
    const { getByRole } = render(<Default {...Default.args} />);
    expect(getByRole('figure').firstChild.className).toMatch(/largePicture/i);
    expect(getByRole('img')).toBeInTheDocument();
    expect(getByRole('img')).toHaveAttribute('alt', 'leshoto');
  });

  it('should render featured-image image styles if level changed', () => {
    const { getByRole } = render(<Default {...Default.args} level={1} />);
    expect(getByRole('figure').firstChild.className).not.toMatch(
      /largePicture/i
    );
  });

  it('should render featured-image caption', () => {
    const { getByRole } = render(<Default {...Default.args} />);
    expect(getByRole('heading').parentElement.className).toMatch(
      /redFigcaption/i
    );
    expect(getByRole('heading').className).toMatch(/redCaption/i);
    expect(getByRole('heading')).toHaveTextContent('leshoto');
  });
});
