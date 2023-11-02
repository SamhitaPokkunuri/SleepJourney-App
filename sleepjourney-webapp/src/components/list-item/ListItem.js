import { useContext } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { styled, css } from '@mui/material/styles';
import MuiListItem from '@mui/material/ListItem';

import { ThemeContext } from '../layout/FoundationPage';

const StyledListItem = styled(MuiListItem)(
  ({ theme }) => css`
    display: list-item;
    padding: 0;

    &::marker {
      font-size: 1rem;
      line-height: 1.5rem;

      ${theme.breakpoints.up('sm')} {
        font-size: 1.125rem;
        line-height: 1.75rem;
      }

      ${theme.breakpoints.up('md')} {
        font-size: 1.25rem;
        line-height: 1.875rem;
      }
    }

    p {
      margin-top: 0 !important;
    }

    &.foundationListItem {
      &::marker {
        ${theme.breakpoints.up('md')} {
          font-size: 1.5rem;
          line-height: 1.75rem;
        }
      }

      p {
        ${theme.breakpoints.up('md')} {
          font-size: 1.5rem;
          line-height: 1.75rem;
        }
      }
    }
  `
);

function ListItem(props) {
  const { children } = props;

  const context = useContext(ThemeContext);
  const isFoundation = context === 'foundation';

  return (
    <StyledListItem
      className={clsx({
        foundationListItem: isFoundation,
      })}
      disableGutters
    >
      {children}
    </StyledListItem>
  );
}

ListItem.propTypes = {
  /**
   * The content of the component.
   */
  children: PropTypes.node.isRequired,
};

export default ListItem;
