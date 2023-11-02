/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render } from 'test/utils';
import { Default } from './EndTextIcon.stories';

describe('EndTextIcon', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('should render end-text-icon', () => {
    const { getByText, getByRole } = render(<Default {...Default.args} />);
    expect(getByText(/End/i)).toHaveTextContent(/EndTextIcon/i);
    expect(getByRole('img').className).toMatch(/icon/i);
    expect(
      getByRole('img').querySelector(
        '[data-src="/icons/global/chevron-right-circle.svg"]'
      )
    ).toBeTruthy();
  });

  const globalIcons = [
    'chevron-right',
    'chevron-right-circle',
    'pop-out',
    'pop-out-circle',
    'pop-out-foundation',
    'pop-out-foundation-circle',
    'overlay-info',
    'overlay-info-circle',
  ];

  test.each(globalIcons)(
    'should change icon within the same group',
    (input) => {
      const { getByRole } = render(<Default {...Default.args} icon={input} />);
      expect(
        getByRole('img').querySelector(
          `[data-src="/icons/global/${input}.svg"]`
        )
      ).toBeTruthy();
    }
  );
});
