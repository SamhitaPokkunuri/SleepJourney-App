import { useContext } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { styled, css } from '@mui/material/styles';

import { ThemeContext } from '../layout/FoundationPage';

const StyledDivList = styled('div', {
  shouldForwardProp: (prop) => /(color)/.test(prop) === false,
})(
  ({ theme, color }) => css`
    ol,
    ul {
      color: ${color === 'inherit' ? 'inherit' : theme.palette.common[color]};
      margin-top: ${theme.spacing(2)};
      margin-bottom: ${theme.spacing(2)};
      padding: inherit;
      list-style: revert;
      padding-left: ${theme.spacing(2)};
      font-size: 1.25rem;
      line-height: 1.875rem;
    }

    ${theme.breakpoints.up('md')} {
      margin-top: ${theme.spacing(3)};
      margin-bottom: ${theme.spacing(3)};
    }

    &.compact {
      margin-top: -40px !important;
      ol,
      ul {
        margin-top: ${theme.spacing(0)};
        margin-bottom: ${theme.spacing(0)};
        li {
          margin-top: ${theme.spacing(0)};
          margin-bottom: ${theme.spacing(0)};
        }
      }
    }

    li {
      display: list-item;
      padding: 0;

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

      margin-top: 0 !important;
    }

    &.foundationListItem {
      li {
        &::marker {
          ${theme.breakpoints.up('md')} {
            font-size: 1.5rem;
            line-height: 1.75rem;
          }
        }

        ${theme.breakpoints.up('md')} {
          font-size: 1.5rem;
          line-height: 1.75rem;
        }
      }
    }
  `
);

function ListPreRender(props) {
  const { className, ordered, values } = props;

  let color = 'inherit';

  if (/vdf-text-vodafonered/.test(className)) {
    color = 'red';
  } else if (/vdf-text-white/.test(className)) {
    color = 'white';
  } else if (/vdf-text-darkgrey/.test(className)) {
    color = 'darkGrey';
  }

  let density = 'default';

  if (/vdf-list-compact/.test(className)) {
    density = 'compact';
  }

  const listType = ordered ? 'ol' : 'ul';
  const context = useContext(ThemeContext);
  const isFoundation = context === 'foundation';

  return (
    <>
      <StyledDivList
        color={color}
        className={clsx({
          foundationListItem: isFoundation,
          [density]: density !== 'default',
        })}
        dangerouslySetInnerHTML={{
          __html: `<${listType}>${values}</${listType}>`,
        }}
      />
    </>
  );
}

ListPreRender.propTypes = {
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * Defines the list type.
   */
  ordered: PropTypes.bool,
  /**
   * The content of the component.
   */
  values: PropTypes.string,
};

export default ListPreRender;
