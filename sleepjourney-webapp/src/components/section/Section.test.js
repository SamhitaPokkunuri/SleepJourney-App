/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render } from 'test/utils';
import { Default } from './Section.stories';

describe('Section', () => {
  it('should render section', () => {
    render(<Default {...Default.args} />);
    const container = document.querySelector('#section');
    expect(container.className).toMatch(/divider/i);
    expect(container.children).toHaveLength(2);
    expect(container).toHaveStyle(`padding-bottom: 240px;`);
  });

  it('should render section text', () => {
    const { getByRole, getByText } = render(<Default {...Default.args} />);
    expect(getByRole('heading').parentElement.className).toMatch(
      /innerSection/i
    );
    expect(getByRole('heading')).toHaveTextContent(/About Us/i);
    expect(getByText(/Through /i)).toHaveTextContent(
      /Through a strategy of Connecting for Good/i
    );
  });

  it('should render section divider', () => {
    const { getByRole } = render(<Default {...Default.args} />);
    expect(getByRole('img').children[0]).toHaveAttribute(
      'd',
      'M0,210S250,30,656,30c373.46,0,578.16,126,922,126,167.74,0,342-64,342-64V0H0Z'
    );
  });
});
