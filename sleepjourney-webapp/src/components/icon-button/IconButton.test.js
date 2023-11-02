/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render } from 'test/utils';
import { fireEvent } from '@testing-library/react';
import { Default } from './IconButton.stories';

// Test icon Button
describe('Icon Button', () => {
  it('should renders icon button', () => {
    const { getByRole } = render(<Default {...Default.args} />);
    const defaultButton = getByRole('button');
    expect(getByRole('button', { name: 'Icon Button' }));
    expect(
      defaultButton.querySelector(
        '[data-src="/icons/global/chevron-right-circle.svg"]'
      )
    ).toBeTruthy();
    expect(
      defaultButton.querySelector('[data-src="/icons/global/swipe-across.svg"]')
    ).toBeTruthy();
  });

  it('should remove right icon when chevron set to false', () => {
    const { getByRole } = render(<Default {...Default.args} chevron={false} />);
    const defaultButton = getByRole('button');
    expect(
      defaultButton.querySelector(
        '[data-src="/icons/global/chevron-right-circle.svg"]'
      )
    ).toBe(null);
  });

  it('should change button background and text when customColor changed', () => {
    const { getByRole } = render(
      <Default
        {...Default.args}
        customColors={{
          background: 'rgb(230, 0, 0)',
          text: '#FFFFFF',
        }}
      />
    );
    const defaultButton = getByRole('button');
    expect(defaultButton).toHaveStyle(
      `color: #FFFFFF`,
      'background-color:rgb(230, 0, 0)'
    );
  });

  it('should change icon when it set to new one in the same group', () => {
    const { getByRole } = render(
      <Default {...Default.args} icon="PopOutFoundation" />
    );
    const defaultButton = getByRole('button');
    expect(
      defaultButton.querySelector(
        '[data-src="/icons/global/pop-out-foundation.svg"]'
      )
    ).toBeTruthy();
  });

  it('should fire onClick function', () => {
    const onClick = jest.fn();
    const { getByRole } = render(
      <Default {...Default.args} onClick={onClick} />
    );
    fireEvent.click(getByRole('button'));
    expect(onClick).toHaveBeenCalled();
  });

  it('should change icon when it set to new one with new group', () => {
    const { getByRole } = render(
      <Default {...Default.args} iconSet="group" icon="Heart" />
    );
    const defaultButton = getByRole('button');
    expect(
      defaultButton.querySelector('[data-src="/icons/group/heart.svg"]')
    ).toBeTruthy();
  });

  it('should add border when outline set to true', () => {
    const { getByRole } = render(<Default {...Default.args} outline={true} />);
    const defaultButton = getByRole('button');
    expect(defaultButton).toHaveStyle(
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
});
