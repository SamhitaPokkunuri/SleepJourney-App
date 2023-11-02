/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, fireEvent, waitFor } from 'test/utils';
import { Default } from './Header.stories';

jest.mock('next/router', () => ({
  useRouter: () => ({
    query: { myProp: 'path' },
  }),
}));

describe('Header', () => {
  let windowSpy;
  window.scrollTo = jest.fn();
  beforeEach(() => {
    windowSpy = jest.spyOn(window, 'window', 'get');
    jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    windowSpy.mockRestore();
  });

  it('should render header', () => {
    const { getByRole } = render(<Default {...Default.args} />);
    expect(getByRole('banner')).toBeInTheDocument();
  });

  it('should render header-logo', () => {
    const onClick = jest.fn();
    const { getByRole } = render(
      <Default {...Default.args} onClick={onClick} />
    );
    const link = getByRole('link', { link: true });
    expect(link).toHaveAttribute('href', '/');
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

  it('should render header-icons', () => {
    const { getAllByRole } = render(<Default {...Default.args} />);
    expect(getAllByRole('button')).toHaveLength(2);
    getAllByRole('button').forEach((btn) => {
      expect(btn.className).toMatch(/iconButton/i);
    });
  });

  it('should render header countries toggled', () => {
    const onClick = jest.fn();
    const { getAllByRole } = render(
      <Default {...Default.args} onClick={onClick} />
    );

    expect(getAllByRole('button')[0].className).toMatch(/countriesButton/i);
    fireEvent.click(getAllByRole('button')[0]);
    waitFor(() => {
      expect(onClick).toHaveBeenCalled();
      expect(document.querySelector('.MuiCollapse-entered').toBeTruthy());
    });

    fireEvent.click(getAllByRole('button')[0]);
    waitFor(() => {
      expect(onClick).toHaveBeenCalled();
      expect(document.querySelector('.MuiCollapse-hidden').toBeTruthy());
    });
  });

  it('should render header globe-search popup toggled', () => {
    const onClick = jest.fn();
    const { getAllByRole } = render(
      <Default {...Default.args} onClick={onClick} />
    );
    expect(getAllByRole('button')[1].className).toMatch(/searchButton/i);
    fireEvent.click(getAllByRole('button')[1]);
    waitFor(() => {
      expect(onClick).toHaveBeenCalled();
      expect(document.querySelector('#global-search').toBeTruthy());
    });

    fireEvent.click(getAllByRole('button')[1]);
    waitFor(() => {
      expect(onClick).toHaveBeenCalled();
      expect(document.querySelector('#global-search').not.toBeInTheDocument());
    });
  });
});
