import { useContext } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { styled, css } from '@mui/material/styles';
import MuiBox from '@mui/material/Box';

import useWidthStyles from 'utils/useWidthStyles';
import useDisplayStyles from 'utils/useDisplayStyles';
import { ThemeContext } from 'components/layout/FoundationPage';

const StyledQuote = styled(MuiBox, {
  shouldForwardProp: (prop) => /(color|isCorporate)/.test(prop) === false,
})(
  ({ theme, color, isCorporate }) => css`
    max-width: ${isCorporate ? '895px' : '525px'};
    margin: 24px auto 40px;
    text-align: center;

    a {
      color: inherit;

      &:hover {
        color: inherit;
      }
    }

    .blockquote {
      font-weight: 400;
      color: ${theme.palette.common[color]};
      position: relative;
      padding: 0 16px;
      margin: 48px 0 24px;
      font-size: 1.875rem;
      line-height: 1.875rem;
      display: inline-block;

      p {
        margin: 0;
      }

      strong,
      b {
        font-weight: 900;
      }

      &::before,
      &::after {
        font-weight: 900;
        font-size: 5.5rem;
        color: ${theme.palette.common.red};
        position: absolute;
      }

      &::before {
        display: block;
        content: '\\201C';
        top: -30px;
        left: calc(50% - 20px);
      }

      ${theme.breakpoints.up('sm')} {
        font-size: 2.5rem;
        line-height: 2.5rem;
        padding: 0 60px;
        margin: 32px 0;

        &::before {
          left: 0;
          top: 0;
          padding: 0;
        }

        &::after {
          right: 0;
          display: block;
          content: '\\201D';
          bottom: -40px;
        }
      }

      ${theme.breakpoints.up('md')} {
        font-size: 3.125rem;
        line-height: 3.125rem;
      }
    }

    .citation {
      color: ${theme.palette.common[color]};
      font-size: 1rem;
      line-height: 1.5rem;

      strong {
        display: block;
        font-weight: 900;
      }

      ${theme.breakpoints.up('sm')} {
        font-size: 1.125rem;
        line-height: 1.75rem;
        margin: 0 40px;
      }

      ${theme.breakpoints.up('md')} {
        font-size: 1.25rem;
        line-height: 1.875rem;
      }
    }

    &.roaming {
      max-width: none;

      ${theme.breakpoints.up('md')} {
        text-align: left;
        display: flex;
        align-items: center;

        .blockquote {
          font-size: 2.5rem;
          line-height: 2.875rem;
          margin-right: 40px;
        }
      }

      .citation {
        margin: 0;
        flex-shrink: 0;
        padding: 30px 0 0;
        position: relative;

        br {
          display: none;
        }

        &:before {
          height: 4px;
          width: 196px;
          position: absolute;
          content: '';
          top: 0;
          left: calc(50% - 98px);
          background: ${theme.palette.common.red};
        }

        ${theme.breakpoints.up('md')} {
          padding: 30px;

          &:before {
            height: 100%;
            width: 4px;
            left: 0;
          }
        }
      }
    }
  `
);

function Quote(props) {
  const {
    citation,
    className,
    responsiveControl,
    value,
    variant,
    widthControlExt,
  } = props;

  let color = 'inherit';
  if (className && className.includes('vdf-text-vodafonered')) {
    color = 'red';
  } else if (className && className.includes('vdf-text-white')) {
    color = 'white';
  } else if (className && className.includes('vdf-text-darkgrey')) {
    color = 'darkGrey';
  }

  const context = useContext(ThemeContext);
  const widthStyles = useWidthStyles(widthControlExt);
  const displayStyles = useDisplayStyles(responsiveControl);

  return (
    <StyledQuote
      component="figure"
      sx={{ ...widthStyles, ...displayStyles }}
      color={color}
      isCorporate={context === 'corporate'}
      className={clsx({
        [variant]: variant !== 'default',
      })}
    >
      <blockquote
        className="blockquote"
        dangerouslySetInnerHTML={{ __html: value }}
      />
      {citation && (
        <figcaption
          className="citation"
          dangerouslySetInnerHTML={{ __html: citation }}
        />
      )}
    </StyledQuote>
  );
}

Quote.defaultProps = {
  variant: 'default',
};

Quote.propTypes = {
  /**
   * The source of the quote.
   */
  citation: PropTypes.string,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * @ignore
   */
  responsiveControl: PropTypes.shape({
    mobile: PropTypes.bool,
    tablet: PropTypes.bool,
    desktop: PropTypes.bool,
  }),
  /**
   * The content of the quote.
   */
  value: PropTypes.string.isRequired,
  /**
   * The variant of the component.
   */
  variant: PropTypes.oneOf(['default', 'roaming']),
  /**
   * @ignore
   */
  widthControlExt: PropTypes.shape({
    mobile: PropTypes.number,
    tablet: PropTypes.number,
    desktop: PropTypes.number,
  }),
};

export default Quote;
