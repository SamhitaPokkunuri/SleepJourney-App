/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render } from 'test/utils';
import { fireEvent } from '@testing-library/react';
import { Default } from './IconButton.stories';

// Test icon button when href is true
describe('Icon Button Link', () => {
  let windowSpy;
  beforeEach(() => {
    windowSpy = jest.spyOn(window, 'window', 'get');
  });

  afterEach(() => {
    windowSpy.mockRestore();
  });

  it('should renders icon link when href set to true and open url', () => {
    const onClick = jest.fn();
    const { getByRole } = render(
      <Default
        {...Default.args}
        href="http://vodafone.com/"
        onClick={onClick}
      />
    );
    const button = getByRole('link', { name: 'Icon Button' });
    expect(button);
    expect(button).toHaveAttribute('href', 'http://vodafone.com/');
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalled();
    windowSpy.mockImplementation(() => ({
      location: {
        origin: button['href'],
      },
    }));
    expect(window.location.origin).toEqual(button['href']);
  });
});
