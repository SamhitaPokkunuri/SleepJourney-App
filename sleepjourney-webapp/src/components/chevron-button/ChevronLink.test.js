/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render } from 'test/utils';
import { fireEvent } from '@testing-library/react';
import { Primary } from './ChevronButton.stories';

// Test Primary appearance of button
describe('Chevron Primary Link', () => {
  let windowSpy;
  beforeEach(() => {
    windowSpy = jest.spyOn(window, 'window', 'get');
  });

  afterEach(() => {
    windowSpy.mockRestore();
  });

  it('should renders chervron Link', () => {
    const onClick = jest.fn();
    const { getByRole } = render(
      <Primary
        {...Primary.args}
        href="http://vodafone.com/"
        onClick={onClick}
      />
    );
    const primaryButton = getByRole('link');
    expect(getByRole('link', { name: 'Chevron Button' }));
    expect(
      primaryButton.querySelector(
        '[data-src="/icons/global/chevron-right-circle.svg"]'
      )
    ).toBeTruthy();
    expect(primaryButton).toHaveAttribute('href', 'http://vodafone.com/');
    fireEvent.click(primaryButton);
    expect(onClick).toHaveBeenCalled();
    windowSpy.mockImplementation(() => ({
      location: {
        origin: primaryButton['href'],
      },
    }));
    expect(window.location.origin).toEqual(primaryButton['href']);
  });

  it('should make button unclickable when disabled is set to true', () => {
    const { getByRole } = render(
      <Primary {...Primary.args} href="http://vodafone.com/" disabled={true} />
    );
    const primaryButton = getByRole('link', { name: 'Chevron Button' });
    expect(primaryButton).toHaveAttribute('aria-disabled', 'true');
    expect(primaryButton).toHaveClass('Mui-disabled');
  });
});
