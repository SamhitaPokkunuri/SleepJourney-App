/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render } from 'test/utils';
import { Default } from './Image.stories';

describe('image styles', () => {
  it('should render image', () => {
    const { getByRole } = render(<Default {...Default.args} />);
    expect(getByRole('img')).toBeInTheDocument();
  });
  it('should render alt text', () => {
    const { getByRole } = render(<Default {...Default.args} />);
    expect(getByRole('img')).toHaveAttribute('alt', 'leshoto');
  });

  it('should align center', () => {
    const { container } = render(<Default {...Default.args} />);
    expect(container.querySelector('.MuiBox-root')).toHaveStyle(
      'margin-left:auto',
      'margin-right:auto'
    );
  });

  const alignments = [
    [`right`, `margin-left: auto`],
    [`left`, `margin-right: auto`],
  ];
  test.each(alignments)('should align left-right', (input, expected) => {
    const { container } = render(<Default {...Default.args} align={input} />);
    expect(container.querySelector('.MuiBox-root')).toHaveStyle(expected);
  });

  const styles = [
    [`is-style-rounded`, `imageStyleRounded`],
    [`is-style-square`, `imageStyleSquare`],
  ];
  test.each(styles)('should change style', (input, expected) => {
    const { getByRole } = render(
      <Default {...Default.args} className={input} />
    );
    expect(getByRole('link').firstElementChild.className).toMatch(
      new RegExp(expected, 'i')
    );
  });

  it('shouldnt render border', () => {
    const { getByRole } = render(<Default {...Default.args} />);
    expect(getByRole('link').firstElementChild.className).not.toMatch(
      /imageStyleBorder/i
    );
  });
  it('should render border', () => {
    const { getByRole } = render(
      <Default {...Default.args} hasBorder={true} />
    );
    expect(getByRole('link').firstElementChild.className).toMatch(
      /imageStyleBorder/i
    );
  });

  const sizes = [
    [`small`, `width: 60%`, `max-width: 240px`],
    [`medium`, `width: 80%`, `max-width: 460px`],
    [`large`, `width: 95%`, `max-width: 590px`],
  ];
  test.each(sizes)(
    'should change image size',
    (input, firstRule, secondRule) => {
      const { container } = render(
        <Default {...Default.args} mediaSize={input} />
      );
      expect(container.querySelector('.MuiBox-root')).toHaveStyle(
        firstRule,
        secondRule
      );
    }
  );
});

describe('Margins', () => {
  it('shouldnt render bottom margin', () => {
    const { container } = render(<Default {...Default.args} />);
    expect(container.querySelector('.MuiBox-root')).not.toHaveStyle(
      'margin-bottom: 30px'
    );
  });
  it('shouldnt render top margin', () => {
    const { container } = render(<Default {...Default.args} />);
    expect(container.querySelector('.MuiBox-root')).not.toHaveStyle(
      'margin-top: 30px'
    );
  });

  it('should render bottom margin', () => {
    const { container } = render(
      <Default {...Default.args} marginBottom={true} />
    );
    expect(container.querySelector('.MuiBox-root')).toHaveStyle(
      'margin-bottom: 30px'
    );
  });
  it('should render top margin', () => {
    const { container } = render(
      <Default {...Default.args} marginTop={true} />
    );
    expect(container.querySelector('.MuiBox-root')).toHaveStyle(
      'margin-top: 30px'
    );
  });
});
describe('Navigation', () => {
  let windowSpy;
  beforeEach(() => {
    windowSpy = jest.spyOn(window, 'window', 'get');
  });

  afterEach(() => {
    windowSpy.mockRestore();
  });
  it('should navigate to correct page', () => {
    const { queryByRole } = render(<Default {...Default.args} />);

    const link = queryByRole('link');

    expect(link).toHaveAttribute(
      'href',
      'https://www.vodafone.com/news/viewpoint/vodafone-plays-part-respecting-human-rights'
    );
    // let windowSpy = jest.spyOn(window, 'window', 'get');

    windowSpy.mockImplementation(() => ({
      location: {
        origin: link['href'],
      },
    }));

    expect(window.location.origin).toEqual(
      'https://www.vodafone.com/news/viewpoint/vodafone-plays-part-respecting-human-rights',
      '_blank'
    );
  });
});
