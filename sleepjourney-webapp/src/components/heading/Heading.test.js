/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render } from 'test/utils';
import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  HeadingLink,
} from './Heading.stories';

describe('H1 Heading', () => {
  it('should render H1', () => {
    const { getByRole } = render(<Heading1 {...Heading1.args} />);
    expect(getByRole('heading').className).toMatch(/.MuiTypography-h1/i);
  });

  const textAlignment = [`inherit`, `left`, `center`, `right`, `justify`];
  test.each(textAlignment)('should render H1 with selected align', (input) => {
    const { getByRole } = render(<Heading1 {...Heading1.args} align={input} />);
    expect(getByRole('heading')).toHaveStyle(`text-align: ${input}`);
  });

  const colors = [
    ['white', 'rgb(255, 255, 255)'],
    ['grey', 'rgb(118, 114, 100)'],
    ['darkGrey', 'rgb(51, 51, 51)'],
    ['red', 'rgb(230, 0, 0)'],
  ];
  test.each(colors)(
    'should render H1 with selected color',
    (input, expected) => {
      const { getByRole } = render(
        <Heading1 {...Heading1.args} color={input} />
      );
      expect(getByRole('heading')).toHaveStyle(`color: ${expected}`);
    }
  );

  const fontWeight = [
    ['thin', 'thinFontWeight'],
    ['mixed', 'mixedFontWeight'],
  ];

  test.each(fontWeight)(
    'should render H1 with selected font-weight',
    (input, expected) => {
      const { getByRole } = render(
        <Heading1 {...Heading1.args} fontWeight={input} />
      );
      expect(getByRole('heading').className).toMatch(expected);
    }
  );
});

describe('other Heading', () => {
  it('should render H2', () => {
    const { getByRole } = render(<Heading2 {...Heading2.args} />);
    expect(getByRole('heading').className).toMatch(/.MuiTypography-h2/i);
  });

  it('should render H3', () => {
    const { getByRole } = render(<Heading3 {...Heading3.args} />);
    expect(getByRole('heading').className).toMatch(/.MuiTypography-h3/i);
  });

  it('should render H4', () => {
    const { getByRole } = render(<Heading4 {...Heading4.args} />);
    expect(getByRole('heading').className).toMatch(/.MuiTypography-h4/i);
  });

  it('should render H5', () => {
    const { getByRole } = render(<Heading5 {...Heading5.args} />);
    expect(getByRole('heading').className).toMatch(/.MuiTypography-h5/i);
  });

  it('should render H6', () => {
    const { getByRole } = render(<Heading6 {...Heading6.args} />);
    expect(getByRole('heading').className).toMatch(/.MuiTypography-h6/i);
  });
});

describe('Heading Link', () => {
  it('should render Heading Link', () => {
    const { getByRole } = render(<HeadingLink {...HeadingLink.args} />);
    const link = getByRole('link');
    expect(getByRole('heading').className).toMatch(/.MuiTypography-h4/i);
    expect(
      link.querySelector('[data-src="/icons/global/chevron-right-circle.svg"]')
    ).toBeTruthy();
    expect(link.textContent).toMatch(/The quick brown /i);
    expect(getByRole('link')).toHaveAttribute('href', '/');
  });
});
