import PropTypes from 'prop-types';
import clsx from 'clsx';
import { styled, css } from '@mui/material/styles';
import MuiBox from '@mui/material/Box';
import MuiList from '@mui/material/List';
import MuiListItem from '@mui/material/ListItem';

import { Icon } from 'components';
import SocialIcon from 'components/social/social-icons/SocialIcon';

const StyledSocialShare = styled(MuiBox, {
  shouldForwardProp: (prop) => /(fontSize)/.test(prop) === false,
})(
  ({ theme, fontSize }) => css`
    margin-left: auto;
    position: relative;

    .shareIcon {
      position: relative;
      height: 28px;
      width: 28px;
      padding: 4px;
      font-size: 20px;
      z-index: 1;
      color: ${theme.palette.common.red};

      &::after {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        display: block;
        width: 28px;
        height: 28px;
        transform: scale(0);
        transition: all 0.3s 0.6s;
        background-color: ${theme.palette.common.red};
        border-radius: 50%;
      }

      svg {
        position: relative;
        transition: color 0.3s 0.6s, opacity 0.3s 0s;
        z-index: 1;

        &::after {
          content: '';
          position: absolute;
          top: -4px;
          right: -5px;
          display: block;
          width: 28px;
          height: 28px;
          transform: scale(0);
          transition: all 0.3s 0.6s;
          background-color: ${theme.palette.common.red};
          border-radius: 50%;
        }
      }
    }

    &:hover {
      .shareIcon {
        color: ${theme.palette.common.white};

        &::after {
          transform: scale(1);
          transition-delay: 0s;
        }

        svg {
          opacity: 0.5;
          transition-delay: 0s, 0.7s;
        }
      }

      .collapsed {
        opacity: 1;
        visibility: visible;
        max-width: 140px;

        & > li {
          opacity: 1;
          visibility: visible;
          transition-delay: 0.7s;
        }
      }
    }

    .socialList {
      margin: 0;
      padding: 0 8px;
      display: flex;

      & > li {
        padding: 0;
        width: auto;

        &:not(:first-of-type) {
          margin-left: ${fontSize === 'small' ? '8px' : theme.spacing(1.5)};
        }
      }
    }

    .collapsed {
      position: absolute;
      background-color: ${theme.palette.common.red};
      border-radius: 14px;
      height: 28px;
      max-width: 0;
      transition: all 0.3s 0.3s;
      padding: 0 32px 0 10px !important;
      top: 0;
      right: 0;
      opacity: 0;
      visibility: hidden;
      z-index: 0;

      & > li {
        transition: all 0.5s 0s;
        opacity: 0;
        visibility: hidden;
      }
    }
  `
);

export default function SocialShare(props) {
  const {
    facebook,
    linkedin,
    twitter,
    email,
    type,
    className,
    title,
    description,
    canonical: url,
    fontSize,
    collapsed = false,
  } = props;

  const iconStyle = collapsed ? 'is-style-light' : className;

  return (
    <StyledSocialShare fontSize={fontSize}>
      {collapsed && (
        <MuiBox className="shareIcon">
          <Icon icon="Share" iconSet="global" fontSize="inherit" />
        </MuiBox>
      )}
      <MuiList className={clsx('socialList', { collapsed })} disablePadding>
        {facebook && (
          <MuiListItem>
            <SocialIcon
              platform="facebook"
              href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
              fontSize={fontSize}
              type={type}
              style={iconStyle}
            />
          </MuiListItem>
        )}
        {linkedin && (
          <MuiListItem>
            <SocialIcon
              platform="linkedin"
              href={`https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}&${description}&source=LinkedIn`}
              fontSize={fontSize}
              type={type}
              style={iconStyle}
            />
          </MuiListItem>
        )}
        {twitter && (
          <MuiListItem>
            <SocialIcon
              platform="twitter"
              href={`https://twitter.com/share?url=${url}`}
              fontSize={fontSize}
              type={type}
              style={iconStyle}
            />
          </MuiListItem>
        )}
        {email && (
          <MuiListItem>
            <SocialIcon
              platform="email"
              href={`mailto:?&subject=${title}&body=${url}`}
              fontSize={fontSize}
              type={type}
              style={iconStyle}
            />
          </MuiListItem>
        )}
      </MuiList>
    </StyledSocialShare>
  );
}

SocialShare.propTypes = {
  canonical: PropTypes.string,

  title: PropTypes.string,

  description: PropTypes.string,

  collapsed: PropTypes.bool,

  facebook: PropTypes.bool,

  twitter: PropTypes.bool,

  linkedin: PropTypes.bool,

  email: PropTypes.bool,

  fontSize: PropTypes.oneOf(['inherit', 'default', 'small', 'large']),

  type: PropTypes.string,

  className: PropTypes.oneOf(['default', 'is-style-light']),
};
