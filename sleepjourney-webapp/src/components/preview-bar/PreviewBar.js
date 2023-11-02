import NextLink from 'next/link';
import { styled, css } from '@mui/material/styles';
import MuiBox from '@mui/material/Box';
import MuiContainer from '@mui/material/Container';

const StyledPreviewBar = styled(MuiBox)(
  ({ theme }) => css`
    padding: ${theme.spacing(1.2, 1.6)};
    line-height: 1.625rem;
    color: rgb(13, 60, 97);
    background-color: rgb(232, 244, 253);
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    border-radius: 0;
    z-index: 1000;

    & > container {
      ${theme.breakpoints.up('md')} {
        max-width: ${theme.containers.values.xl}px;
      }
    }
  `
);

export default function PreviewBar() {
  return (
    <StyledPreviewBar>
      <MuiContainer className="container">
        This is page is a preview.{' '}
        <NextLink href="/api/exit-preview">Click here</NextLink> to exit preview
        mode.
      </MuiContainer>
    </StyledPreviewBar>
  );
}
