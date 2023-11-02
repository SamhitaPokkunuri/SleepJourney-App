/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, fireEvent, waitFor, within } from 'test/utils';
import { Default } from './SDGList.stories';

describe('SDG List', () => {
  let windowSpy;
  beforeEach(() => {
    windowSpy = jest.spyOn(window, 'window', 'get');
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    windowSpy.mockRestore();
  });

  it('should render sdg-list', () => {
    const { getAllByRole } = render(<Default {...Default.args} />);
    const h2 = getAllByRole('heading')[0];
    expect(h2).toHaveTextContent(
      'Explore the world of possibilities for the digital era'
    );
  });

  it('should render sdg-list cards', () => {
    render(<Default {...Default.args} />);
    const container = document.querySelector('.MuiGrid-container');
    expect(container).toHaveClass('MuiGrid-container');
    expect(container.children.length).toBe(2);
    expect(container.children[0].className).toMatch(/gridItem/i);
  });

  it('should render sdg-list cards styles', () => {
    render(<Default {...Default.args} />);
    const container = document.querySelector('.MuiGrid-container');
    const cards = within(container).getAllByRole('heading');
    cards.forEach((card) => {
      expect(card.className).toMatch(/title/i);
      expect(card.parentElement.className).toMatch(/text/i);
    });
  });

  it('should render sdg-list first card data', () => {
    const { getAllByRole, getByText } = render(<Default {...Default.args} />);
    const card = getAllByRole('heading')[1];
    const paragraph = getByText(/Together we can/i);
    expect(card).toHaveTextContent('TINALP - 5G Education');
    expect(paragraph.className).toMatch(/description/i);
    expect(paragraph).toHaveTextContent(
      /Together we can help create new ways of learning. Vodafone Italy’s Action For 5G initiative invited startups, small and medium-sized enterprises and social businesses to contribute to a project that could be developed or strengthened with Vodafone 5G technology./i
    );
  });

  it('should render sdg-list second card data', () => {
    const { getAllByRole, getByText } = render(<Default {...Default.args} />);
    const card = getAllByRole('heading')[2];
    const paragraph = getByText(/Vodafone’s IoT/i);
    expect(card).toHaveTextContent(
      'Ensure access to affordable, reliable, sustainable and modern energy for all'
    );
    expect(paragraph.className).toMatch(/description/i);
    expect(paragraph).toHaveTextContent(
      /Vodafone’s IoT solutions help governments and businesses address environmental issues and are enabling the development of connected and smart cities, helping them to run more efficiently./i
    );
  });

  it('should render sdg-list trigger cards link click', () => {
    const onClick = jest.fn();
    const { getAllByRole } = render(
      <Default {...Default.args} onClick={onClick} />
    );
    const links = getAllByRole('link');
    links.forEach((link) => {
      expect(link.className).toMatch(/link/i);
      fireEvent.click(link.attributes.href);
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
  });

  it('should render sdg-list cards without description when it turns to true', () => {
    const { queryByText } = render(
      <Default {...Default.args} hideDescription={true} />
    );
    expect(queryByText(/Together we can/i)).toBeFalsy();
    expect(queryByText(/Vodafone’s IoT/i)).toBeFalsy();
  });
});
