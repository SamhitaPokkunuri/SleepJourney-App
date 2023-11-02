import { useContext } from 'react';
import PropTypes from 'prop-types';
import { styled, css } from '@mui/material/styles';
import MuiBox from '@mui/material/Box';

import { useOverlayRoute } from 'hooks/useOverlayRoute';
import { event } from '../../lib/analytics';
import { ThemeContext } from '../layout/FoundationPage';
import {
  ChevronButton,
  Link,
  DownloadButton,
  IconButton,
  SocialButton,
} from 'components';

const linkIcons = {
  'current-tab': 'ChevronRightCircle',
  _self: 'ChevronRightCircle',
  _blank: 'PopOutCircle',
  overlay: 'OverlayInfoCircle',
};

const contentAlign = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
};

const StyledButton = styled(MuiBox, {
  shouldForwardProp: (prop) =>
    /(alignment|isDownloadButton)/.test(prop) === false,
})(
  ({ theme, alignment, isDownloadButton }) => css`
    &.button {
      margin-bottom: 10px;
      color: ${theme.palette.common.black};
      display: flex;
      width: ${isDownloadButton ? '100%' : 'auto'};
      justify-content: ${contentAlign[alignment]};

      b,
      strong {
        font-weight: 700;
      }
    }
  `
);

function ButtonBlock(props) {
  // Also used for Dauntless Button
  const {
    anchor,
    className,
    chevron,
    customColors,
    linkTarget,
    pulseAnimate,
    url,
    rel,
    text,
    children,
    openAsOverlay,
  } = props;

  const { handleOverlayClick } = useOverlayRoute();
  const context = useContext(ThemeContext);
  const isFoundation = context === 'foundation';

  let linkChevronButtonIcon = linkIcons[linkTarget];

  if (isFoundation && linkTarget === '_blank') {
    linkChevronButtonIcon = 'PopOutFoundationCircle';
  }

  if (customColors?.text === '#FFFFFF' && !customColors?.background) {
    linkChevronButtonIcon = 'ChevronRightCircleColor';
  }

  const handleOnClick = (e) => {
    event({
      action: 'button-link',
      category: 'engagement',
      label: url,
    });
    handleOverlayClick(e, openAsOverlay, url);
  };

  let ButtonBlock =
    className?.includes('is-style-outlined') && linkTarget === '_blank' ? (
      <>
        <DownloadButton
          anchor={anchor}
          icon={isFoundation ? 'PopOutFoundation' : 'PopOut'}
          href={url}
          target={linkTarget}
          rel={rel}
          onClick={handleOnClick}
        >
          {text}
        </DownloadButton>
      </>
    ) : (
      <>
        <Link
          anchor={anchor}
          href={url}
          target={linkTarget}
          rel={rel}
          onClick={handleOnClick}
          animate
          largeLink
          showIcon
          icon={linkChevronButtonIcon}
          customColors={customColors}
        >
          {text}
        </Link>
      </>
    );

  if (
    (className?.includes('is-style-outlined') && linkTarget !== '_blank') ||
    className?.includes('is-style-rounded')
  ) {
    ButtonBlock = (
      <>
        <ChevronButton
          anchor={anchor}
          icon={linkChevronButtonIcon}
          href={url}
          target={linkTarget}
          rel={rel}
          rounded={className?.includes('is-style-rounded')}
          chevron={chevron}
          pulseAnimate={pulseAnimate}
          border={
            className?.includes('vdf-outline-button') &&
            className?.includes('is-style-rounded')
          }
          customColors={customColors}
          onClick={handleOnClick}
        >
          {text}
        </ChevronButton>
      </>
    );
  }

  if (className?.includes('is-style-icon')) {
    ButtonBlock = (
      <>
        <IconButton
          anchor={anchor}
          icon={children[0].props.icon}
          href={url}
          target={linkTarget}
          rel={rel}
          customColors={customColors}
          chevron={chevron}
          onClick={handleOnClick}
          outline={className?.includes('vdf-outline-button')}
          size="large"
        >
          {text}
        </IconButton>
      </>
    );
  }

  return ButtonBlock;
}

function Button(props) {
  const { alignment, className, linkTarget, url, rel, text } = props;

  const isDownloadButton =
    className?.includes('is-style-outlined') && linkTarget === '_blank';

  if (className?.includes('exco-social')) {
    const icon = url.match(/facebook|instagram|linkedin|twitter/i);

    return (
      <SocialButton
        href={url}
        icon={icon ?? icon[0]}
        target={linkTarget}
        rel={rel}
      >
        {text}
      </SocialButton>
    );
  }

  return (
    <StyledButton
      className="button"
      alignment={alignment}
      isDownloadButton={isDownloadButton}
    >
      <ButtonBlock {...props} />
    </StyledButton>
  );
}

Button.defaultProps = {
  linkTarget: '_self',
};

Button.propTypes = {
  /**
   * @ignore
   */
  anchor: PropTypes.string,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * @ignore
   */
  chevron: PropTypes.bool,
  /**
   * @ignore
   */
  customColors: PropTypes.shape({
    background: PropTypes.string,
    text: PropTypes.string,
  }),
  /**
   * Sets the target for the link.
   */
  linkTarget: PropTypes.oneOf(['current-tab', '_self', '_blank', 'overlay']),
  /**
   * @ignore
   */
  pulseAnimate: PropTypes.bool,
  /**
   * The href of the component.
   */
  url: PropTypes.string,
  /**
   * The content of the button.
   */
  children: PropTypes.node,
  /**
   * Adds a hover effect to the button.
   */
  openAsOverlay: PropTypes.bool,
};

export default Button;
