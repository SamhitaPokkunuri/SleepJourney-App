/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, fireEvent, waitFor } from 'test/utils';
import { Default } from './SDGGard.stories';

describe('SDG Card', () => {
  let windowSpy;
  beforeEach(() => {
    windowSpy = jest.spyOn(window, 'window', 'get');
  });

  afterEach(() => {
    windowSpy.mockRestore();
  });

  it('should render sdg-card', () => {
    render(<Default {...Default.args} />);
    const container = document.querySelector('.MuiBox-root');
    expect(container.children).toHaveLength(2);
    expect(container.firstChild.className).toMatch(/media/i);
    expect(container.lastChild.className).toMatch(/text/i);
  });

  it('should render sdg-card text', () => {
    const { getByRole, getByText } = render(<Default {...Default.args} />);
    const paragraph = getByText(/Together we can/i);
    expect(getByRole('heading')).toHaveTextContent('TINALP - 5G Education');
    expect(paragraph.className).toMatch(/description/i);
    expect(paragraph).toHaveTextContent(
      /Together we can help create new ways of learning. Vodafone Italy’s Action For 5G initiative invited startups, small and medium-sized enterprises and social businesses to contribute to a project that could be developed or strengthened with Vodafone 5G technology./i
    );
  });

  it('should render sdg-card link', () => {
    const onClick = jest.fn();
    const { getByRole } = render(
      <Default {...Default.args} onClick={onClick} />
    );
    const link = getByRole('link', { name: 'TINALP - 5G Education' });
    expect(link).toHaveAttribute(
      'href',
      'https://www.vodafone.com/mobile-world-congress-2021/tinalp-5g-education'
    );
    fireEvent.click(link);
    waitFor(() => {
      expect(onClick).toHaveBeenCalled();
      windowSpy.mockImplementation(() => ({
        location: {
          origin: link['href'],
        },
      }));
      expect(window.location.origin).toEqual(link['href'], '_blank');
    });
  });

  it('should render sdg-card icon when chevron is true', () => {
    const { getByRole } = render(<Default {...Default.args} chevron={true} />);
    const svg = getByRole('img');
    expect(svg.parentElement.className).toMatch('endIcon');
    expect(
      svg.querySelector(`[data-src="/icons/global/chevron-right-circle.svg"]`)
    ).toBeTruthy();
  });

  it('should render sdg-card without description when it turns to true', () => {
    const { queryByText } = render(
      <Default {...Default.args} hideDescription={true} />
    );
    expect(queryByText(/Together we can/i)).toBeFalsy();
  });
});
