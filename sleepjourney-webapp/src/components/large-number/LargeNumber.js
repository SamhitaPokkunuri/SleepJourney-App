import clsx from 'clsx';
import { styled, css } from '@mui/material/styles';
import MuiTypography from '@mui/material/Typography';

const StyledLargeNumber = styled(MuiTypography, {
  shouldForwardProp: (prop) => /(align|numberSize)/.test(prop) === false,
})(
  ({ theme, align, numberSize }) => css`
    text-align: ${align};
    font-weight: 700;
    font-size: 70px;
    line-height: 80px;

    ${theme.breakpoints.up('md')} {
      font-size: 100px;
      line-height: 115px;
    }

    &.vdf-text-vodafonered {
      color: ${theme.palette.common.red};
    }

    &.is-style-dropcase span {
      font-size: 50px;
    }

    &.fontSizeLarge {
      font-size: 125px;
      line-height: 110px;

      ${theme.breakpoints.up('sm')} {
        font-size: 250px;
        line-height: 188px;
      }

      ${theme.breakpoints.up('md')} {
        font-size: ${numberSize}px;
        line-height: 200px;
      }

      &.is-style-dropcase span {
        font-size: 100px;
      }
    }
  `
);

export default function LargeNumber(props) {
  const { align, value, numberSize, className } = props;

  const classNames = clsx(className, {
    fontSizeLarge: parseInt(numberSize) === 260,
  });

  // number values
  const splitVal = value.split('');
  let editVal = '';

  for (let i = 0; i < splitVal.length; i += 1) {
    // eslint-disable-next-line no-restricted-globals
    if (isNaN(splitVal[i]) && i + 1 === splitVal.length) {
      editVal += `<span>${splitVal[i]}</span>`;
    } else {
      editVal += splitVal[i];
    }
  }

  return (
    <StyledLargeNumber
      className={classNames}
      variant="h3"
      dangerouslySetInnerHTML={{ __html: editVal }}
      align={align}
      numberSize={numberSize}
    />
  );
}
