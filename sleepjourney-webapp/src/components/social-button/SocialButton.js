import React from 'react';
import PropTypes from 'prop-types';
import { styled, css } from '@mui/material/styles';
import MuiButton from '@mui/material/Button';

import FontIcon from 'components/font-icon/FontIcon';

const StyledSocialButton = styled(MuiButton, {
  shouldForwardProp: (prop) => /text/.test(prop) === false,
})(
  ({ theme, text }) => css`
    &.social-button {
      background-color: ${theme.palette.common.red};
      min-width: 48px;
      min-height: 48px;
      flex-shrink: 0;
      padding: ${text ? '8px 24px' : '8px 12px'};
      border-radius: 2px;
      margin-right: 16px;
      color: ${theme.palette.common.white};

      &:hover {
        background-color: ${theme.palette.common.white};
        color: ${theme.palette.common.red};
      }

      & .MuiButton-startIcon {
        margin: 0;
      }

      & .social-button-text {
        margin-left: 10px;
      }
    }
  `
);

export default function SocialButton(props) {
  const { children, href, icon, ...rest } = props;

  return (
    <StyledSocialButton
      className="social-button"
      href={href}
      startIcon={icon && <FontIcon icon={icon} color="inherit" />}
      text={children}
      {...rest}
    >
      {children && <span className="social-button-text">{children}</span>}
    </StyledSocialButton>
  );
}

SocialButton.propTypes = {
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * The href for the button link.
   */
  href: PropTypes.string.isRequired,
  /**
   * The icon for the component.
   */
  icon: PropTypes.oneOf(['facebook', 'instagram', 'linkedin', 'twitter']),
};
