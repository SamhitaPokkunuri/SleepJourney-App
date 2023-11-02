/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render } from 'test/utils';

import { Default } from './DateCategory.stories';

describe('Date Category', () => {
  it('should render date', () => {
    const { getByText } = render(<Default {...Default.args} />);
    expect(getByText('29-03-2022')).toBeTruthy();
  });
  it('should render category', () => {
    const { getByRole } = render(<Default {...Default.args} />);
    expect(getByRole('link')).toHaveTextContent('Inclusion');
  });
  it('should hide date', () => {
    const { queryByText } = render(
      <Default {...Default.args} showDate={false} />
    );
    expect(queryByText('29-03-2022')).toBeFalsy();
  });
  it('should hide category', () => {
    const { queryByRole } = render(
      <Default {...Default.args} showCategory={false} />
    );
    expect(queryByRole('link')).toBeFalsy();
  });
  it('should have correct href', () => {
    const { getByRole } = render(<Default {...Default.args} />);

    expect(getByRole('link')).toHaveAttribute(
      'href',
      'https://staging.vodafone.com/news/inclusion'
    );
  });
});
