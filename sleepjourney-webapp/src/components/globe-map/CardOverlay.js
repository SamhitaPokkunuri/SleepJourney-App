import { styled, css } from '@mui/material/styles';
import MuiBox from '@mui/material/Box';
import MuiButton from '@mui/material/Button';
import MuiDialog from '@mui/material/Dialog';
import MuiFade from '@mui/material/Fade';
import MuiGrid from '@mui/material/Grid';
import MuiTypography from '@mui/material/Typography';

import { Section, NextImage } from 'components';

const StyledCardOverlay = styled(MuiDialog)(
  ({ theme }) => css`
    .container {
      background-color: ${theme.palette.common.black};

      & h4 strong, & h3 strong {
        font-weight: 900;
      }
    }

    .paper {
      background-color: transparent;
      color: ${theme.palette.common.white};
      max-width: none !important;
      margin: auto;
      padding: 60px 5%;
      width: 100%;

      a {
        color: inherit;
      }
    }

    .closeBox {
      position: fixed;
      top: 0;
      right: 0;
      left: 0;
      text-align: right;
      padding: ${theme.spacing(6, 6, 2)},
      background-color: rgba(0, 0, 0, 0.8);
      z-index: 2;

      ${theme.breakpoints.up('md')} {
        padding: ${theme.spacing(10, 14, 2)};
      }
    }

    .close {
      outline: none;
      padding: 0;
      color: ${theme.palette.common.white};

      &::after {
        font-family: VodafoneIcons;
        font-size: 2em;
        content: ${theme.icons.close};
      }

      span {
        display: inline-block;
        margin-right: ${theme.spacing(4)};
      }
    }

    .leftColumn {
      border-bottom: 1px solid red;

      ${theme.breakpoints.up('md')} {
        border-right: 1px solid red;
        border-bottom: 0;
      }
    }

   .imageContainer {
      text-align: center;

      img {
        border-radius: 50%;
      }
    }
`
);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <MuiFade ref={ref} {...props} />;
});

export default function CardOverlay({ open, setOpen, mainTitle, item }) {
  return (
    <StyledCardOverlay
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="vdf-modal-title"
      aria-describedby="vdf-modal-description"
      PaperProps={{
        classes: { root: 'paper' },
        elevation: 0,
        square: true,
      }}
      classes={{
        container: 'container',
      }}
      hideBackdrop
      transition={Transition}
      scroll="body"
    >
      <>
        <div className="closeBox">
          <MuiButton
            onClick={() => setOpen(false)}
            className="close"
            color="inherit"
          >
            Close
          </MuiButton>
        </div>
        <Section>
          <MuiBox>
            <MuiTypography className="cardTitle" variant="h3" align="left">
              <strong>{mainTitle}</strong>
            </MuiTypography>
            <MuiGrid container spacing={4}>
              <MuiGrid item md={6} className="leftColumn">
                <MuiGrid container spacing={3}>
                  <MuiGrid item sm={6} md={4}>
                    <div className="imageContainer">
                      <NextImage
                        src={item.entity?.fieldLocationImage?.entity?.image.url}
                        width={200}
                        height={200}
                        alt="title"
                      />
                    </div>
                  </MuiGrid>
                  <MuiGrid item sm={6} md={8}>
                    <MuiTypography variant="h4" align="left">
                      <strong>{item.entity.fieldLocationTitle}</strong>
                    </MuiTypography>
                    <MuiTypography
                      variant="body1"
                      align="left"
                      dangerouslySetInnerHTML={{
                        __html: item.entity.fieldLocationSummary?.processed,
                      }}
                    />
                  </MuiGrid>
                </MuiGrid>
              </MuiGrid>
              <MuiGrid item md={6}>
                <MuiTypography
                  variant="body1"
                  align="left"
                  dangerouslySetInnerHTML={{
                    __html: item.entity.fieldLocationContent?.processed,
                  }}
                />
              </MuiGrid>
            </MuiGrid>
          </MuiBox>
        </Section>
      </>
    </StyledCardOverlay>
  );
}
