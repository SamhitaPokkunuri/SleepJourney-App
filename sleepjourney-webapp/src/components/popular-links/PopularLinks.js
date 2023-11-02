import NextLink from 'next/link';
import { styled, css } from '@mui/material/styles';
import MuiBox from '@mui/material/Box';
import MuiButton from '@mui/material/Button';
import MuiTypography from '@mui/material/Typography';

import { Paragraph } from 'components';

const StyledPopularLinks = styled(MuiBox, {
  shouldForwardProp: (prop) => /(marginTop)/.test(prop) === false,
})(
  ({ theme, marginTop }) => css`
    text-align: center;
    margin-top: ${theme.spacing(marginTop)};

    .subTitle {
      ${theme.breakpoints.up('md')} {
        font-size: 2.125rem;
        line-height: 2.5rem;
      }
    }

    .linkButton {
      margin: 10px 10px 0;
      background-color: ${theme.palette.tertiary.main};
      color: ${theme.palette.tertiary.contrastText};

      &:hover {
        background-color: #f5f5f5;
      }
    }
  `
);

export default function PopularLinks({ title, searchTitle }) {
  const marginTop = searchTitle ? 0 : 4;

  return (
    <StyledPopularLinks marginTop={marginTop}>
      {title && (
        <Paragraph align="center">
          <strong>{title}</strong>
        </Paragraph>
      )}
      {searchTitle && (
        <MuiTypography className="subTitle" variant="h3" align="center">
          {searchTitle}
        </MuiTypography>
      )}
      <NextLink href="/news" passHref>
        <MuiButton
          className="linkButton"
          color="inherit"
          variant="contained"
          disableElevation
          component="a"
        >
          News
        </MuiButton>
      </NextLink>
      <NextLink href="/news/digital-society" passHref>
        <MuiButton
          className="linkButton"
          color="inherit"
          variant="contained"
          disableElevation
          component="a"
        >
          Digital Society
        </MuiButton>
      </NextLink>
      <NextLink href="/our-purpose" passHref>
        <MuiButton
          className="linkButton"
          color="inherit"
          variant="contained"
          disableElevation
          component="a"
        >
          Vodafone Business
        </MuiButton>
      </NextLink>
      <NextLink href="https://careers.vodafone.com/" passHref>
        <MuiButton
          className="linkButton"
          target="_blank"
          color="inherit"
          variant="contained"
          disableElevation
        >
          Careers
        </MuiButton>
      </NextLink>
    </StyledPopularLinks>
  );
}
