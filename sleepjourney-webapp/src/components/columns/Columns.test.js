/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render } from 'test/utils';
import { Default } from './Columns.stories';

describe('Columns', () => {
  it('should render Columns', () => {
    const { getByRole } = render(<Default {...Default.args} />);
    expect(getByRole('grid')).toHaveClass('MuiGrid-container');
    expect(getByRole('grid').children).toHaveLength(2);
  });

  const verticalAlignment = [
    ['top', 'flex-start'],
    ['center', 'center'],
    ['bottom', 'flex-end'],
  ];
  test.each(verticalAlignment)(
    'should render Columns with align-items property selected',
    (input, expected) => {
      const { getByRole } = render(
        <Default {...Default.args} verticalAlignment={input} />
      );
      expect(getByRole('grid')).toHaveStyle(`align-items: ${expected}`);
    }
  );

  const spacing = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  test.each(spacing)('should render Columns with diffrent spacing', (input) => {
    const { getByRole } = render(<Default {...Default.args} spacing={input} />);
    expect(getByRole('grid')).toHaveClass(`MuiGrid-spacing-md-${input}`);
  });
});
