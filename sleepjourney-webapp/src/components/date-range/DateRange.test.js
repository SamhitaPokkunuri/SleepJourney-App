/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, fireEvent } from 'test/utils';

import { Default } from './DateRange.stories';

describe('DateRange', () => {
  it('should render label', () => {
    const { getByText } = render(<Default {...Default.args} />);

    expect(getByText('Date Range Selector')).toHaveTextContent(
      /Date Range Selector/i
    );
  });

  it('should render month list', () => {
    const { getByRole } = render(<Default {...Default.args} />);
    fireEvent.click(getByRole('button', { name: 'Month' }));

    expect(getByRole('list').children).toHaveLength(13);
  });

  it('should render years list', () => {
    const { getByRole } = render(<Default {...Default.args} />);
    fireEvent.click(getByRole('button', { name: 'Year' }));
    const currentYear = new Date().getFullYear();

    expect(getByRole('list').children.length).toEqual(currentYear - 2020 + 2);
  });
  it('should start from year 2020', () => {
    const { getByRole } = render(<Default {...Default.args} />);
    fireEvent.click(getByRole('button', { name: 'Year' }));

    expect(getByRole('list').children[1]).toHaveTextContent('2020');
  });

  it('should render passed month', () => {
    const { getByRole } = render(
      <Default
        {...Default.args}
        month={{ id: 10, name: 'October', value: 'october' }}
      />
    );
    expect(getByRole('button', { name: 'October' })).toBeTruthy();
  });

  it('should render passed year', () => {
    const { getByRole } = render(
      <Default
        {...Default.args}
        year={{ id: 2019, name: '2019', value: '2019' }}
      />
    );
    expect(getByRole('button', { name: '2019' })).toBeTruthy();
  });

  it('should pick clicked month', () => {
    const { getByRole, getAllByRole } = render(<Default {...Default.args} />);
    fireEvent.click(getByRole('button', { name: 'Month' }));

    const monthRange = getAllByRole('listitem');
    fireEvent.click(monthRange[4]);

    expect(getByRole('button', { name: 'April' })).toBeTruthy();
  });
  it('should pick clicked year', () => {
    const { getByRole, getAllByRole } = render(<Default {...Default.args} />);
    fireEvent.click(getByRole('button', { name: 'Year' }));

    const yearRange = getAllByRole('listitem');
    fireEvent.click(yearRange[2]);

    expect(getByRole('button', { name: '2021' })).toBeTruthy();
  });
});
