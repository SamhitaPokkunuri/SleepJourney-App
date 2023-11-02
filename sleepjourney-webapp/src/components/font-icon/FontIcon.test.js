/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render } from 'test/utils';
import { Default } from './FontIcon.stories';

describe('FontIcon', () => {
  it('should render fonticon', () => {
    const { getByRole } = render(<Default {...Default.args} />);
    expect(getByRole('img')).toBeTruthy();
    expect(getByRole('img')).toBeVisible();
  });

  const colors = [
    ['white', 'color: rgb(255, 255, 255)'],
    ['shadeGrey', 'color: rgb(244, 244, 244)'],
    ['lightGrey', 'color: rgb(235, 235, 235)'],
    ['gainsboro', 'color: rgb(216, 216, 216)'],
    ['silver', 'color: rgb(204, 204, 204)'],
    ['mediumGrey', 'color: rgb(178, 178, 178)'],
    ['spanishGrey', 'color: rgb(153, 153, 153)'],
    ['grey', 'color: rgb(118, 114, 100)'],
    ['dimGrey', 'color: rgb(102, 102, 102)'],
    ['darkGrey', 'color:rgb(51, 51, 51)'],
    ['black', 'color: rgb(0, 0, 0)'],
  ];

  test.each(colors)('should change color of fonticon', (input, expected) => {
    const { getByRole } = render(<Default {...Default.args} color={input} />);
    expect(getByRole('img')).toHaveStyle(expected);
  });

  const fontSizes = [
    ['inherit', 'font-size: 2rem'],
    ['default', 'font-size: 2rem'],
    ['small', 'font-size: 1.5rem'],
    ['large', 'font-size: 2.5rem;'],
  ];

  test.each(fontSizes)(
    'should change font-size of fonticon',
    (input, expected) => {
      const { getByRole } = render(
        <Default {...Default.args} fontSize={input} />
      );
      expect(getByRole('img')).toHaveStyle(expected);
    }
  );

  const icons = [
    'close',
    'globe',
    'hamburger',
    'search',
    'download',
    'popOut',
    'tick',
  ];

  test.each(icons)('should change icon', (input) => {
    const { getByRole } = render(<Default {...Default.args} icon={input} />);
    expect(getByRole('img')).toBeTruthy();
    expect(getByRole('img')).toBeVisible();
  });

  it('should sets a pointer cursor on hover', () => {
    const { getByRole } = render(<Default {...Default.args} pointer={true} />);
    expect(getByRole('img')).toHaveStyle('cursor: pointer;');
  });
});
