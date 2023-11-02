/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render } from 'test/utils';
import { fireEvent } from '@testing-library/react';
import { Primary, Secondary, Tertiary } from './ChevronButton.stories';

// Test Primary appearance of button
describe('Chevron Button', () => {
  it('should renders chervron button', () => {
    const { getByRole } = render(<Primary {...Primary.args} />);
    const primaryButton = getByRole('button', { name: 'Chevron Button' });
    expect(primaryButton).not.toBeNull();
    expect(primaryButton.textContent).toEqual('Chevron Button');
    expect(
      primaryButton.querySelector(
        '[data-src="/icons/global/chevron-right-circle.svg"]'
      )
    ).toBeTruthy();
  });

  it('should add border when border set to true', () => {
    const { getByRole } = render(<Primary {...Primary.args} border={true} />);
    const primaryButton = getByRole('button', { name: 'Chevron Button' });
    expect(primaryButton).toHaveStyle(
      `border-top-style: solid`,
      'border-right-style: solid',
      'border-bottom-style: solid',
      'border-left-style: solid',
      'border-top-width: 2px',
      'border-right-width: 2px',
      'border-bottom-width: 2px',
      'border-left-width: 2px'
    );
  });

  it('should remove right icon when chevron set to false', () => {
    const { getByRole } = render(<Primary {...Primary.args} chevron={false} />);
    const primaryButton = getByRole('button', { name: 'Chevron Button' });
    expect(
      primaryButton.querySelector(
        '[data-src="/icons/global/chevron-right-circle.svg"]'
      )
    ).toBe(null);
  });

  it('should render colors defined in the story', () => {
    const { getByRole } = render(<Primary {...Primary.args} />);
    const primaryButton = getByRole('button', { name: 'Chevron Button' });
    expect(primaryButton).toHaveStyle(
      `color: #FFFFFF`,
      'background-color:rgb(230, 0, 0)'
    );
  });

  it('should fire onClick function', () => {
    const onClick = jest.fn();
    const { getByRole } = render(
      <Primary {...Primary.args} onClick={onClick} />
    );
    fireEvent.click(getByRole('button'));
    expect(onClick).toHaveBeenCalled();
  });

  it('should make button unclickable when disabled is set to true', () => {
    const { getByRole } = render(<Primary {...Primary.args} disabled={true} />);
    const primaryButton = getByRole('button', { name: 'Chevron Button' });
    expect(primaryButton).toHaveAttribute('disabled');
    expect(primaryButton).toHaveClass('Mui-disabled');
  });

  it('should change icon when it set to new one in the same group', () => {
    const { getByRole } = render(
      <Primary {...Primary.args} icon="PopOutFoundation" />
    );
    const primaryButton = getByRole('button', { name: 'Chevron Button' });
    expect(
      primaryButton.querySelector(
        '[data-src="/icons/global/pop-out-foundation.svg"]'
      )
    ).toBeTruthy();
  });

  it('should animation the button while hover when plusAnimate set to true', () => {
    const { getByRole } = render(
      <Primary {...Primary.args} pulseAnimate={true} />
    );
    const primaryButton = getByRole('button', { name: 'Chevron Button' });
    expect(primaryButton.className.includes('pulseButton')).toBe(true);
  });

  it('should change button layout when rounded is set to true', () => {
    const { getByRole } = render(<Primary {...Primary.args} rounded={true} />);
    const primaryButton = getByRole('button', { name: 'Chevron Button' });
    expect(primaryButton).toHaveStyle(
      'border-radius: 30px',
      'min-width: 340px'
    );
  });

  it('should change button size changed', () => {
    const { getByRole } = render(<Primary {...Primary.args} size="small" />);
    const primaryButton = getByRole('button', { name: 'Chevron Button' });
    expect(primaryButton.className.includes('buttonSizeSmall')).toBe(true);
  });
});

describe('Chevron secondary button', () => {
  it('should render white background and black text', () => {
    const { getByRole } = render(<Secondary {...Secondary.args} />);
    const secondaryButton = getByRole('button', { name: 'Chevron Button' });
    expect(secondaryButton).toHaveStyle(
      `color: rgb(51, 51, 51)`,
      'background-color:rgb(255, 255, 255)'
    );
  });
});

describe('Chevron tertiary button', () => {
  it('should render black background & white text', () => {
    const { getByRole } = render(<Tertiary {...Tertiary.args} />);
    const tertiaryButton = getByRole('button', { name: 'Chevron Button' });
    expect(tertiaryButton).toHaveStyle(
      `color: rgb(255, 255, 255)`,
      'background-color:rgb(51, 51, 51)'
    );
  });
});
