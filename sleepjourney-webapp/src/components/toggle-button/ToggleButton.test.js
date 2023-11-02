/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, fireEvent } from 'test/utils';
import { Default } from './ToggleButton.stories';

describe('Toggle Button', () => {
  it('should render toggle-button', () => {
    const { getByRole } = render(<Default {...Default.args} />);
    expect(getByRole('button')).toHaveTextContent('Toggle Button');
  });

  it('should render toggle-button active and show content', () => {
    const onClick = jest.fn();
    const { getByRole } = render(
      <Default {...Default.args} onClick={onClick} />
    );
    const button = getByRole('button', { name: 'Toggle Button' });

    fireEvent.click(button);
    expect(button.className).toMatch(/active/i);

    fireEvent.click(button);
    expect(button.classList.contains('active')).toBe(false);
  });
});
