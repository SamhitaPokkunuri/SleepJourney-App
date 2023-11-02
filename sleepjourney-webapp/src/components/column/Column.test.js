/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render } from 'test/utils';
import { Default } from './Column.stories';

describe('Column', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('should render Column', () => {
    const { getByRole } = render(<Default {...Default.args} />);
    expect(getByRole('gridcell')).toHaveClass('MuiGrid-grid-xs-12');
  });

  const columnCount = [
    [1, 'MuiGrid-grid-sm-12'],
    [2, 'MuiGrid-grid-sm-6'],
    [3, 'MuiGrid-grid-sm-4'],
    [4, 'MuiGrid-grid-sm-3'],
    [5, 'MuiGrid-grid-sm-2'],
    [9, 'MuiGrid-grid-sm-1'],
  ];
  test.each(columnCount)(
    'should render The number of columns based on count.',
    (input, expected) => {
      const { getByRole } = render(
        <Default {...Default.args} columnCount={input} />
      );
      expect(getByRole('gridcell').className).toMatch(expected);
    }
  );

  it('should render column with no-margin if it turns to false', () => {
    const { getByRole } = render(
      <Default {...Default.args} marginBottom={false} />
    );
    expect(getByRole('gridcell')).not.toHaveStyle(`margin-bottom: 30px`);
  });

  const order = [1, 2, 3];
  test.each(order)('should render column with diffrent order', (input) => {
    const { getByRole } = render(<Default {...Default.args} order={input} />);
    expect(getByRole('gridcell')).toHaveStyle(`order:${input}`);
  });

  const verticalAlignment = [
    ['top', 'flex-start'],
    ['center', 'center'],
    ['bottom', 'flex-end'],
  ];
  test.each(verticalAlignment)(
    'should render column with self-align property',
    (input, expected) => {
      const { getByRole } = render(
        <Default {...Default.args} verticalAlignment={input} />
      );
      expect(getByRole('gridcell')).toHaveStyle(`align-self:${expected}`);
    }
  );

  it('should render column with diffrent width', () => {
    const { getByRole } = render(<Default {...Default.args} width={70} />);
    expect(getByRole('gridcell')).toHaveClass('MuiGrid-grid-sm-8');
  });
});
