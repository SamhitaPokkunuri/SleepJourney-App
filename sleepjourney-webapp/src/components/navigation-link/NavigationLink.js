import React from 'react';
import PropTypes from 'prop-types';
import NextLink from 'next/link';
import { styled, css } from '@mui/material/styles';
import { event } from 'lib/analytics';
import clsx from 'clsx';

const StyledNavigationLink = styled('a')(
  ({ theme }) => css`
    &.link {
      padding: 10px 20px;
      line-height: 1;
      text-decoration: none;
      color: ${theme.palette.common.darkGrey};
      display: flex;
      align-items: center;
      flex: 1;
      cursor: pointer;
    }

    strong,
    b {
      font-weight: 900;
    }

    &:not(.breadcrumbLink):hover {
      color: ${theme.palette.common.red};
    }

    ${theme.breakpoints.up('md')} {
      [data-level='1'] > div > ul > li > & {
        text-align: center;
        justify-content: center;
        padding: ${theme.spacing(1)};
      }

      [data-level='2'] & {
        padding: 6px 12px;
      }
    }

    &.goToLink {
      margin: 2px 0 10px;
    }

    &.breadcrumbLink {
      background-color: ${theme.palette.common.shadeGrey};
      color: ${theme.palette.common.black};

      & .label {
        font-weight: 900;
      }

      ${theme.breakpoints.up('md')} {
        [data-level='1'] > div > ul > li > & {
          background-color: transparent;
        }

        [data-level='2'] & {
          border-radius: 2px;
        }
      }
    }

    &.selectedLink {
      color: ${theme.palette.common.red};

      & .label {
        font-weight: 900;
      }
    }

    &.popupLink {
      &:after {
        font-family: vodafoneIcons;
        content: ${theme.icons.chevronRight};
        margin-left: auto;
        font-size: 1.375rem;
        width: 1rem;

        ${theme.breakpoints.up('md')} {
          [data-level='1'] > div > ul > li > & {
            content: ${theme.icons.chevronDownXL};
            font-size: 0.5rem;
            margin-left: ${theme.spacing(1)};
          }
        }
      }
    }

    &.endLink {
      ${theme.breakpoints.up('md')} {
        &::before {
          content: '';
          height: 24px;
          margin-right: 16px;
          width: 1px;
          flex-shrink: 0;
          background-color: ${theme.palette.common.red};
        }
      }

      ${theme.breakpoints.up('xxl')} {
        &::before {
          margin-right: 32px;
        }
      }
    }

    > .label {
      padding: 2px 0 0;

      &:before {
        display: block;
        content: attr(data-label);
        font-weight: 900;
        height: 0;
        overflow: hidden;
        visibility: hidden;
      }

      ${theme.breakpoints.up('md')} {
        [data-level='1'] > div > ul > li > & {
          padding: 0;
        }
      }
    }
  `
);

export default function NavigationLink(props) {
  const {
    active = false,
    selected = false,
    hasPopup = false,
    goToLink = false,
    endLink = false,
    label,
    path,
    ...anchorProps
  } = props;

  const linkAttributes = path?.options?.attributes;
  const linkTarget =
    (linkAttributes && path.options.attributes.target) || '_self';
  const eventClick = () =>
    event({
      action: 'main-nav-link',
      category: 'engagement',
      label: path.url.path,
    });

  return (
    <NextLink href={path.url.path} prefetch={false} passHref>
      <StyledNavigationLink
        target={linkTarget}
        onClick={eventClick}
        className={clsx('link', {
          popupLink: hasPopup,
          breadcrumbLink: active,
          selectedLink: selected,
          goToLink: goToLink,
          endLink: endLink,
        })}
        {...anchorProps}
      >
        <span
          className="label"
          data-label={typeof label === 'string' ? label : undefined}
        >
          {label}
        </span>
      </StyledNavigationLink>
    </NextLink>
  );
}

NavigationLink.propTypes = {
  active: PropTypes.bool,
  selected: PropTypes.bool,
  hasPopup: PropTypes.bool,
  goToLink: PropTypes.bool,
  endLink: PropTypes.bool,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  path: PropTypes.object,
};
