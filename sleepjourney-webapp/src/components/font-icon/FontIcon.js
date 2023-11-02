import PropTypes from 'prop-types';
import clsx from 'clsx';
import { styled, css } from '@mui/material/styles';
import MuiBox from '@mui/material/Box';

import capitalise from 'utils/capitalise';

const StyledFontIcon = styled(MuiBox, {
  shouldForwardProp: (prop) => /(color|icon)/.test(prop) === false,
})(({ theme, color, icon }) => {
  const col = color === 'inherit' ? 'inherit' : theme.palette.common[color];
  const icn = theme.icons[icon];

  return css`
    color: ${col};
    text-decoration: none;
    display: inline-block;
    width: auto;
    height: 1em;
    font-size: 2rem;
    line-height: 1;
    overflow: hidden;
    flex-shrink: 0;

    &:before {
      font-family: VodafoneIcons;
      display: block;
      content: ${icn};
    }

    &.fontSizeInherit {
      font-size: inherit;
    }

    &.fontSizeSmall {
      font-size: 1.5rem;
    }

    &.fontSizeLarge {
      font-size: 2.5rem;
    }

    &.pointer {
      cursor: pointer;
    }
  `;
});

function FontIcon(props) {
  const { className, color, fontSize, icon, pointer, ...rest } = props;

  return (
    <StyledFontIcon
      component="span"
      role="img"
      className={clsx(className, {
        [`fontSize${capitalise(fontSize)}`]: fontSize !== 'default',
        pointer,
      })}
      color={color}
      icon={icon}
      {...rest}
    />
  );
}

FontIcon.propTypes = {
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The color of the icon.
   */
  color: PropTypes.oneOf([
    'inherit',
    'white',
    'shadeGrey',
    'lightGrey',
    'gainsboro',
    'silver',
    'mediumGrey',
    'spanishGrey',
    'grey',
    'dimGrey',
    'darkGrey',
    'black',
  ]),
  /**
   * The font size of the icon.
   */
  fontSize: PropTypes.oneOf(['inherit', 'default', 'small', 'large']),
  /**
   * The icon to display.
   */
  icon: PropTypes.oneOf([
    'chevronUp',
    'chevronRight',
    'chevronDown',
    'chevronLeft',
    'chevronUpFill',
    'chevrontRightFill',
    'chevronDownFill',
    'chevrontLeftFill',
    'chevronRightLG',
    'chevronLeftLG',
    'chevronUpXL',
    'chevronDownXL',
    'arrowLeft',
    'close',
    'globe',
    'hamburger',
    'search',
    'download',
    'popOut',
    'tick',
    'email',
    'emailFill',
    'facebook',
    'facebookFill',
    'linkedin',
    'linkedinFill',
    'twitter',
    'twitterFill',
    'instagram',
    'youtube',
    'account',
  ]).isRequired,
  /**
   * Sets a pointer cursor on hover.
   */
  pointer: PropTypes.bool,
};

FontIcon.defaultProps = {
  color: 'darkGrey',
  fontSize: 'default',
  pointer: false,
};

export default FontIcon;
