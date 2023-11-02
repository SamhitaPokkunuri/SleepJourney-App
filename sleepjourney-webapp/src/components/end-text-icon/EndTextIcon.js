import PropTypes from 'prop-types';
import { styled, css } from '@mui/material/styles';
import MuiBox from '@mui/material/Box';

import { Icon } from 'components';

const StyledEndTextIcon = styled(MuiBox, {
  shouldForwardProp: (prop) => /(greyCircle)/.test(prop) === false,
})(
  ({ theme, greyCircle }) => css`
    display: inline-flex;
    align-items: center;

    .endTextIcon {
      display: inline-flex;
      color: ${greyCircle
        ? theme.palette.common.darkGrey
        : theme.palette.common.red};
      margin: ${theme.spacing(0, 0, 0, 1)};
      padding: 0;
      transition: all 0.5s;
    }
  `
);

function AddIcon({ children, icon, iconSize, greyCircle }) {
  const splitText = children.trim().split(' ');
  const endText = splitText.pop();

  return (
    <>
      {`${splitText.join(' ')} `}
      <StyledEndTextIcon component="span" greyCircle={greyCircle}>
        {endText}
        <span className="endTextIcon">
          <Icon icon={icon} iconSet="global" fontSize={iconSize} />
        </span>
      </StyledEndTextIcon>
    </>
  );
}

function EndTextIcon({ children, ...rest }) {
  if (children && typeof children === 'object') {
    if (Array.isArray(children)) {
      return children.map((item, index) => {
        if (children.length - 1 === index) {
          return (
            <EndTextIcon key={index} {...rest}>
              {item.props?.children || item}
            </EndTextIcon>
          );
        }

        return item;
      });
    }

    return <EndTextIcon {...rest}>{children.props.children}</EndTextIcon>;
  }

  if (typeof children === 'string') {
    return <AddIcon {...rest}>{children}</AddIcon>;
  }

  return null;
}

EndTextIcon.defaultProps = {
  icon: 'ChevronRightCircle',
  iconSize: 'extra-small',
  greyCircle: false,
};

EndTextIcon.propTypes = {
  /**
   * The content of the component.
   */
  children: PropTypes.node.isRequired,
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
   * Adds a grey background circle to the icon.
   */
  greyCircle: PropTypes.bool,
};

export default EndTextIcon;
