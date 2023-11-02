/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, fireEvent } from 'test/utils';

import { Default } from './Select.stories';

describe('Select functionality', () => {
  it('should show Option 1', () => {
    const { getByRole } = render(<Default {...Default.args} />);
    expect(getByRole('button')).toHaveTextContent('Option 1');
  });
  it('should show options upon click', () => {
    const { getByRole } = render(<Default {...Default.args} />);
    fireEvent.click(getByRole('button'));
    expect(getByRole('list').children).toHaveLength(4);
  });
  it('should select correct option', () => {
    const { getByRole, getAllByRole } = render(<Default {...Default.args} />);
    fireEvent.click(getByRole('button'));
    const options = getAllByRole('listitem');
    fireEvent.click(options[3]);
    expect(getByRole('button', { name: 'Option 4' })).toBeTruthy();
  });
});
describe('Select Styling', () => {
  it('should show box shadow', () => {
    const { getByRole } = render(<Default {...Default.args} boxShadow="on" />);
    expect(getByRole('button').parentElement).toHaveClass('boxShadow');
  });
  it('should have overlay', () => {
    const { getByRole } = render(<Default {...Default.args} overlayDropdown />);
    expect(getByRole('button').nextSibling).toHaveClass('overlayDropdown');
  });

  it('should show shadow on dropdown', () => {
    const { getByRole } = render(
      <Default {...Default.args} boxShadow="active" />
    );
    fireEvent.click(getByRole('button'));
    expect(getByRole('button').parentElement).toHaveClass('boxShadow');
  });
});
