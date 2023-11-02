/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, fireEvent, waitFor } from 'test/utils';
import { Default } from './GlobalSearch.stories';

describe('Global Search', () => {
  it('should render global-search collapsed-in', () => {
    const { getAllByRole } = render(<Default {...Default.args} />);
    const container = document.querySelector('#global-search');
    expect(container).toHaveStyle(
      `position: fixed`,
      `z-index: 1300`,
      `inset: 0px`
    );
    expect(
      container.querySelector('.MuiDialog-paperScrollPaper').className
    ).toMatch(/searchPanel/i);
    expect(getAllByRole('img')).toBeTruthy();
  });

  it('should render global-search heading styles', () => {
    const { getAllByRole } = render(<Default {...Default.args} />);
    const h2 = getAllByRole('heading')[0];
    expect(h2.parentElement.className).toMatch(/searchContent/i);
    getAllByRole('heading').forEach((head) => {
      expect(head).toHaveClass('MuiTypography-alignCenter');
      expect(head.textContent).toMatch(/Search/i);
    });
  });

  it('should render global-search text-field', () => {
    const { getByRole, getAllByRole } = render(<Default {...Default.args} />);
    expect(getAllByRole('img')[1]).toBeTruthy();
    expect(getByRole('textbox').value).toEqual('Testing');
    const span = getAllByRole('img')[2];
    expect(span).toBeInTheDocument();
  });

  it('should render global-search popular links styles', () => {
    const { getAllByRole } = render(<Default {...Default.args} />);
    const links = getAllByRole('link');
    expect(links).toHaveLength(4);
    links.forEach((link) => {
      expect(link.className).toMatch(/linKButton/i);
      expect(link).toHaveAttribute(`href`);
    });
  });

  it('should render global-search collapsed-out', () => {
    const onClick = jest.fn();
    const { getAllByRole } = render(
      <Default {...Default.args} onClick={onClick} />
    );
    const link = getAllByRole('button')[0];
    expect(getAllByRole('img')[0]).toBeTruthy();
    const collapse = document.querySelector('#global-search');
    fireEvent.click(link);
    waitFor(() => {
      expect(onClick).toHaveBeenCalled();
      expect(collapse).not.toBeInTheDocument();
    });
  });
});
