import parse from 'html-react-parser';
import PropTypes from 'prop-types';
import NextLink from 'next/link';
import clsx from 'clsx';
import { styled, css } from '@mui/material/styles';

import { EndTextIcon } from 'components';

const StyledLink = styled('a', {
  shouldForwardProp: (prop) => /(customColors)/.test(prop) === false,
})(
  ({ theme, customColors }) => css`
    text-decoration: none;
    color: ${customColors?.text || 'inherit'};
    cursor: pointer;

    &.animateLink {
      &:hover {
        .endTextIcon {
          transform: translateX(10px);
        }
      }
    }

    &.backgroundLink {
      &:before {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
      }
    }

    &.largeLink {
      font-weight: 900;
      font-size: 1.25rem;
      line-height: 1.25rem;

      ${theme.breakpoints.up('sm')} {
        font-size: 1.5rem;
        line-height: 1.5rem;
      }

      ${theme.breakpoints.up('md')} {
        font-size: 1.75rem;
        line-height: 1.75rem;
      }
    }
  `
);

const LinkTag = React.forwardRef(function LinkTag(props, ref) {
  const {
    animate,
    backgroundLink,
    children,
    customColors,
    greyCircle,
    icon,
    iconSize,
    largeLink,
    showIcon,
    ...rest
  } = props;

  const parsedChildren =
    typeof children === 'string' ? parse(children) : children;

  return (
    <StyledLink
      className={clsx({
        animateLink: animate,
        backgroundLink: backgroundLink,
        largeLink: largeLink,
      })}
      ref={ref}
      customColors={customColors}
      {...rest}
    >
      {showIcon ? (
        <EndTextIcon icon={icon} iconSize={iconSize} greyCircle={greyCircle}>
          {parsedChildren}
        </EndTextIcon>
      ) : (
        parsedChildren
      )}
    </StyledLink>
  );
});

function Link(props) {
  const { href, ...rest } = props;

  return href ? (
    <NextLink href={href} passHref>
      <LinkTag {...props} />
    </NextLink>
  ) : (
    <LinkTag {...rest} />
  );
}

Link.defaultProps = {
  animate: false,
  backgroundLink: false,
  greyCircle: false,
  icon: 'ChevronRightCircle',
  largeLink: false,
  showIcon: false,
};

Link.propTypes = {
  /**
   * Animates the icon button.
   */
  animate: PropTypes.bool,
  /**
   * Makes whole containing element clickable.
   */
  backgroundLink: PropTypes.bool,
  /**
   * The content of the component.
   */
  children: PropTypes.node.isRequired,
  /**
   * The color variant of the link.
   */
  customColors: PropTypes.shape({
    text: PropTypes.string,
  }),
  /**
   * Adds a grey background circle to the icon.
   */
  greyCircle: PropTypes.bool,
  /**
   * The href of the link.
   */
  href: PropTypes.string,
  /**
   * Icon placed after the children.
   */
  icon: PropTypes.oneOf([
    'ChevronRight',
    'ChevronRightCircle',
    'ChevronRightCircleColor',
    'PopOut',
    'PopOutCircle',
    'PopOutFoundation',
    'PopOutFoundationCircle',
    'OverlayInfo',
    'OverlayInfoCircle',
  ]),
  /**
   * The size of the icon.
   */
  iconSize: PropTypes.oneOf([
    'inherit',
    'extra-small',
    'small',
    'medium',
    'large',
    'extra-large',
  ]),
  /**
   * The size of the link.
   */
  largeLink: PropTypes.bool,
  /**
   * Displays the icon after the text.
   */
  showIcon: PropTypes.bool,
};

export default Link;
