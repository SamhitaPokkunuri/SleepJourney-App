import { styled, css } from '@mui/material/styles';
import MuiBox from '@mui/material/Box';
import MuiContainer from '@mui/material/Container';
import MuiTypography from '@mui/material/Typography';

const StyledFeaturedText = styled(MuiBox)(
  ({ theme }) => css`
    background: ${theme.palette.common.white};
    position: relative;
    padding: ${theme.spacing(4, 1.1)};
    min-height: 190;
    display: flex;
    flex-direction: column;

    ${theme.breakpoints.up('sm')} {
      min-height: 230px;
    }

    ${theme.breakpoints.up('md')} {
      min-height: 400px;
      padding: ${theme.spacing(6, 1.1)};
    }

    .text {
      ${theme.breakpoints.up('sm')} {
        max-width: 83.33333%;
        margin-left: 8.33333%;
      }

      ${theme.breakpoints.up('lg')} {
        max-width: 66.66667%;
        margin-left: 16.66667%;
      }
    }

    .container {
      flex: 1 1 auto;
      display: flex;
      align-items: center;
      width: 100%;

      ${theme.breakpoints.up('sm')} {
        max-width: ${theme.containers.values.sm}px;
      }

      ${theme.breakpoints.up('md')} {
        max-width: ${theme.containers.values.md}px;
      }
    }
  `
);

export default function FeaturedText(props) {
  const { title } = props;

  return (
    <StyledFeaturedText>
      <MuiContainer fixed className="container">
        <MuiTypography variant="h1" className="text">
          {title}
        </MuiTypography>
      </MuiContainer>
    </StyledFeaturedText>
  );
}
