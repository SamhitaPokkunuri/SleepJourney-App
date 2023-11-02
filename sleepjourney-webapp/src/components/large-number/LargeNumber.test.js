/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, waitFor } from 'test/utils';
import { Default } from './LagreNumber.stories';

describe('Large Number', () => {
  it('should render large-number', () => {
    const { getByRole } = render(<Default {...Default.args} />);
    expect(getByRole('heading')).toHaveTextContent('123...');
    expect(getByRole('heading')).toHaveClass('MuiTypography-h3');
    expect(getByRole('heading').className).toMatch(/root/i);
  });

  it('should render large-number with different size', () => {
    const { getByRole } = render(
      <Default {...Default.args} numberSize="260" />
    );
    expect(getByRole('heading').className).toMatch(/fontSizeLarge/i);
  });

  const colors = [
    [`#e60000`, `vodafonered`],
    [`#33333`, `darkgrey`],
    [`#FFFFFF`, `white`],
  ];
  test.each(colors)(
    'should render large-number with different color',
    (input, expected) => {
      const { getByRole } = render(
        <Default
          {...Default.args}
          customColors={{
            background: '',
            text: input,
          }}
        />
      );
      waitFor(() =>
        expect(getByRole('heading')).toHaveClass(`vdf-text-${expected}`)
      );
    }
  );

  it('should render large-number with different text-align', () => {
    const { getByRole } = render(<Default {...Default.args} align="left" />);
    expect(getByRole('heading')).toHaveStyle(`text-align: left;`);
  });
});
