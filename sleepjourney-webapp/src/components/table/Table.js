import PropTypes from 'prop-types';
import clsx from 'clsx';
import { styled, css } from '@mui/material/styles';
import MuiBox from '@mui/material/Box';
import MuiTable from '@mui/material/Table';
import MuiTableBody from '@mui/material/TableBody';
import MuiTableCell from '@mui/material/TableCell';
import MuiTableFooter from '@mui/material/TableFooter';
import MuiTableHead from '@mui/material/TableHead';
import MuiTableRow from '@mui/material/TableRow';

import useWidthStyles from 'utils/useWidthStyles';

const StyledTable = styled(MuiBox)(
  ({ theme }) => css`
    overflow: auto;
    margin-bottom: ${theme.spacing(3)};

    .table {
      td {
        background-color: ${theme.palette.common.white};
        padding: ${theme.spacing(1.2)};
        min-width: 160px;

        ${theme.breakpoints.up('sm')} {
          padding: ${theme.spacing(1.6, 2.4)};
          font-size: 1.125rem;
          line-height: 1.5rem;
        }
      }

      tr:nth-of-type(2n + 3) td {
        background-color: ${theme.palette.primary.dark};
      }

      td + td,
      th + th {
        border-left: 1px solid ${theme.palette.common.silver};
      }

      tbody tr:first-of-type td,
      thead th {
        border-bottom-width: 3px;
        border-bottom-style: solid;

        &:first-of-type {
          border-bottom-color: ${theme.palette.common.silver};
        }
      }

      tfoot td {
        border-top-width: 3px;
        border-top-style: solid;

        &:first-of-type {
          border-top-color: ${theme.palette.common.silver};
        }
      }

      tbody tr:first-of-type td:first-of-type {
        border-bottom-width: 1px;
      }

      // no color
      tbody tr:first-of-type td,
      thead th,
      tfoot td {
        border-color: ${theme.palette.common.silver};
      }

      // colors
      &.is-style-vdf-colourful {
        tbody tr:first-of-type td,
        thead th {
          &:nth-of-type(4n + 2) {
            border-bottom-color: ${theme.palette.table.green};
          }

          &:nth-of-type(4n + 3) {
            border-bottom-color: ${theme.palette.table.yellow};
          }

          &:nth-of-type(4n + 4) {
            border-bottom-color: ${theme.palette.table.cyan};
          }

          &:nth-of-type(4n + 5) {
            border-bottom-color: ${theme.palette.table.red};
          }
        }

        tfoot td {
          &:nth-of-type(4n + 2) {
            border-top-color: ${theme.palette.table.green};
          }

          &:nth-of-type(4n + 3) {
            border-top-color: ${theme.palette.table.yellow};
          }

          &:nth-of-type(4n + 4) {
            border-top-color: ${theme.palette.table.cyan};
          }

          &:nth-of-type(4n + 5) {
            border-top-color: ${theme.palette.table.red};
          }
        }

        // no color on tr if thead
        thead + tbody {
          tr:first-of-type td {
            border-bottom: none !important;
          }

          tr:nth-of-type(2n + 3) td {
            background-color: ${theme.palette.common.white};
          }

          tr:nth-of-type(2n + 2) td {
            background-color: ${theme.palette.primary.dark};
          }
        }
      }
    }

    .tableHead {
      font-weight: 700;
      padding: ${theme.spacing(1.5, 1)};
      min-width: 160px;

      ${theme.breakpoints.up('sm')} {
        padding: ${theme.spacing(1.6, 2.4)};
        font-size: 1.125rem;
        line-height: 1.5rem;
      }
    }
  `
);

function Table(props) {
  const { head, body, foot, className, widthControlExt } = props;
  const widthStyles = useWidthStyles(widthControlExt);

  return (
    <StyledTable sx={{ ...widthStyles }}>
      <MuiTable className={clsx('table', className)} aria-label="table">
        {head && (
          <MuiTableHead>
            {head.map((row, index) => (
              <MuiTableRow key={`row-${index}`}>
                {row.cells.map((cell) => (
                  <MuiTableCell
                    key={`cell-${cell.content}`}
                    component="th"
                    align={cell.align ? cell.align : 'center'}
                    className="tableHead"
                    dangerouslySetInnerHTML={{ __html: cell.content }}
                  />
                ))}
              </MuiTableRow>
            ))}
          </MuiTableHead>
        )}
        <MuiTableBody>
          {body.map((row, index) => (
            <MuiTableRow key={`row-${index}`}>
              {row.cells.map((cell) => (
                <MuiTableCell
                  key={`cell-${cell.content}`}
                  align={cell.align ? cell.align : 'center'}
                  dangerouslySetInnerHTML={{ __html: cell.content }}
                />
              ))}
            </MuiTableRow>
          ))}
        </MuiTableBody>
        {foot && (
          <MuiTableFooter>
            {foot.map((row, index) => (
              <MuiTableRow key={`row-${index}`}>
                {row.cells.map((cell) => (
                  <MuiTableCell
                    key={`cell-${cell.content}`}
                    align={cell.align ? cell.align : 'center'}
                    className="tableFooter"
                    dangerouslySetInnerHTML={{ __html: cell.content }}
                  />
                ))}
              </MuiTableRow>
            ))}
          </MuiTableFooter>
        )}
      </MuiTable>
    </StyledTable>
  );
}

Table.propTypes = {
  /**
   * The body of the table.
   */
  body: PropTypes.arrayOf(
    PropTypes.shape({
      cells: PropTypes.arrayOf(
        PropTypes.shape({
          content: PropTypes.node,
          align: PropTypes.oneOf([
            'inherit',
            'left',
            'center',
            'right',
            'justify',
          ]),
        })
      ),
    })
  ).isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The foot of the table.
   */
  foot: PropTypes.arrayOf(
    PropTypes.shape({
      cells: PropTypes.arrayOf(
        PropTypes.shape({
          content: PropTypes.node,
          align: PropTypes.oneOf([
            'inherit',
            'left',
            'center',
            'right',
            'justify',
          ]),
        })
      ),
    })
  ),
  /**
   * The head of the table.
   */
  head: PropTypes.arrayOf(
    PropTypes.shape({
      cells: PropTypes.arrayOf(
        PropTypes.shape({
          content: PropTypes.node,
          align: PropTypes.oneOf([
            'inherit',
            'left',
            'center',
            'right',
            'justify',
          ]),
        })
      ),
    })
  ),
  /**
   * @ignore
   */
  widthControlExt: PropTypes.shape({
    mobile: PropTypes.number,
    tablet: PropTypes.number,
    desktop: PropTypes.number,
  }),
};

export default Table;
