import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import NextLink from 'next/link';
import { styled, css } from '@mui/material/styles';
import MuiButton from '@mui/material/Button';

import { Icon } from 'components';

const StyledIconButton = styled(MuiButton, {
  shouldForwardProp: (prop) => /(customColors|outline)/.test(prop) === false,
})(
  ({ theme, customColors, outline }) => css`
    &.iconButton {
      font-weight: 700;
      padding: ${theme.spacing(0, 2)};
      color: ${customColors?.text || theme.palette.common.darkGrey};
      background-color: ${customColors?.background};
      border-radius: ${theme.spacing(3)};
      border: ${outline ? '2px solid' : 'none'};
      min-height: 50px;
      box-shadow: ${theme.cards.boxShadow};

      ${theme.breakpoints.up('md')} {
        font-size: 1.125rem;
      }

      .MuiButton-startIcon {
        margin-right: ${theme.spacing(1)};

        [class*='is-line'] path:not([class*='no-fill']) {
          fill: ${customColors?.text};
        }

        [class*='is-line'] path:not([class*='no-stroke']) {
          stroke: ${customColors?.text};
        }
      }

      &.chevronButton {
        width: 100%;

        ${theme.breakpoints.up('sm')} {
          width: auto;
          min-width: 340px;
        }

        .MuiButton-startIcon {
          margin-right: ${theme.spacing(1.5)};
        }

        span:nth-of-type(2) {
          margin-right: ${theme.spacing(1)};

          ${theme.breakpoints.up('sm')} {
            margin-right: ${theme.spacing(4)};
          }
        }

        .MuiButton-endIcon {
          color: ${customColors?.background
            ? theme.palette.common.white
            : theme.palette.common.red};
          margin-left: auto;
          padding: 0;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1) 0ms;
        }
      }

      &:hover {
        color: ${theme.palette.common.red};
        background-color: ${theme.palette.common.white};
        border-color: ${theme.palette.common.white};

        .MuiButton-startIcon {
          & [class*='is-line'] path:not([class*='no-fill']) {
            fill: ${theme.palette.common.red};
          }

          & [class*='is-line'] path:not([class*='no-stroke']) {
            stroke: ${theme.palette.common.red};
          }
        }

        .MuiButton-endIcon {
          color: ${theme.palette.common.red};
        }
      }
    }
  `
);

const Button = forwardRef(function Button(props, ref) {
  const {
    anchor,
    chevron,
    children,
    customColors,
    icon,
    iconSet,
    outline,
    ...rest
  } = props;

  return (
    <StyledIconButton
      id={anchor}
      className={clsx('iconButton', {
        chevronButton: chevron,
      })}
      startIcon={<Icon icon={icon} iconSet={iconSet} fontSize="small" />}
      endIcon={
        chevron && (
          <Icon icon="ChevronRightCircle" iconSet="global" fontSize="small" />
        )
      }
      ref={ref}
      customColors={customColors}
      outline={outline}
      {...rest}
    >
      <span>{children}</span>
    </StyledIconButton>
  );
});

function IconButton(props) {
  const { href, ...rest } = props;

  return href ? (
    <NextLink href={href} passHref>
      <Button {...rest} />
    </NextLink>
  ) : (
    <Button {...rest} />
  );
}

IconButton.propTypes = {
  /**
   * @ignore
   */
  anchor: PropTypes.string,
  /**
   * The content of the button.
   */
  children: PropTypes.node.isRequired,
  /**
   * Adds a chevron icon after the text of the button.
   */
  chevron: PropTypes.bool,
  /**
   * The color variant of the button.
   */
  customColors: PropTypes.shape({
    background: PropTypes.string,
    text: PropTypes.string,
  }),
  /**
   * The href of the component.
   */
  href: PropTypes.string,
  /**
   * Icon placed after the children.
   */
  icon: PropTypes.string,
  /**
   * The name of the icon set.
   */
  iconSet: PropTypes.oneOf(['group', 'global']),
  /**
   * Adds an outline to the component.
   */
  outline: PropTypes.bool,
};

IconButton.defaultProps = {
  iconSet: 'group',
  outline: false,
};

export default IconButton;
