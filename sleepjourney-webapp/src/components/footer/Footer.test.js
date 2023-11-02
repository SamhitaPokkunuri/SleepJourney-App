/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, fireEvent, waitFor } from 'test/utils';
import { Default } from './Footer.stories';

describe('Featured Text', () => {
  let windowSpy;
  beforeEach(() => {
    windowSpy = jest.spyOn(window, 'window', 'get');
  });

  afterEach(() => {
    windowSpy.mockRestore();
  });

  it('should render footer ', () => {
    const { getAllByRole, getAllByText } = render(
      <Default {...Default.args} />
    );
    expect(document.querySelector('.MuiBox-root')).toHaveStyle(
      `color: #ffffff;
    padding: 30px 16px 40px;
    background: #333333;`
    );
    expect(
      document.querySelector('.MuiContainer-disableGutters').lastChild.children
    ).toHaveLength(3);
    expect(getAllByRole('link')).toHaveLength(6);
    expect(getAllByText(/Vodafone Group/i)).toHaveLength(2);
  });

  it('should render footer links ', () => {
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

  it('should render footer copy rights ', () => {
    const { getByRole, getAllByText } = render(<Default {...Default.args} />);
    getAllByText(/Vodafone Group/i).forEach((paragraph) => {
      expect(paragraph.textContent).toMatch(/Vodafone Group/i);
      expect(paragraph.parentElement).toHaveClass('MuiGrid-item');
      expect(paragraph.className).toMatch(/MuiTypography-body2/i);
    });
    expect(getByRole('link', { name: 'Read our policy' }));
    expect(
      getByRole('link', { name: 'Read our policy' }).parentElement.textContent
    ).toMatch(/We use cookies to improve your experience on this site/i);
  });
});
