import { Fragment } from 'react';
import clsx from 'clsx';
import NextLink from 'next/link';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme, styled, css } from '@mui/material/styles';
import MuiBox from '@mui/material/Box';

import { Slider, ImageCaption, NextImage } from 'components';
import addAssetPrefix from 'utils/addAssetPrefix';
import useWidthStyles from 'utils/useWidthStyles';
import useDisplayStyles from 'utils/useDisplayStyles';

const StyledCarousel = styled(MuiBox)(
  ({ theme }) => css`
    figure {
      position: relative;
      overflow: hidden;
      margin: 0;
      outline: none;
      padding-bottom: 56.25%;
      height: 0;
    }

    a {
      text-decoration: none;
    }

    &.heroCarousel {
      padding-right: 0;
      padding-left: 0;
      position: relative;

      .slick-track {
        height: 320px;

        ${theme.breakpoints.up('sm')} {
          height: 480px;
        }

        ${theme.breakpoints.up('md')} {
          height: 800px;
        }
      }

      figure {
        background: ${theme.palette.common.shadeGrey};
        display: flex !important;
        height: auto;
        padding: 0;
      }

      ${theme.breakpoints.down('lg')} {
        a {
          display: flex;
          flex: 1;
          flex-direction: column;

          > div {
            position: relative;
            flex: 1;
          }
        }
      }
    }
  `
);

export default function Carousel(props) {
  const {
    appearance,
    images,
    hasDots,
    widthControlExt,
    responsiveControl,
    autoplay,
    autoplaySpeed,
  } = props;

  const widthStyles = useWidthStyles(widthControlExt);
  const displayStyles = useDisplayStyles(responsiveControl);
  const theme = useTheme();
  const hasArrows = useMediaQuery(theme.breakpoints.up('sm'));

  const imageCaptionProps =
    appearance === 'hero-banner'
      ? { size: 'large', color: 'red', heading: 'h2' }
      : { heading: 'h3' };

  return (
    <StyledCarousel
      className={clsx({
        heroCarousel: appearance === 'hero-banner',
      })}
      sx={{ ...widthStyles, ...displayStyles }}
    >
      <Slider
        appearance={appearance}
        dots={hasDots}
        arrows={hasArrows}
        autoplay={autoplay}
        autoplaySpeed={autoplaySpeed}
        slidesToShow={1}
        slidesToScroll={1}
        flex={appearance === 'hero-banner'}
        marginBottom={appearance !== 'hero-banner'}
      >
        {images.map(({ id, url, caption, linkToURL, alt }) => {
          const fullUrl = addAssetPrefix(url);

          function Image(props) {
            const { alt } = props;
            return (
              <>
                <NextImage
                  src={fullUrl}
                  layout="fill"
                  objectFit="cover"
                  alt={alt}
                />
                {caption.length > 0 && (
                  <ImageCaption {...imageCaptionProps}>
                    {caption
                      .replace(/&nbsp;/g, '')
                      .replace(/<(\/?)a\b((?:[^>"']|"[^"]*"|'[^']*')*)>/g, '')
                      .split('<br>')
                      .map((text) => (
                        <Fragment key={text}>
                          {text + ' '}
                          <br />
                        </Fragment>
                      ))}
                  </ImageCaption>
                )}
              </>
            );
          }

          return (
            <figure key={id}>
              {linkToURL ? (
                <NextLink href={linkToURL}>
                  <a>
                    <Image alt={alt} />
                  </a>
                </NextLink>
              ) : (
                <Image alt={alt} />
              )}
            </figure>
          );
        })}
      </Slider>
    </StyledCarousel>
  );
}
