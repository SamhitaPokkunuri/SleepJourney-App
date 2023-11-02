/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, fireEvent, waitFor } from 'test/utils';
import { Default } from './Breadcrumbs.stories';

describe('Breadcrumbs', () => {
  let windowSpy;
  beforeEach(() => {
    windowSpy = jest.spyOn(window, 'window', 'get');
  });

  afterEach(() => {
    windowSpy.mockRestore();
  });

  it('should render breadcrumbs', () => {
    const { getByRole } = render(<Default {...Default.args} />);
    const list = getByRole('list');
    expect(list).toHaveClass('MuiBreadcrumbs-ol');
    expect(list.children.length).toBe(3);
  });

  it('should render breadcrumbs list item', () => {
    const { getAllByRole } = render(<Default {...Default.args} />);
    getAllByRole('listitem').forEach((listitem) => {
      expect(listitem).toHaveClass('MuiBreadcrumbs-li');
    });
  });

  it('should render breadcrumbs link and trigger click', () => {
    const onClick = jest.fn();
    const { getByRole } = render(
      <Default {...Default.args} onClick={onClick} />
    );
    const link = getByRole('link');
    expect(link).toHaveTextContent('home');
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

  it('should render breadcrumbs paragraph', () => {
    const { getByRole } = render(<Default {...Default.args} />);
    const paragraph = getByRole('list').lastChild;
    expect(paragraph).toHaveTextContent('articles');
  });
});
