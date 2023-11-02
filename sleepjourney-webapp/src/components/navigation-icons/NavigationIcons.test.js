/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, fireEvent, waitFor } from 'test/utils';
import { Default } from './NavigationIcons.stories';

describe('Navigation Icons', () => {
  window.scrollTo = jest.fn();

  it('should render navigation-header-icons', () => {
    const { getAllByRole } = render(<Default {...Default.args} />);
    expect(getAllByRole('button')).toHaveLength(2);
    getAllByRole('button').forEach((btn) => {
      expect(btn.className).toMatch(/iconButton/i);
    });
  });

  it('should render navigation-header countyu icon and countries collapsed-in', () => {
    const onClick = jest.fn();
    const { getAllByRole } = render(
      <Default {...Default.args} onClick={onClick} />
    );
    const country = getAllByRole('button')[0];
    expect(country.className).toMatch(/countriesButton/i);
    expect(country).toHaveTextContent('Countries');
    fireEvent.click(country);
    waitFor(() => {
      expect(onClick).toHaveBeenCalled();
      expect(document.querySelector('.MuiCollapse-entered').toBeTruthy());
    });
  });

  it('should render navigation-header-country countries popup hidden', () => {
    const onClick = jest.fn();
    const { getAllByRole } = render(
      <Default {...Default.args} onClick={onClick} />
    );
    fireEvent.click(getAllByRole('button')[0]);
    waitFor(() => {
      expect(onClick).toHaveBeenCalled();
      expect(document.querySelector('.MuiCollapse-hidden').toBeTruthy());
    });
  });

  it('should render navigation-header-search icon with globe-search popup', () => {
    const onClick = jest.fn();
    const { getAllByRole } = render(
      <Default {...Default.args} onClick={onClick} />
    );
    const search = getAllByRole('button')[1];
    expect(search.className).toMatch(/searchButton/i);
    expect(search).toHaveTextContent('Search');
    fireEvent.click(search);
    waitFor(() => {
      expect(onClick).toHaveBeenCalled();
      expect(document.querySelector('#global-search').toBeTruthy());
    });
  });
});
