/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render } from 'test/utils';
import { fireEvent } from '@testing-library/react';
import { Default } from './Button.stories';

// Test default appearance of button
describe('Default Button', () => {
  let windowSpy;
  beforeEach(() => {
    windowSpy = jest.spyOn(window, 'window', 'get');
  });

  afterEach(() => {
    windowSpy.mockRestore();
  });

  it('should renders primary button', () => {
    const { getByRole } = render(<Default {...Default.args} />);
    const defaultButton = getByRole('link');
    expect(getByRole('link', { name: 'Button' }));
    expect(
      defaultButton.querySelector(
        '[data-src="/icons/global/chevron-right-circle.svg"]'
      )
    ).toBeTruthy();
  });

  it('should render button custom color', () => {
    const { getByRole } = render(<Default {...Default.args} />);
    const defaultButton = getByRole('link');
    expect(defaultButton.parentElement).toHaveStyle(`color: rgb(0, 0, 0)`);
  });

  it('should fire onClick function', () => {
    const onClick = jest.fn();
    const { getByRole } = render(<Default {...Default.args} />);
    getByRole('link').addEventListener('click', onClick, false);
    fireEvent.click(getByRole('link'));
    expect(onClick).toHaveBeenCalled();
  });

  it('should open url when button clicked', () => {
    const { getByRole } = render(<Default {...Default.args} />);
    const defaultButton = getByRole('link');
    expect(defaultButton).toHaveAttribute('href', 'http://vodafone.com/');
    windowSpy.mockImplementation(() => ({
      location: {
        origin: defaultButton['href'],
      },
    }));
    expect(window.location.origin).toEqual(defaultButton['href']);
  });

  it('should open url in new tab when target set to _blank', () => {
    const { getByRole } = render(
      <Default {...Default.args} linkTarget="_blank" />
    );
    const defaultButton = getByRole('link');
    expect(defaultButton).toHaveAttribute('target', '_blank');
    expect(
      defaultButton.querySelector(
        '[data-src="/icons/global/pop-out-circle.svg"]'
      )
    ).toBeTruthy();
    windowSpy.mockImplementation(() => ({
      location: {
        origin: defaultButton['href'],
      },
    }));
    expect(window.location.origin).toEqual(defaultButton['href'], '_blank');
  });

  it('should open url in overlay page when openAsOverlay is true', () => {
    const { getByRole } = render(
      <Default {...Default.args} openAsOverlay={true} url="/hadeer/overlay" />
    );
    const defaultButton = getByRole('link');
    windowSpy.mockImplementation(() => ({
      location: {
        origin: defaultButton['href'],
      },
    }));
    expect(window.location.origin).toEqual(defaultButton['href']);
  });
});
