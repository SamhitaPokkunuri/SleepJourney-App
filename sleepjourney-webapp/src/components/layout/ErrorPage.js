import { Fragment } from 'react';
import NextLink from 'next/link';
import { styled, css } from '@mui/material/styles';
import MuiBox from '@mui/material/Box';
import MuiButton from '@mui/material/Button';

import {
  Footer,
  Meta,
  Header,
  Main,
  Section,
  Icon,
  Heading,
  Paragraph,
  PopularLinks,
} from 'components';

const StyledErrorPage = styled(MuiBox)(
  ({ theme }) => css`
    text-align: center;

    .react-svg-icon {
      font-size: 90px;

      ${theme.breakpoints.up('md')} {
        font-size: 120px;
      }
    }

    .button {
      border-radius: 0;
      min-width: 230px;
      width: 100%;
      padding: ${theme.spacing(1.1, 1)};

      ${theme.breakpoints.up('sm')} {
        width: auto;
      }

      ${theme.breakpoints.up('md')} {
        margin-top: ${theme.spacing(2)};
      }
    }
  `
);

export default function ErrorPage() {
  return (
    <Fragment>
      <Meta />
      <Header />
      <Main>
        <Section paddingBottom>
          <StyledErrorPage>
            <Icon icon="HelpWarning" fontSize="inherit" />
            <Heading variant="h4" align="center">
              Oops! The page you were trying to reach does not exist
            </Heading>
            <Paragraph align="center">
              To help get you where you need to be, find links to some of our
              most popular content below. Alternatively, you can visit our&nbsp;
              <NextLink href="/" passHref>
                <a title="Vodafone site map">site map</a>
              </NextLink>
              .
            </Paragraph>
            <Paragraph align="center">
              For Vodafone customer service, please select your local website.
            </Paragraph>
            <NextLink href="/" passHref>
              <MuiButton
                color="secondary"
                variant="contained"
                disableElevation
                className="button"
              >
                Return to home
              </MuiButton>
            </NextLink>
          </StyledErrorPage>
          <PopularLinks title="Popular links" />
        </Section>
      </Main>
      <Footer />
    </Fragment>
  );
}
