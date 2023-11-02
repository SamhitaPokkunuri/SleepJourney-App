/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render } from 'test/utils';
import { Default } from './ImageCaption.stories';

describe('Image Caption', () => {
  it('should render image-caption', () => {
    const { getByRole } = render(<Default {...Default.args} />);
    expect(getByRole('heading').parentElement.className).toMatch(
      /blackFigcaption/i
    );
    expect(getByRole('heading').parentElement).toHaveStyle(
      `background: rgba(0,0,0,0.25);`
    );
    expect(getByRole('heading')).toHaveTextContent(/leshoto/i);
  });

  it('should render image-caption styles with different color', () => {
    const { getByRole } = render(<Default {...Default.args} color="red" />);
    expect(getByRole('heading').parentElement.className).toMatch(
      /redFigcaption/i
    );
    expect(getByRole('heading').className).toMatch(/redCaption/i);
  });

  it('should render image-caption styles with different size', () => {
    const { getByRole } = render(<Default {...Default.args} size="large" />);
    expect(getByRole('heading').className).toMatch(/largeCaption/i);
  });
});
