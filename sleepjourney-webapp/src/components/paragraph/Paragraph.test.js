/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render } from 'test/utils';
import { Default } from './Paragraph.stories';

describe('Paragraph', () => {
  it('should render paragraph', () => {
    const { getByText } = render(<Default {...Default.args} />);
    expect(getByText(/Lorem ipsum dolor/i)).toHaveClass('MuiTypography-body1');
  });

  const textAlignment = [`inherit`, `left`, `center`, `right`, `justify`];
  test.each(textAlignment)(
    'should render paragraph with with text-align selected',
    (input) => {
      const { getByText } = render(<Default {...Default.args} align={input} />);
      expect(getByText(/Lorem ipsum dolor/i)).toHaveStyle(
        `text-align: ${input}`
      );
    }
  );

  const colors = [
    ['white', 'rgb(255, 255, 255)'],
    ['grey', 'rgb(118, 114, 100)'],
    ['darkGrey', 'rgb(51, 51, 51)'],
    ['red', 'rgb(230, 0, 0)'],
  ];
  test.each(colors)(
    'should render paragraph with selected color',
    (input, expected) => {
      const { getByText } = render(<Default {...Default.args} color={input} />);
      expect(getByText(/Lorem ipsum dolor/i)).toHaveStyle(`color: ${expected}`);
    }
  );
});
