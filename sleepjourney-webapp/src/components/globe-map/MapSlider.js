import { useState } from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme, styled, css } from '@mui/material/styles';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import MuiBox from '@mui/material/Box';
import MuiGrid from '@mui/material/Grid';
import MuiSlider from '@mui/material/Slider';
import MuiTypography from '@mui/material/Typography';

import { Slider, Tags, NextImage, ChevronButton } from 'components';
import { useOverlayRoute } from 'hooks/useOverlayRoute';

const StyledMapSlider = styled(MuiBox)(
  ({ theme }) => css`
    ${theme.breakpoints.down('md')} {
      position: fixed;
      z-index: 10;
      top: 48px;
      left: 0;
      width: 100%;
      height: 100%;
      overflow-y: auto;
      padding-bottom: ${theme.spacing(22)};
      background-color: ${theme.palette.common.shadeGrey};
    }

    ${theme.breakpoints.up('sm')} {
      padding: ${theme.spacing(12, 6, 22, 6)};
    }

    ${theme.breakpoints.up('md')} {
      padding: ${theme.spacing(0, 3, 0, 0)};
    }

    &.reducedPadding {
      padding-bottom: ${theme.spacing(11)};
    }

    .sliderCard {
      ${theme.breakpoints.up('sm')} {
        padding: ${theme.spacing(1)};
      }
    }

    .innerCard {
      ${theme.breakpoints.up('sm')} {
        background-color: #ffffff;
        box-shadow: ${theme.cards.boxShadow};
        padding: ${theme.spacing(4)};
      }
    }

    .learnMore {
      ${theme.breakpoints.down('md')} {
        padding-bottom: ${theme.spacing(11)};
      }
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

      img {
        border-radius: 50%;
        border: 1px solid black !important;
      }
    }

    .mobileClose {
      display: none;

      ${theme.breakpoints.down('md')} {
        display: flex;
        position: fixed;
        width: 100%;
        bottom: 0;
        left: 0;
        right: 0;
        background-image: url(/images/map/Globe-big.png);
        background-repeat: no-repeat;
        background-position-x: center;

        a {
          margin: 70px auto 20px;
          width: auto;
        }
      }
    }

    .backToMap {
      position: fixed;
      bottom: 0;
      right: 0;
      left: 0;
      display: flex;
      align-items: center;
      padding-left: 20px;
      background-color: ${theme.palette.common.shadeGrey};

      img {
        margin: auto;
        margin-left: -7px;
      }
    }
  `
);

export default function MapSlider({
  slideIndex,
  apiData,
  setSlideIndex,
  onSliderChange,
  setMobileSlider,
  handleOpen,
}) {
  const router = useRouter();
  const { palette, breakpoints } = useTheme();
  const [expanded, setExpanded] = useState(false);
  const { handleOverlayClick } = useOverlayRoute();
  const isMobile = useMediaQuery(breakpoints.down('md'));
  const isTabletDwn = useMediaQuery(breakpoints.down('lg'));

  const pointsLength = apiData.fieldLocation?.length || 1;
  const sliderSettings = {
    infinite: false,
    adaptiveHeight: true,
    beforeChange: (current, next) => {
      if (next > -1) {
        // Issue with parent state: https://github.com/akiran/react-slick/issues/136
        setTimeout(() => {
          onSliderChange(next);
          // After slide collapse
          setExpanded(false);
        }, 10);
      }
    },
  };

  const handleOnClick = (e, item) => {
    const linkTo = item.entity.fieldLocationLinkTo?.entity?.path.alias;
    const linkToExternal = item.entity.fieldLocationExternalLinkTo;
    const openAs = item.entity.fieldLocationOpenAs;
    if (linkToExternal && openAs === 'External') {
      window.open(linkToExternal, '_ blank');
    } else if (linkTo && openAs) {
      if (openAs === 'New tab') {
        window.open(linkTo, '_ blank');
      } else if (openAs === 'Overlay') {
        handleOverlayClick(e, true, linkTo);
      } else {
        router.push(linkTo);
      }
    } else {
      if (isMobile) {
        setExpanded(!expanded);
      } else {
        handleOpen(e);
      }
    }
  };

  return (
    <StyledMapSlider
      className={clsx({
        reducedPadding: expanded,
      })}
    >
      <Slider
        appearance="map-slider"
        arrows={!isMobile}
        slidesToShow={1}
        slidesToScroll={1}
        {...sliderSettings}
        slideIndex={slideIndex}
      >
        {apiData.fieldLocation.map((item) => {
          return (
            <MuiBox
              p={2}
              className="sliderCard"
              key={item.entity.fieldLocationTitle}
            >
              <MuiBox className="innerCard">
                <MuiGrid container spacing={2}>
                  <MuiGrid item xs={12} sm={3}>
                    {isMobile && (
                      <>
                        <MuiTypography
                          className="cardTitle"
                          variant="h3"
                          align="left"
                        >
                          {item.entity.fieldLocationTitle}
                        </MuiTypography>
                        {item.entity.tags && item.entity.tags?.length > 0 && (
                          <Tags data={item.entity.tags} />
                        )}
                      </>
                    )}
                    <div className="imageContainer">
                      <NextImage
                        src={item.entity?.fieldLocationImage?.entity?.image.url}
                        width={200}
                        height={200}
                        alt="title"
                      />
                    </div>
                  </MuiGrid>
                  <MuiGrid item xs={12} sm={9}>
                    {!isTabletDwn && (
                      <>
                        <MuiTypography
                          className="cardTitle"
                          variant="h3"
                          align="left"
                        >
                          {item.entity.fieldLocationTitle}
                        </MuiTypography>
                        {item.entity.tags && item.entity.tags?.length > 0 && (
                          <Tags data={item.entity.tags} />
                        )}
                      </>
                    )}
                    <MuiTypography
                      variant="body1"
                      align="left"
                      dangerouslySetInnerHTML={{
                        __html: item.entity.fieldLocationSummary?.processed,
                      }}
                    />
                    {expanded && (
                      <>
                        <MuiTypography
                          variant="body1"
                          align="left"
                          dangerouslySetInnerHTML={{
                            __html: item.entity.fieldLocationContent?.processed,
                          }}
                        />
                        {/* <DownloadButton
                          icon="Download"
                          onClick={(e) => {
                            setExpanded(!expanded);
                          }}
                        >
                          Download Report (PDF)
                        </DownloadButton> */}
                      </>
                    )}
                    {!expanded && (
                      <ChevronButton
                        chevron
                        customColors={{
                          background: palette.common.red,
                          text: palette.common.white,
                        }}
                        onClick={(e) => handleOnClick(e, item)}
                      >
                        Learn More
                      </ChevronButton>
                    )}
                  </MuiGrid>
                </MuiGrid>
              </MuiBox>
            </MuiBox>
          );
        })}
      </Slider>
      {!expanded && (
        <>
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
          <div className="mobileClose">
            {/* <NextImage src={'/images/map/Globe-big.png'} layout="fill" objectFit="cover" /> */}
            <ChevronButton
              color="inherit"
              variant="contained"
              component="a"
              onClick={() => {
                setMobileSlider(false);
              }}
            >
              Return To Map
            </ChevronButton>
          </div>
        </>
      )}
      {expanded && (
        <div
          className="backToMap"
          onClick={() => {
            setMobileSlider(false);
          }}
        >
          <ArrowBackIosIcon />
          <NextImage src={'/images/map/Globe.png'} width={70} height={70} />
        </div>
      )}
    </StyledMapSlider>
  );
}
