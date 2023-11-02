/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render } from 'test/utils';
import { Default } from './AvailableCountries.stories';

describe('Availabel countries', () => {
  it('Should render caption', () => {
    const { getByText } = render(<Default {...Default.args} />);
    expect(getByText('Countries')).toBeTruthy();
  });
  it('Should render 3 images', () => {
    const { getByRole } = render(<Default {...Default.args} />);
    expect(getByRole('list').children).toHaveLength(3);
  });

  const altTexts = [[`france`], [`greece`], ['italy']];
  test.each(altTexts)('should align left-right', (input) => {
    const { getByAltText } = render(<Default {...Default.args} />);
    expect(getByAltText(input)).toBeTruthy();
  });
});
