import { useContext } from 'react';
import parse from 'html-react-parser';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { styled, css } from '@mui/material/styles';
import MuiTypography from '@mui/material/Typography';

import useWidthStyles from 'utils/useWidthStyles';
import useDisplayStyles from 'utils/useDisplayStyles';
import { ThemeContext } from '../layout/FoundationPage';
import { Link } from 'components';

const StyledHeader = styled(MuiTypography, {
  shouldForwardProp: (prop) => /(align|color)/.test(prop) === false,
})(({ theme, align, color }) => {
  const col = color === 'inherit' ? 'inherit' : theme.palette.common[color];

  return css`
    color: ${col};
    text-align: ${align};

    &.foundationH2 {
      font-size: 3rem;
      line-height: 3.125rem;
      margin-bottom: ${theme.spacing(1)};

      ${theme.breakpoints.up('sm')} {
        font-size: 3.75rem;
        line-height: 3.75rem;
        margin-bottom: ${theme.spacing(3)};
      }

      ${theme.breakpoints.up('md')} {
        font-size: 5.625rem;
        line-height: 5.625rem;
      }
    }

    &.foundationH3 {
      font-size: 1.75rem;
      line-height: 2.125rem;
      margin-bottom: ${theme.spacing(1)};

      ${theme.breakpoints.up('sm')} {
        font-size: 2rem;
        line-height: 2rem;
        margin-bottom: ${theme.spacing(3)};
      }

      ${theme.breakpoints.up('md')} {
        font-size: 2.5rem;
        line-height: 2.5rem;
      }
    }

    &.thinFontWeight {
      font-weight: 300;

      & strong,
      & b {
        font-weight: 300;
      }
    }

    &.mixedFontWeight {
      font-weight: 300;

      & strong,
      & b {
        font-weight: 900;
      }
    }

    .has-white-color {
      color: ${theme.palette.common.white};
    }

    .has-darkgrey-color {
      color: ${theme.palette.common.darkGrey};
    }

    .has-grey-color {
      color: ${theme.palette.common.grey};
    }

    .has-vodafonered-color {
      color: ${theme.palette.common.red};
    }
  `;
});

function Heading(props) {
  const {
    align,
    children,
    className,
    color,
    component,
    fontWeight,
    responsiveControl,
    variant,
    widthControlExt,
  } = props;

  const context = useContext(ThemeContext);
  const isFoundation = context === 'foundation';
  const widthStyles = useWidthStyles(widthControlExt, isFoundation, align);
  const displayStyles = useDisplayStyles(responsiveControl);
  const hasLink = /^<a.*>/.test(children);
  const parsedChildren =
    typeof children === 'string' ? parse(children) : children;

  return (
    <StyledHeader
      className={clsx(className, {
        thinFontWeight: fontWeight === 'thin',
        mixedFontWeight: fontWeight === 'mixed',
        foundationH1: isFoundation && variant === 'h1',
        foundationH2: isFoundation && (variant === 'h1' || variant === 'h2'),
        foundationH3: isFoundation && variant === 'h3',
      })}
      variant={variant}
      component={component}
      sx={{ ...widthStyles, ...displayStyles }}
      align={align}
      color={color}
    >
      {hasLink ? (
        <Link {...parsedChildren.props} showIcon animate />
      ) : (
        parsedChildren
      )}
    </StyledHeader>
  );
}

Heading.defaultProps = {
  align: 'inherit',
  color: 'inherit',
  fontWeight: 'default',
  variant: 'h2',
};

Heading.propTypes = {
  /**
   * Set the text-align on the component.
   */
  align: PropTypes.oneOf(['inherit', 'left', 'center', 'right', 'justify']),
  /**
   * The content of the component.
   */
  children: PropTypes.node.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   */
  color: PropTypes.oneOf(['inherit', 'white', 'grey', 'darkGrey', 'red']),
  /**
   * The component used for the root node. Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * Used to apply font-weight on the component.
   */
  fontWeight: PropTypes.oneOf(['default', 'thin', 'mixed']),
  /**
   * @ignore
   */
  responsiveControl: PropTypes.shape({
    mobile: PropTypes.bool,
    tablet: PropTypes.bool,
    desktop: PropTypes.bool,
  }),
  /**
   * Applies the theme typography styles.
   */
  variant: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']),
  /**
   * @ignore
   */
  widthControlExt: PropTypes.shape({
    mobile: PropTypes.number,
    tablet: PropTypes.number,
    desktop: PropTypes.number,
  }),
};

export default Heading;
