import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import NextLink from 'next/link';
import { styled, css } from '@mui/material/styles';
import MuiButton from '@mui/material/Button';

import { Icon } from 'components';
import capitalise from 'utils/capitalise';
import { pulse } from 'utils/cssAnimations';

const StyledChevronButton = styled(MuiButton, {
  shouldForwardProp: (prop) =>
    /(customColors|border|rounded)/.test(prop) === false,
})(
  ({ theme, customColors, border, rounded }) => css`
    width: 100%;
    border-radius: ${rounded ? theme.spacing(3) : '2px'};
    padding: ${rounded ? theme.spacing(1, 2, 1, 3) : undefined};
    border: ${border ? '2px solid' : 'none'};
    color: ${customColors?.text || theme.palette.common.darkGrey};
    background-color: ${customColors?.background || 'white'};
    box-shadow: ${theme.cards.boxShadow};

    &:hover {
      color: ${theme.palette.common.red};
      background-color: ${theme.palette.common.white};
      border-color: ${theme.palette.common.white};
    }

    ${theme.breakpoints.up('sm')} {
      width: auto;
      line-height: ${rounded ? '1.125rem' : undefined};
      padding: ${rounded ? theme.spacing(1, 2, 1, 3) : undefined};
    }

    ${theme.breakpoints.up('md')} {
      font-size: ${rounded ? '1.125rem' : undefined};
    }

    &.chevronButton {
      justify-content: space-between;

      .MuiButton-endIcon {
        color: ${customColors?.background === '#FFFFFF'
          ? theme.palette.common.red
          : theme.palette.common.white};
        margin: ${theme.spacing(0, 0, 0, 1)};
        transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0ms;

        ${theme.breakpoints.up('sm')} {
          margin-left: ${rounded ? theme.spacing(4) : theme.spacing(2)};
        }
      }

      &:hover {
        .MuiButton-endIcon {
          color: ${theme.palette.common.red};
        }
      }
    }

    &.alignLeft {
      text-align: left;
    }

    &.buttonSizeSmall {
      ${theme.breakpoints.up('md')} {
        padding-top: 5px;
        padding-bottom: 5px;
        font-size: 1.25rem;
      }
    }

    &.roundedButton {
      justify-content: space-between;
      line-height: 1rem;

      ${theme.breakpoints.up('sm')} {
        min-width: 340px;
      }
    }

    &.pulseButton {
      &:hover {
        &::after {
          animation: ${pulse} 3s ease-in-out infinite;
        }
      }

      &::after {
        content: '';
        display: block;
        height: 100%;
        left: 0;
        border: 2px solid
          ${customColors ? customColors.background : theme.palette.common.white};
        width: 100%;
        position: absolute;
        border-radius: 2px;
      }
    }
  `
);

const Button = forwardRef(function Button(props, ref) {
  const {
    children,
    customColors,
    icon,
    size,
    chevron,
    pulseAnimate,
    border,
    rounded,
    disabled,
    anchor,
    className,
    ...rest
  } = props;

  return (
    <StyledChevronButton
      id={anchor}
      className={clsx(className, {
        chevronButton: chevron || rounded,
        alignLeft: chevron,
        [`buttonSize${capitalise(size)}`]: size !== 'default',
        roundedButton: rounded,
        pulseButton: pulseAnimate,
      })}
      endIcon={
        (chevron || rounded) && (
          <Icon icon={icon} iconSet="global" fontSize="small" />
        )
      }
      disabled={disabled}
      ref={ref}
      customColors={customColors}
      border={border}
      rounded={rounded}
      {...rest}
    >
      <span dangerouslySetInnerHTML={{ __html: children }} />
    </StyledChevronButton>
  );
});

function ChevronButton(props) {
  const { href, ...rest } = props;

  return href ? (
    <NextLink href={href} passHref>
      <Button {...rest} />
    </NextLink>
  ) : (
    <Button {...rest} />
  );
}

ChevronButton.propTypes = {
  /**
   * @ignore
   */
  anchor: PropTypes.string,
  /**
   * Adds a thin border to the button.
   */
  border: PropTypes.bool,
  /**
   * Adds a chevron icon after the text of the button.
   */
  chevron: PropTypes.bool,
  /**
   * The content of the button.
   */
  children: PropTypes.node.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The color variant of the button.
   */
  customColors: PropTypes.shape({
    background: PropTypes.string,
    text: PropTypes.string,
  }),
  /**
   * Disables the button.
   */
  disabled: PropTypes.bool,
  /**
   * The href of the component.
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
   * Adds a hover effect to the button.
   */
  pulseAnimate: PropTypes.bool,
  /**
   * Changes the shape of the button.
   */
  rounded: PropTypes.bool,
  /**
   * The size of the button.
   */
  size: PropTypes.oneOf(['default', 'small']),
};

ChevronButton.defaultProps = {
  border: false,
  customColors: {
    background: 'rgb(230, 0, 0)',
    text: '#FFFFFF',
  },
  icon: 'ChevronRightCircle',
  pulseAnimate: false,
  size: 'default',
};

export default ChevronButton;
