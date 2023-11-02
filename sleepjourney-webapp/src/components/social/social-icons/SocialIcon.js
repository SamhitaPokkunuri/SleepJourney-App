import PropTypes from 'prop-types';
import clsx from 'clsx';
import { styled, css } from '@mui/material/styles';
import MuiLink from '@mui/material/Link';

import capitalise from 'utils/capitalise';

const StyledSocialIcon = styled(MuiLink)(
  ({ theme }) => css`
    color: ${theme.palette.text.primary};
    text-decoration: none;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 1em;
    height: 1em;
    font-size: 1.75rem;
    line-height: 1;
    overflow: hidden;
    flex-shrink: 0;
    transition: opacity 0.3s;

    ${theme.breakpoints.up('sm')} {
      font-size: 2rem;
    }

    span {
      display: none;
    }

    &:hover {
      color: inherit;
      opacity: 0.5;
    }

    &:before {
      font-family: VodafoneIcons;
      text-align: center;
      display: block;
    }

    &.linkedin {
      &:before {
        content: ${theme.icons.linkedin};
      }

      &.fill:before {
        content: ${theme.icons.linkedinFill};
      }

      &.is-style-brand {
        color: ${theme.palette.social.linkedin};
      }
    }

    &.twitter {
      &:before {
        content: ${theme.icons.twitter};
      }

      &.fill:before {
        content: ${theme.icons.twitterFill};
      }

      &.is-style-brand {
        color: ${theme.palette.social.twitter};
      }
    }

    &.youtube {
      &:before {
        content: ${theme.icons.youtube};
      }

      &.is-style-brand {
        color: ${theme.palette.social.youtube};
      }
    }

    &.instagram {
      &:before {
        content: ${theme.icons.instagram};
      }

      &.is-style-brand {
        color: ${theme.palette.social.instagram};
      }
    }

    &.facebook {
      &:before {
        content: ${theme.icons.facebook};
      }

      &.fill:before {
        content: ${theme.icons.facebookFill};
      }

      &.is-style-brand {
        color: ${theme.palette.social.facebook};
      }
    }

    &.email {
      &:before {
        content: ${theme.icons.email};
      }

      &.fill:before {
        content: ${theme.icons.emailFill};
      }

      &.is-style-brand {
        color: ${theme.palette.social.email};
      }
    }

    &.is-style-light {
      color: ${theme.palette.primary.main};
    }

    &.fontSizeInherit {
      font-size: inherit;
    }

    &.fontSizeSmall {
      font-size: 1.125rem;
    }

    &.fontSizeMedium {
      font-size: 1.5rem;
    }

    &.fontSizeLarge {
      font-size: 1.375rem;

      ${theme.breakpoints.up('sm')} {
        font-size: 1.75rem;
      }
    }

    &.fontSizeXlarge {
      font-size: 1.5rem;

      ${theme.breakpoints.up('sm')} {
        font-size: 2rem;
      }
    }

    &.elevated {
      background: white;
      border-radius: 50%;
      padding: 30px;
      box-shadow: ${theme.cards.boxShadow};
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;

      &:hover {
        opacity: 1;
      }
    }
  `
);

export default function SocialIcon(props) {
  const {
    platform,
    style = 'default',
    type,
    href,
    fontSize = 'default',
    elevated,
  } = props;

  return (
    <StyledSocialIcon
      component="a"
      href={href}
      target="_blank"
      rel="noopener"
      underline="none"
      className={clsx(style, platform, type, {
        [`fontSize${capitalise(fontSize)}`]: fontSize !== 'default',
        elevated: elevated,
      })}
    >
      <span>{platform}</span>
    </StyledSocialIcon>
  );
}

SocialIcon.propTypes = {
  platform: PropTypes.oneOf([
    'twitter',
    'instagram',
    'linkedin',
    'youtube',
    'facebook',
    'email',
  ]),
  style: PropTypes.oneOf([
    'default',
    'fill',
    'is-style-brand',
    'is-style-light',
  ]),
  type: PropTypes.string,
  href: PropTypes.string,
  fontSize: PropTypes.oneOf([
    'inherit',
    'default',
    'small',
    'medium',
    'large',
    'xlarge',
  ]),
  elevated: PropTypes.bool,
};
