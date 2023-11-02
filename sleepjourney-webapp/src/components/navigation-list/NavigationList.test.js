/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, fireEvent, within, waitFor } from 'test/utils';
import { Default } from './NavigationList.stories';
jest.mock('next/router', () => ({
  useRouter: () => ({
    query: { myProp: 'myValue' },
  }),
}));

describe('Navigation List', () => {
  let windowSpy;
  beforeEach(() => {
    windowSpy = jest.spyOn(window, 'window', 'get');
  });

  afterEach(() => {
    windowSpy.mockRestore();
  });

  it('should render navigation-list', () => {
    const { getAllByRole } = render(<Default {...Default.args} />);
    const container = getAllByRole('list')[0].parentElement;
    expect(container.parentElement.className).toMatch(/navigationList/i);
    expect(container.className).toMatch(/listContainer/i);
    expect(getAllByRole('list')).toHaveLength(2);
  });

  it('should render navigation-list first level list', () => {
    const { getAllByRole } = render(<Default {...Default.args} />);
    const first = getAllByRole('list')[0];
    expect(first.className).toMatch(/list/i);
    expect(first.children).toHaveLength(4);
  });

  it('should render navigation-list listitems of first level list', () => {
    const { getAllByRole } = render(<Default {...Default.args} />);
    const first = getAllByRole('list')[0];
    const listItem = within(first).getAllByRole('listitem');
    listItem.forEach((li) => {
      expect(li.className).toMatch(/listItem/i);
      fireEvent.click(li);
      waitFor(() => {
        expect(li.children.className).toMatch(/selectedLink/i);
        expect(li.querySelector('.MuiBox-root')).toBeInTheDocument();
        expect(li.querySelector('.MuiBox-root').className).toMatch(/expanded/i);
      });
    });
  });

  it('should render navigation-list listitems of second level list', () => {
    const { getAllByRole } = render(<Default {...Default.args} />);
    const second = getAllByRole('list')[1];
    const listItem = within(second).getAllByRole('listitem');
    expect(second.children).toHaveLength(3);
    expect(second.parentElement.className).toMatch(/listContainer/i);
    listItem.forEach((li) => {
      expect(li.className).toMatch(/listItem/i);
    });
  });

  it('should render navigation-list second level links triggered click', () => {
    const onClick = jest.fn();
    const { getAllByRole } = render(
      <Default {...Default.args} onClick={onClick} />
    );
    const second = getAllByRole('list')[1];
    const links = within(second).getAllByRole('link');

    links.forEach((link) => {
      expect(link).toHaveAttribute('href');
      fireEvent.click(link.attributes.href);
      waitFor(() => {
        expect(onClick).toHaveBeenCalled();
        windowSpy.mockImplementation(() => ({
          location: {
            origin: link.attributes.href,
          },
        }));
        expect(window.location.origin).toEqual(link.attributes.href);
      });
    });
  });
});
