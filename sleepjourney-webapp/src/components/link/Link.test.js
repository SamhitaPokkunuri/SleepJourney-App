/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, fireEvent, waitFor } from 'test/utils';
import { Default } from './Link.stories';

describe('Link', () => {
  let windowSpy;
  beforeEach(() => {
    windowSpy = jest.spyOn(window, 'window', 'get');
  });

  afterEach(() => {
    windowSpy.mockRestore();
  });

  it('should render link', () => {
    const { getByRole } = render(<Default {...Default.args} />);
    expect(getByRole('link')).toHaveTextContent('Lorem Ipsum');
    expect(getByRole('link').className).toMatch(/link/i);

    const svg = getByRole('img');
    expect(svg.className).toMatch(/react-svg-icon/i);
    expect(
      svg.querySelector('[data-src="/icons/global/chevron-right-circle.svg"]')
    ).toBeTruthy();
  });

  it('should render link svg with animate true', () => {
    const { getByRole } = render(<Default {...Default.args} />);
    expect(getByRole('link').className).toMatch(/animateLink/i);
  });

  it('should render link with backgroundLink true', () => {
    const { getByRole } = render(
      <Default {...Default.args} backgroundLink={true} />
    );
    expect(getByRole('link').className).toMatch(/backgroundLink/i);
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
    expect(getByRole('link')).toHaveStyle(
      `color: #FFFFFF`,
      'background-color:rgb(230, 0, 0)'
    );
  });

  it('should fire onClick function', () => {
    const onClick = jest.fn();
    const { getByRole } = render(
      <Default {...Default.args} onClick={onClick} />
    );
    fireEvent.click(getByRole('link').attributes.href);
    waitFor(() => {
      expect(onClick).toHaveBeenCalled();
      windowSpy.mockImplementation(() => ({
        location: {
          origin: link['href'],
        },
      }));
      expect(window.location.origin).toEqual(link['href']);
    });
  });

  const icons = [
    ['ChevronRight', 'chevron-right'],
    ['PopOut', 'pop-out'],
    ['PopOutFoundation', 'pop-out-foundation'],
    ['OverlayInfo', 'overlay-info'],
  ];

  test.each(icons)(
    'should change icon when it set to new one in the same group',
    (input, expected) => {
      const { getByRole } = render(<Default {...Default.args} icon={input} />);
      const svg = getByRole('img');
      expect(
        svg.querySelector(`[data-src="/icons/global/${expected}.svg"]`)
      ).toBeTruthy();
    }
  );

  it('should render link with largeLink true', () => {
    const { getByRole } = render(<Default {...Default.args} />);
    expect(getByRole('link').className).toMatch(/largeLink/i);
  });

  it('should render link without svg true', () => {
    const { getByRole } = render(
      <Default {...Default.args} showIcon={false} />
    );
    const link = getByRole('link');
    expect(
      link.querySelector('[data-src="/icons/global/chevron-right-circle.svg"]')
    ).toBeFalsy();
  });
});
