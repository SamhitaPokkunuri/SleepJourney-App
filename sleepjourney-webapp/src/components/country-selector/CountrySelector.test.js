/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, within, fireEvent, waitFor } from 'test/utils';
import { Default } from './CountrySelector.stories';

describe('Country Selector', () => {
  let windowSpy;
  beforeEach(() => {
    windowSpy = jest.spyOn(window, 'window', 'get');
  });

  afterEach(() => {
    windowSpy.mockRestore();
  });
  it('should render country-selector collapsed-in', () => {
    const { getByRole } = render(<Default {...Default.args} />);
    const container = document.querySelector('.MuiCollapse-root');
    const button = getByRole('button', { name: /Close Country/i });
    expect(container.parentElement).toHaveStyle(
      `color: #ffffff; background: #333333;`
    );
    expect(container).toHaveClass('MuiCollapse-entered');
    expect(button.parentElement.className).toMatch(/countrySelectorContainer/i);
    expect(button.className).toMatch(/closeButton/i);
  });

  it('should render country-selector h3 styles', () => {
    const { getAllByRole } = render(<Default {...Default.args} />);
    const h3 = getAllByRole('heading')[0];
    expect(h3.parentElement.className).toMatch(/countrySelectorInner/i);
    expect(h3.textContent).toEqual(
      'Are you looking for information about offers, devices or your account?'
    );
    expect(h3.parentElement).toHaveTextContent(
      'Please choose your local Vodafone website'
    );
  });

  it('should render country-selector h4 styles', () => {
    const { getAllByRole } = render(<Default {...Default.args} />);
    expect(getAllByRole('heading')).toHaveLength(4);
    const expand = document.querySelector('.expanded');
    expect(expand.parentElement.className).toMatch(/regionContainer/i);
    const heading = within(expand).getAllByRole('heading');
    heading.forEach((col) => {
      expect(col.className).toMatch(/regionTitle/i);
      expect(col.textContent).not.toBeNull();
    });
  });

  it('should render country-selector list styles', () => {
    const { getAllByRole } = render(<Default {...Default.args} />);
    expect(getAllByRole('list')).toHaveLength(3);
    expect(getAllByRole('listitem')).toHaveLength(27);
    getAllByRole('list').forEach((col) => {
      expect(col.parentElement).toHaveClass('MuiCollapse-wrapperInner');
      expect(col.className).toMatch(/countryList/i);
    });
  });

  it('should render country-selector list-item', () => {
    const { getAllByRole } = render(<Default {...Default.args} />);
    getAllByRole('listitem').forEach((li) => {
      expect(li.parentElement.className).toMatch(/countryList/i);
      expect(li.className).toMatch(/countryListItem/i);
    });
  });

  it('should render country-selector list-item links', () => {
    const onClick = jest.fn();
    const { getAllByRole } = render(
      <Default {...Default.args} onClick={onClick} />
    );
    getAllByRole('link').forEach((link) => {
      expect(link).toHaveAttribute(`href`);
      fireEvent.click(link);
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

  it('should render country-selector collapsed-out', () => {
    const onClick = jest.fn();
    const { getByRole } = render(
      <Default {...Default.args} onClick={onClick} />
    );
    const link = getByRole('button', { name: /stay on/i });
    const collapse = document.querySelector('.MuiCollapse-root');
    expect(link).toHaveTextContent('No thanks, I want to stay on Vodafone.');
    fireEvent.click(link);
    waitFor(() => {
      expect(onClick).toHaveBeenCalled();
      expect(collapse).toHaveStyle(
        `min-height: 0px`,
        `height: 0px`,
        `transition-duration: 500ms;`
      );
      expect(collapse).toHaveClass('MuiCollapse-hidden');
    });
  });
});
