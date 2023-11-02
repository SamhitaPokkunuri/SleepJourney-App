import clsx from 'clsx';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme, styled, css } from '@mui/material/styles';
import MuiBox from '@mui/material/Box';
import MuiGrid from '@mui/material/Grid';
import MuiSlider from '@mui/material/Slider';
import MuiTypography from '@mui/material/Typography';

import { Slider, NextImage, ChevronButton, IconButton } from 'components';
import { useOverlayRoute } from 'hooks/useOverlayRoute';

const StyledSdgSlider = styled(MuiBox)(
  ({ theme }) => css`
    ${theme.breakpoints.up('md')} {
      padding: ${theme.spacing(0, 3, 0, 0)};
    }

    .sliderCard {
      ${theme.breakpoints.down('md')} {
        padding: ${theme.spacing(0.2)};
      }

      ${theme.breakpoints.up('md')} {
        padding: ${theme.spacing(1)};
      }
    }

    .innerCard {
      background-color: #ffffff;
      box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.16);
      padding: ${theme.spacing(4)};
    }

    .muiSlider {
      color: #000;
      width: 70%;
      margin: auto;
      display: flex;
    }

    .cardTitle {
      font-size: 1.875rem;
      line-height: 1.875rem;
      font-weight: 900;
      margin-top: 0;
      margin-bottom: ${theme.spacing(2)};

      ${theme.breakpoints.down('md')} {
        margin-bottom: ${theme.spacing(1.5)};
      }
    }

    .imageContainer {
      text-align: center;
    }

    .swipeButton {
      text-align: center;
      pointer-events: none;

      button {
        border-radius: 2px;
      }
    }
  `
);

export default function SdgSlider({
  slideIndex,
  sdgs,
  mode,
  setSlideIndex,
  onSliderChange,
}) {
  const { breakpoints, palette } = useTheme();
  const isMobile = useMediaQuery(breakpoints.down('sm'));
  const isTabletDwn = useMediaQuery(breakpoints.down('md'));
  const { handleOverlayClick } = useOverlayRoute();

  const pointsLength = sdgs?.length || 1;
  const sliderSettings = {
    infinite: false,
    adaptiveHeight: true,
    beforeChange: (current, next) => {
      if (next > -1) {
        // Issue with parent state: https://github.com/akiran/react-slick/issues/136
        setTimeout(() => {
          onSliderChange(next);
        }, 10);
      }
    },
  };

  let centerPadding = '30px';
  if (isTabletDwn) {
    centerPadding = '150px';
  }
  if (isMobile) {
    centerPadding = '100px';
  }

  return (
    <StyledSdgSlider>
      <Slider
        appearance="map-slider"
        arrows={!isMobile}
        slidesToShow={1}
        slidesToScroll={1}
        {...sliderSettings}
        slideIndex={slideIndex}
      >
        {sdgs.map((item) => {
          return (
            <MuiBox p={2} className="sliderCard" key={item.id}>
              <MuiBox className="innerCard">
                <MuiGrid container spacing={2}>
                  {!isMobile && (
                    <MuiGrid item xs={12} sm={3}>
                      <div className="imageContainer">
                        <NextImage
                          src={item.heroImageUrl}
                          className={clsx({
                            roundedImage: mode === 'mwc_demo',
                          })}
                          width={200}
                          height={200}
                          alt={item.title}
                        />
                      </div>
                    </MuiGrid>
                  )}
                  <MuiGrid item xs={12} sm={9}>
                    <MuiTypography
                      className="cardTitle"
                      variant="h3"
                      align="left"
                    >
                      {item.title}
                    </MuiTypography>
                    <MuiTypography
                      variant="body1"
                      align="left"
                      dangerouslySetInnerHTML={{
                        __html: item.description,
                      }}
                    />
                    {item.ctaText && item.ctaText.length > 0 && (
                      <ChevronButton
                        chevron
                        customColors={{
                          background: palette.common.red,
                          text: palette.common.white,
                        }}
                        onClick={(e) => {
                          handleOverlayClick(e, true, item.url);
                        }}
                      >
                        {item.ctaText}
                      </ChevronButton>
                    )}
                  </MuiGrid>
                </MuiGrid>
              </MuiBox>
            </MuiBox>
          );
        })}
      </Slider>
      {!isMobile ? (
        <MuiSlider
          onChange={(e, value) => {
            setSlideIndex(value);
          }}
          value={slideIndex}
          className="muiSlider"
          step={1}
          marks
          min={0}
          max={pointsLength - 1}
        />
      ) : (
        <>
          <Slider
            appearance="sdg-mode"
            slidesToShow={1}
            slidesToScroll={1}
            centerMode={true}
            centerPadding={centerPadding}
            slideIndex={slideIndex}
            {...sliderSettings}
          >
            {sdgs.map((item) => {
              return (
                <div key={item.id}>
                  <NextImage
                    src={item.sdgImageUrl}
                    width={200}
                    height={200}
                    alt={item.title}
                  />
                </div>
              );
            })}
          </Slider>
          <MuiBox className="swipeButton">
            <IconButton
              icon="SwipeAcross"
              iconSet="global"
              customColors={{
                background: palette.common.white,
                text: palette.common.darkGrey,
              }}
              size="large"
            >
              Swipe across
            </IconButton>
          </MuiBox>
        </>
      )}
    </StyledSdgSlider>
  );
}
