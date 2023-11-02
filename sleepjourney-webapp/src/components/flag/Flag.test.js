/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render } from 'test/utils';
import { Default } from './Flag.stories';

describe('Flag', () => {
  it('should render flag ', () => {
    const { getByRole } = render(<Default {...Default.args} />);
    expect(getByRole('img')).toBeInTheDocument();
  });

  const codes = [
    ['au', 1],
    ['cd', 2],
    ['cz', 3],
    ['de', 4],
    ['eg', 5],
  ];

  test.each(codes)('should render different flag each time', (input, index) => {
    const { getByRole } = render(<Default {...Default.args} code={input} />);
    expect(getByRole('img')).toHaveStyle(
      `background-position-y: ${index * -18}px`
    );
  });
});
