import PropTypes from 'prop-types';
import { ReactSVG } from 'react-svg';
import clsx from 'clsx';
import { styled, css } from '@mui/material/styles';

import fromPascalCaseIntoKebabCase from 'utils/fromPascalCaseIntoKebabCase';
import capitalise from 'utils/capitalise';

const StyledIcon = styled(ReactSVG)(
  ({ theme }) => css`
    &.react-svg-icon {
      display: inline-flex;
      flex-shrink: 0;

      > span {
        display: flex;
      }

      svg {
        display: block;
        font-size: inherit;
        height: 1em;
        width: 1em;
      }
    }

    &.fontSizeExtraSmall svg {
      font-size: 16px;
    }

    &.fontSizeSmall svg {
      font-size: 24px;
    }

    &.fontSizeMedium svg {
      font-size: 40px;
    }

    &.fontSizeLarge svg {
      font-size: 90px;
    }

    &.fontSizeExtraLarge svg {
      font-size: 160px;
    }

    &.filled {
      svg {
        fill: currentColor;
      }
    }

    &.outlined {
      border: 3px solid ${theme.palette.common.red};
      border-radius: 50%;
      padding: 16px;

      svg {
        font-size: 60px;
      }
    }
  `
);

function Icon(props) {
  const { className, fontSize, icon, iconSet, outlined } = props;
  const SVGIconName = fromPascalCaseIntoKebabCase(icon) + '.svg';
  const SVGIconPath = `/icons/${iconSet}/${SVGIconName}`;

  return (
    <StyledIcon
      role="img"
      wrapper="span"
      src={SVGIconPath}
      className={clsx('react-svg-icon', className, {
        [`fontSize${capitalise(fontSize, '-')}`]: fontSize !== 'inherit',
        filled: /(global)/.test(iconSet),
        outlined,
      })}
    />
  );
}

Icon.defaultProps = {
  iconSet: 'group',
  outlined: false,
  fontSize: 'large',
};

Icon.propTypes = {
  /**
   * The class name of the icon.
   */
  className: PropTypes.string,
  /**
   * The fontSize of the icon.
   */
  fontSize: PropTypes.oneOf([
    'inherit',
    'extra-small',
    'small',
    'medium',
    'large',
    'extra-large',
  ]),
  /**
   * The name of the icon.
   */
  icon: PropTypes.string.isRequired,
  /**
   * The name of the icon set.
   */
  iconSet: PropTypes.oneOf([
    'code-conduct',
    'foundation',
    'global',
    'group',
    'roaming-full-red',
    'roaming-full-white',
    'roaming-line-black-red',
    'roaming-line-gradient-red',
    'roaming-line-white',
    'roaming-line-white-red',
    'supply-chain',
  ]),
  /**
   * Adds a circle outline to the icon
   */
  outlined: PropTypes.bool,
};

export default Icon;
