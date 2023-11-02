/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render } from 'test/utils';
import { fireEvent } from '@testing-library/react';
import { Default } from './TextField.stories';

describe('TextField', () => {
  it('should render text-field with standards', () => {
    const { getByRole } = render(<Default {...Default.args} />);
    const input = getByRole('textbox');
    expect(getByRole('textbox', { placeholder: /Start typing here.../i }));
    expect(input.parentElement).toHaveStyle(`border-radius:6px`);
  });

  const borders = [
    [`tr`, `border-top-right-radius: 0`],
    [`br`, `border-bottom-right-radius: 0`],
    [`bl`, `border-bottom-left-radius: 0`],
    [`tl`, `border-top-left-radius: 0`],
  ];

  test.each(borders)(
    'should render text-field with corners collapsed',
    (input, expected) => {
      const { getByRole } = render(
        <Default {...Default.args} collapseBorders={[input]} />
      );
      expect(getByRole('textbox').parentElement).toHaveStyle(expected);
    }
  );

  it('should add text-field value', () => {
    const { getByRole } = render(
      <Default {...Default.args} value="Text-field testing" />
    );
    expect(getByRole('textbox').value).toEqual('Text-field testing');
    const span = document.querySelector('#closeIcon');
    expect(span).toBeInTheDocument();
  });

  it('should clear text-field value if x button clicked', () => {
    const onClear = jest.fn();
    const { getByRole } = render(
      <Default {...Default.args} value="Text-field testing" onClick={onClear} />
    );
    const span = document.querySelector('#closeIcon');
    fireEvent.click(span);
    expect(getByRole('textbox').value).toEqual('');
    expect(span).not.toBeInTheDocument();
    expect(onClear).toHaveBeenCalled();
  });
});
