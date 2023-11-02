/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, fireEvent } from 'test/utils';
import { Default } from './Checkbox.stories';

describe('Checkbox', () => {
  it('should render first checkbox checked', () => {
    const { getByRole } = render(<Default {...Default.args} />);
    expect(getByRole('checkbox', { name: 'first' })).toHaveProperty('checked');
    expect(document.querySelector('.MuiButtonBase-root')).toHaveClass(
      'Mui-checked'
    );
  });

  it('should render all checkbox with correct data', () => {
    const { getAllByRole } = render(<Default {...Default.args} />);
    expect(getAllByRole('checkbox')).toHaveLength(4);
    getAllByRole('checkbox').forEach((checkbox) => {
      expect(checkbox).toHaveProperty('name', checkbox.name);
    });
  });

  it('should render toggle second checkbox', () => {
    const { getByRole } = render(<Default {...Default.args} />);
    const checkbox = getByRole('checkbox', { name: 'second' });

    fireEvent.click(checkbox);
    checkbox.setAttribute('checked', true);
    expect(checkbox).toHaveProperty('checked');

    fireEvent.click(checkbox);
    checkbox.removeAttribute('checked');
  });

  it('should render all checkbox checked when clicked', () => {
    const { getAllByRole } = render(<Default {...Default.args} />);
    const checkboxList = getAllByRole('checkbox');
    checkboxList.forEach((checkbox) => {
      fireEvent.click(checkbox);
      checkbox.setAttribute('checked', true);
      expect(checkbox).toHaveProperty('checked');
    });
  });
});
