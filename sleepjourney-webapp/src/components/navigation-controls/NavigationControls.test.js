/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, fireEvent, waitFor } from 'test/utils';
import { Default } from './NavigationControls.stories';

describe('Navigation Controls', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('should render navigation-controls', () => {
    const { getAllByRole } = render(<Default {...Default.args} />);
    expect(getAllByRole('button')).toHaveLength(2);
  });

  it('should render navigation-controls back button', () => {
    const { getAllByRole } = render(<Default {...Default.args} />);
    const backButon = getAllByRole('button')[0];
    expect(backButon.className).toMatch(/backButton/i);
    expect(backButon).toHaveTextContent('Back');
  });

  it('should render navigation-controls exit button', () => {
    const onClick = jest.fn();
    const { getAllByRole } = render(
      <Default {...Default.args} onClick={onClick} />
    );
    const exitButon = getAllByRole('button')[1];
    expect(exitButon.className).toMatch(/exitButton/i);
    expect(exitButon).toHaveTextContent('Exit');
    fireEvent.click(exitButon);
    waitFor(() => expect(onClick).toHaveBeenCalled());
  });
});
