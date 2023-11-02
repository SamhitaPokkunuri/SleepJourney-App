import { styled, css } from '@mui/material/styles';
import MuiDivider from '@mui/material/Divider';

const StyledSeparator = styled(MuiDivider)(
  ({ theme }) => css`
    background-color: ${theme.palette.common.spanishGrey};
    width: 50%;
    margin: ${theme.spacing(4, 'auto')};

    ${theme.breakpoints.up('md')} {
      margin: ${theme.spacing(6, 'auto')};
    }

    &.fullWidth {
      width: 100%;
    }

    &.dots {
      background-color: transparent;
      border-bottom: 1px dotted ${theme.palette.common.spanishGrey};
    }
  `
);

const styles = {
  'is-style-wide': 'fullWidth',
  'is-style-dots': 'dots',
};

export default function Separator({ className }) {
  const styleClass = styles[className];

  return <StyledSeparator className={styleClass} />;
}
