/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, within, waitFor } from 'test/utils';
import { Default } from './Table.stories';

describe('Table', () => {
  it('should render table basic data ', () => {
    const { getByRole, getAllByRole } = render(<Default {...Default.args} />);
    expect(getByRole('table')).toHaveClass('MuiTable-root');
    expect(getAllByRole('row').length).toBe(7);
    expect(getAllByRole('cell').length).toBe(30);
  });

  it('should render table header', () => {
    const { getByRole } = render(<Default {...Default.args} />);
    const tableHead = getByRole('table').firstChild;
    const th = within(tableHead).getAllByRole('row');
    expect(tableHead).toHaveClass('MuiTableHead-root');

    th.forEach((row) => {
      expect(row.className).toMatch('MuiTableRow-head');
      expect(row.textContent).not.toBeNull();
      expect(row.querySelector('strong')).toBeInTheDocument();
    });
  });

  const headAlign = ['left', 'center', 'right', 'justify'];
  test.each(headAlign)('should render tabel header text-align', (input) => {
    const { getAllByRole } = render(
      <Default {...Default.args} head={[{ cells: [{ align: input }] }]} />
    );
    waitFor(() =>
      getAllByRole('cell').forEach((cell) => {
        const className = input.charAt(0).toUpperCase() + input.slice(1);
        expect(cell).toHaveClass(`MuiTableCell-align${className}`);
      })
    );
  });

  it('should render table body ', () => {
    const { getAllByRole } = render(<Default {...Default.args} />);
    const tableBody = getAllByRole('row')[2];
    expect(tableBody.parentElement).toHaveClass('MuiTableBody-root');

    getAllByRole('cell').forEach((row) => {
      expect(row.className).toMatch('MuiTableCell-root');
      expect(row.textContent).not.toBeNull();
    });
  });

  const bodyAlign = ['left', 'center', 'right', 'justify'];
  test.each(bodyAlign)('should render tabel body text-align', (input) => {
    const { getAllByRole } = render(
      <Default {...Default.args} body={[{ cells: [{ align: input }] }]} />
    );
    waitFor(() =>
      getAllByRole('cell').forEach((cell) => {
        const className = input.charAt(0).toUpperCase() + input.slice(1);
        expect(cell).toHaveClass(`MuiTableCell-align${className}`);
      })
    );
  });

  it('should render table footer', () => {
    const { getByRole } = render(<Default {...Default.args} />);
    const tableFooter = getByRole('table').lastChild;
    const tr = within(tableFooter).getAllByRole('row');
    expect(tableFooter).toHaveClass('MuiTableFooter-root');

    tr.forEach((row) => {
      expect(row.className).toMatch('MuiTableRow-footer');
      expect(row.textContent).not.toBeNull();
      expect(row.querySelector('strong')).toBeInTheDocument();
    });
  });

  const footAlign = ['left', 'center', 'right', 'justify'];
  test.each(footAlign)('should render tabel footer text-align', (input) => {
    const { getAllByRole } = render(
      <Default {...Default.args} foot={[{ cells: [{ align: input }] }]} />
    );
    waitFor(() =>
      getAllByRole('cell').forEach((cell) => {
        const className = input.charAt(0).toUpperCase() + input.slice(1);
        expect(cell).toHaveClass(`MuiTableCell-align${className}`);
      })
    );
  });
});
