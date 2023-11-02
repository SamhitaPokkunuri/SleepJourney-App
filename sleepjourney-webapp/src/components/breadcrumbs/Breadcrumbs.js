import PropTypes from 'prop-types';
import NextLink from 'next/link';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme, styled, css } from '@mui/material/styles';
import MuiBox from '@mui/material/Box';
import MuiBreadcrumbs from '@mui/material/Breadcrumbs';
import MuiContainer from '@mui/material/Container';

const StyledBreadcrumbs = styled(MuiBox, {
  shouldForwardProp: (prop) => /(foundation)/.test(prop) === false,
})(
  ({ theme, foundation }) => css`
    background-color: ${foundation ? theme.palette.common.red : 'transparent'};
    padding: ${theme.spacing(0, 1.6)};

    ol {
      flex-wrap: nowrap;
    }

    ${theme.breakpoints.up(480)} {
      padding: ${theme.spacing(0, 2.4)};
    }

    ${theme.breakpoints.up('sm')} {
      .MuiTypography-body1 {
        line-height: 1.375rem;
      }
    }

    ${theme.breakpoints.up('md')} {
      padding: ${theme.spacing(0, 3.2)};

      .MuiTypography-body1 {
        font-size: 1.125rem;
      }
    }

    ${theme.breakpoints.up('xl')} {
      padding: ${theme.spacing(0, 4.8)};
    }

    ${theme.breakpoints.up('xxl')} {
      padding: ${theme.spacing(0, 6)};
    }

    .container {
      ${theme.breakpoints.up('md')} {
        max-width: ${theme.containers.values.xl}px;
      }
    }

    .list {
      color: ${foundation
        ? theme.palette.common.white
        : theme.palette.primary.contrastText};

      &:first-of-type {
        margin-top: 0;
      }

      li {
        display: none;
      }

      li:nth-last-of-type(3) {
        display: inline-flex;
        width: 100%;
      }

      li.MuiBreadcrumbs-separator {
        margin-left: ${theme.spacing(2)};
        margin-right: ${theme.spacing(2)};
      }

      .MuiButtonBase-root {
        color: inherit;
        background-color: transparent;

        svg {
          position: absolute;
          top: -4px;
        }
      }

      ${theme.breakpoints.up('md')} {
        li {
          display: inline-flex;

          &:nth-last-of-type(3) {
            width: auto;
          }

          &:last-of-type {
            overflow: hidden;
            max-width: 500px;
          }
        }
      }
    }

    .link {
      padding: ${theme.spacing(1.2, 0)};
      display: inline-block;
      text-overflow: ellipsis;
      text-decoration: none;
      color: inherit;
      white-space: nowrap;
      overflow: hidden;
      width: 100%;
      cursor: pointer;

      &:before {
        margin-right: ${theme.spacing(1)};
        font-family: VodafoneIcons;
        content: ${theme.icons.arrowLeft};
        font-size: 0.625em;
      }

      ${theme.breakpoints.up('sm')} {
        padding: ${theme.spacing(1.5, 0)};
      }

      ${theme.breakpoints.up('md')} {
        max-width: 250px;

        &:before {
          display: none;
        }

        &:hover {
          text-decoration: underline;
        }
      }
    }

    .lastItem {
      padding: ${theme.spacing(1.5, 0)};
      margin: 0 !important;
      font-weight: 700;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
  `
);

function Breadcrumbs({ breadcrumbs, foundation = false }) {
  const { breakpoints } = useTheme();
  const disableMaxItems = useMediaQuery(breakpoints.up('md'));

  if (breadcrumbs.length === 0) {
    return null;
  }

  return (
    <StyledBreadcrumbs foundation={foundation}>
      <MuiContainer className="container">
        <MuiBreadcrumbs
          separator="|"
          maxItems={disableMaxItems ? 5 : 10}
          itemsBeforeCollapse={3}
          aria-label="breadcrumb"
          className="list"
        >
          {breadcrumbs.map((breadcrumb, idx) => {
            if (idx === breadcrumbs.length - 1) {
              return (
                <span key={breadcrumb.title} className="lastItem">
                  {breadcrumb.title}
                </span>
              );
            }

            return (
              <NextLink key={breadcrumb.title} href={breadcrumb.url.path}>
                <a className="link">{breadcrumb.title}</a>
              </NextLink>
            );
          })}
        </MuiBreadcrumbs>
      </MuiContainer>
    </StyledBreadcrumbs>
  );
}

Breadcrumbs.propTypes = {
  /**
   * The content of the component.
   */
  breadcrumbs: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      url: PropTypes.shape({
        path: PropTypes.string,
      }),
    })
  ).isRequired,
  /**
   * @ignore
   */
  article: PropTypes.bool,
  /**
   * @ignore
   */
  foundation: PropTypes.bool,
};

export default Breadcrumbs;
