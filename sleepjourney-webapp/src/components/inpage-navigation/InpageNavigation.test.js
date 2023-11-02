/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, fireEvent, waitFor } from 'test/utils';
import { Default } from './InpageNavigation.stories';

describe('Inpage Navigation', () => {
  it('should render in-page-navigation', () => {
    const { getByRole } = render(<Default {...Default.args} />);
    expect(getByRole('list').className).toMatch(/list/i);
    expect(getByRole('list').parentElement).toHaveStyle(
      `display: flex; background: #333333;`
    );
  });

  it('should render in-page-navigation listitem', () => {
    const { getByRole, getAllByRole } = render(<Default {...Default.args} />);
    expect(getByRole('list').children).toHaveLength(3);
    const listItem = getAllByRole('listitem');
    listItem.forEach((li) => {
      expect(li.className).toMatch(/listItem/i);
    });
  });

  it('should render in-page-navigation links', () => {
    const onClick = jest.fn();
    const { getAllByRole } = render(
      <Default {...Default.args} onClick={onClick} />
    );
    getAllByRole('link').forEach((link) => {
      expect(link.className).toMatch(/link/i);
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
