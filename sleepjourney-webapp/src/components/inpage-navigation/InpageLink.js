import { styled, css } from '@mui/material/styles';
import MuiLink from '@mui/material/Link';

const StyledInpageLink = styled(MuiLink)(
  ({ theme }) => css`
    color: ${theme.palette.common.white};
    font-size: 1rem;
    display: inline-block;
    transition: opacity 300ms ease-in-out;
    font-weight: 700;
    cursor: pointer;
    padding: ${theme.spacing(0, 1.6)};
    line-height: 1.5rem;
    max-width: 480;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;

    &.active {
      opacity: 0.5;
    }

    &:hover {
      text-decoration: none;
      opacity: 0.75;
    }

    ${theme.breakpoints.up(480)} {
      padding: ${theme.spacing(0, 2.4)};
    }

    ${theme.breakpoints.up('sm')} {
      font-size: 1.125rem;
    }

    ${theme.breakpoints.up('md')} {
      padding: ${theme.spacing(0, 3.2)};
    }
  `
);

export default function InpageLink(props) {
  const { title, anchor } = props;

  return (
    <StyledInpageLink href={anchor} underline="hover">
      {title}
    </StyledInpageLink>
  );
}
