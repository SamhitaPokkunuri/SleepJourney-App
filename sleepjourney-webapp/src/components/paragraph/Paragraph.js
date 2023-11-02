import { useContext } from 'react';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';
import clsx from 'clsx';
import { styled, css } from '@mui/material/styles';
import MuiTypography from '@mui/material/Typography';

import useWidthStyles from 'utils/useWidthStyles';
import useDisplayStyles from 'utils/useDisplayStyles';
import { ThemeContext } from '../layout/FoundationPage';

const StyledParagraph = styled(MuiTypography, {
  shouldForwardProp: (prop) => /(align|color)/.test(prop) === false,
})(({ theme, align, color }) => {
  const col = color === 'inherit' ? 'inherit' : theme.palette.common[color];

  return css`
    color: ${col};
    text-align: ${align};

    .number,
    .number-inline,
    .number-large {
      line-height: 1em;
      font-weight: 900;
    }

    .number,
    .number-inline {
      font-size: 2.25rem;

      ${theme.breakpoints.up('md')} {
        font-size: 2.75rem;
      }
    }

    .number,
    .number-large {
      display: block;
      margin-bottom: 16px;
    }

    .number-inline {
      display: inline-block;
    }

    .number-large {
      font-size: 3.75rem;

      ${theme.breakpoints.up('md')} {
        font-size: 6.25rem;
      }
    }

    .text-large {
      font-size: 1.125rem;

      ${theme.breakpoints.up('md')} {
        font-size: 1.5rem;
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

      strong {
        font-weight: 900;
      }
    }

    &.foundationBody {
      ${theme.breakpoints.up('md')} {
        font-size: 1.5rem;
        line-height: 1.75rem;
      }

      h1:first-of-type ~ & {
        font-size: 1.25rem;
        line-height: 1.5rem;

        ${theme.breakpoints.up('md')} {
          font-size: 1.875rem;
          line-height: 2.125rem;
        }
      }
    }

    &.caption {
      font-size: 0.875rem;
      line-height: 1rem;
      width: 80%;
      margin-left: auto;
      margin-right: auto;

      ${theme.breakpoints.up('md')} {
        font-size: 1rem;
        line-height: 1.25rem;
      }
    }
  `;
});

function Paragraph(props) {
  const {
    align,
    color,
    children,
    className,
    responsiveControl,
    widthControlExt,
  } = props;

  const isCaptionText = /vdf-caption-text/i.test(className);
  const context = useContext(ThemeContext);
  const isFoundation = context === 'foundation';
  const widthStyles = useWidthStyles(widthControlExt, isFoundation, align);
  const displayStyles = useDisplayStyles(responsiveControl);
  const parsedChildren =
    typeof children === 'string' ? parse(children) : children;

  return (
    <StyledParagraph
      className={clsx(className, {
        foundationBody: isFoundation,
        caption: isCaptionText,
      })}
      variant="body1"
      gutterBottom
      sx={{ ...widthStyles, ...displayStyles }}
      align={align}
      color={color}
    >
      {parsedChildren}
    </StyledParagraph>
  );
}

Paragraph.propTypes = {
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
   * @ignore
   */
  responsiveControl: PropTypes.shape({
    mobile: PropTypes.bool,
    tablet: PropTypes.bool,
    desktop: PropTypes.bool,
  }),
  /**
   * @ignore
   */
  widthControlExt: PropTypes.shape({
    mobile: PropTypes.number,
    tablet: PropTypes.number,
    desktop: PropTypes.number,
  }),
};

Paragraph.defaultProps = {
  align: 'inherit',
  color: 'inherit',
};

export default Paragraph;
