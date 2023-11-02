import PropTypes from 'prop-types';
import clsx from 'clsx';
import { styled, css } from '@mui/material/styles';
import MuiBox from '@mui/material/Box';
import MuiTypography from '@mui/material/Typography';

const StyledImageCaption = styled(MuiBox)(
  ({ theme }) => css`
    margin: 0 auto;

    ${theme.breakpoints.up('md')} {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
    }

    &.blackFigcaption {
      background: rgba(0, 0, 0, 0.25);
      padding: 12px 20px;
      color: white;
      text-align: center;

      br {
        display: none;
      }
    }

    &.redFigcaption {
      background: ${theme.palette.common.red};
      color: ${theme.palette.common.white};
      width: 100%;

      ${theme.breakpoints.up('md')} {
        background: transparent;
        width: 100%;
        max-width: ${theme.containers.values.md}px;
        position: absolute;
        top: 50%;
        bottom: auto;
        transform: translateY(-50%);
        padding: ${theme.spacing(0, 2)};
        margin: ${theme.spacing(0, 1.1)};
      }

      ${theme.breakpoints.up('lg')} {
        margin: 0 auto;
      }
    }
  `
);

const StyledMuiTypography = styled(MuiTypography)(
  ({ theme }) => css`
    margin: 0;

    ${theme.breakpoints.down('md')} {
      br {
        display: none;
      }
    }

    ${theme.breakpoints.up('md')} {
      white-space: pre-line;
    }

    &.redCaption {
      padding: ${theme.spacing(2, 1.1)};
      margin: 0 auto;
      max-width: ${theme.containers.values.sm}px;

      ${theme.breakpoints.up('sm')} {
        padding: ${theme.spacing(1.7, 0, 2.5)};
        width: 83.33333%;
      }

      ${theme.breakpoints.up('md')} {
        box-shadow: 20px 0 0 ${theme.palette.common.alphaRed},
          -20px 0 0 ${theme.palette.common.alphaRed};
        padding: 3px 0 2px;
        display: inline;
        background-color: ${theme.palette.common.alphaRed};
      }
    }

    &.largeCaption {
      ${theme.breakpoints.up('md')} {
        font-size: 4.5rem;
        line-height: 5rem;
      }
    }
  `
);

export default function ImageCaption(props) {
  const {
    children,
    heading = 'h1',
    size = 'default',
    color = 'black',
    ...rest
  } = props;

  return (
    <StyledImageCaption
      component="figcaption"
      className={clsx({
        redFigcaption: color === 'red',
        blackFigcaption: color === 'black',
      })}
    >
      <StyledMuiTypography
        className={clsx({
          redCaption: color === 'red',
          largeCaption: size === 'large',
        })}
        variant={heading}
        {...rest}
      >
        {children}
      </StyledMuiTypography>
    </StyledImageCaption>
  );
}

ImageCaption.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  heading: PropTypes.oneOf(['h1', 'h2', 'h3']),
  size: PropTypes.oneOf(['default', 'large']),
  color: PropTypes.oneOf(['black', 'red']),
};
