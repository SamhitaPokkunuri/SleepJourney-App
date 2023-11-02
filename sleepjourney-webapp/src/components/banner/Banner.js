import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useTheme, styled, css } from '@mui/material/styles';
import MuiBox from '@mui/material/Box';
import MuiTypography from '@mui/material/Typography';

import { NextImage, Video, ChevronButton } from 'components';
import addAssetPrefix from 'utils/addAssetPrefix';
import { slideIn, fadeIn } from 'utils/cssAnimations';

const StyledBanner = styled(MuiBox)(
  ({ theme }) => css`
    display: flex;
    border-bottom: 5px solid ${theme.palette.common.red};

    ${theme.breakpoints.up('md')} {
      padding: ${theme.spacing(0, 3.2)};
    }

    &.heroBanner {
      .media .image,
      .media .video {
        height: 0;
        padding-bottom: 100%;
      }

      ${theme.breakpoints.up('sm')} {
        min-height: 400px;
      }

      ${theme.breakpoints.up('md')} {
        height: 600px;
      }

      ${theme.breakpoints.up('xxl')} {
        height: 695px;
      }
    }

    &.carousel {
      flex: 1;

      ${theme.breakpoints.up('md')} {
        padding: ${theme.spacing(0, 7.2)};
      }

      ${theme.breakpoints.up('lg')} {
        padding: ${theme.spacing(0, 10)};
      }

      .media,
      .title > span,
      .description,
      .button {
        animation-duration: 750ms;
        animation-timing-function: ease;
        animation-iteration-count: 1;
        animation-fill-mode: forwards;
      }

      .media {
        opacity: 0;

        .slick-active & {
          animation-name: ${fadeIn};
        }
      }

      .title > span,
      .description,
      .button {
        transform: translateX(-1000px);

        .slick-active & {
          animation-name: ${slideIn};
        }
      }

      .title > span {
        &:last-of-type {
          animation-delay: 120ms;
        }

        &:nth-last-of-type(2) {
          animation-delay: 220ms;
        }

        &:nth-last-of-type(3) {
          animation-delay: 300ms;
        }

        &:nth-last-of-type(4) {
          animation-delay: 360ms;
        }
      }
    }

    &.carouselDescription {
      .description {
        animation-delay: 120ms;
      }

      .title > span {
        &:last-of-type {
          animation-delay: 220ms;
        }

        &:nth-last-of-type(2) {
          animation-delay: 300ms;
        }

        &:nth-last-of-type(3) {
          animation-delay: 360ms;
        }

        &:nth-last-of-type(4) {
          animation-delay: 400ms;
        }
      }
    }

    .bannerContainer {
      position: relative;
      flex: 1;
      display: flex;
      flex-direction: column;

      ${theme.breakpoints.up('sm')} {
        flex-direction: row;
        width: 100%;
        margin: 0 auto;
      }

      ${theme.breakpoints.up('md')} {
        max-width: ${theme.containers.values.md}px;
      }

      ${theme.breakpoints.up('xxl')} {
        max-width: ${theme.containers.values.lg}px;
      }
    }

    .text {
      flex: 1;
      display: flex;
      margin: auto 0;
      padding: 24px 16px;
      flex-direction: column;
      justify-content: center;
      align-items: start;

      & > :last-child {
        margin-bottom: 0;
      }

      ${theme.breakpoints.up(480)} {
        padding: 30px 24px;
      }

      ${theme.breakpoints.up('sm')} {
        width: 50%;
        padding: 48px 24px 60px;
      }

      ${theme.breakpoints.up('md')} {
        padding-left: 0;
      }
    }

    .media {
      position: relative;
      width: 100%;
      background: ${theme.palette.common.shadeGrey};

      ${theme.breakpoints.up('sm')} {
        width: 50%;
        max-width: 690px;
      }

      &:empty {
        background: transparent;
        height: auto;
        padding: 0;
      }

      .image,
      .video {
        height: 100%;
        padding-bottom: ${(9 / 16) * 100}%;
      }
    }

    .title {
      font-weight: 900;
      font-size: 12vw;
      line-height: 1;
      margin: ${theme.spacing(0, 0, 1)};

      & > span {
        display: block;
        word-break: break-word;
      }

      ${theme.breakpoints.up(480)} {
        font-size: 3.5rem;
      }

      ${theme.breakpoints.up('sm')} {
        font-size: 6vw;
      }

      ${theme.breakpoints.up('md')} {
        font-size: 5.6vw;
        margin-bottom: ${theme.spacing(2)};
      }

      ${theme.breakpoints.up('lg')} {
        font-size: 4rem;
      }

      ${theme.breakpoints.up('xl')} {
        & > span {
          white-space: nowrap;
        }
      }

      ${theme.breakpoints.up('xxl')} {
        font-size: 5rem;
      }
    }

    .description {
      margin-top: 0;
      margin-bottom: 1em;
      font-weight: 400;
      font-size: 1.25rem;
      line-height: 1.25em;

      &:first-of-type {
        margin-top: 0;
      }

      ${theme.breakpoints.up(480)} {
        font-size: 1.375rem;
      }

      ${theme.breakpoints.up('xl')} {
        font-size: 1.5rem;
      }

      ${theme.breakpoints.up('xxl')} {
        font-size: 1.875rem;
        padding-right: 10%;
      }
    }

    .button {
      width: auto;
    }
  `
);

export default function Banner(props) {
  const {
    title,
    description,
    button = {},
    media = {},
    heroBanner = false,
    carousel = false,
  } = props;

  const { palette } = useTheme();
  const regex = new RegExp(String.fromCharCode(160), 'g');
  const splitTitle = title.replace(regex, ' ').split(/\n|↵|<br\s*\/?>/);

  return (
    <StyledBanner
      className={clsx({
        heroBanner: heroBanner,
        carousel: carousel,
        carouselDescription: carousel && description,
      })}
    >
      <MuiBox className="bannerContainer">
        <MuiBox className="text">
          {title && (
            <MuiTypography className="title" variant={carousel ? 'h2' : 'h1'}>
              {carousel
                ? splitTitle.map((text) => <span key={text}>{text}</span>)
                : splitTitle.join(' ')}
            </MuiTypography>
          )}
          {description && (
            <MuiTypography className="description">{description}</MuiTypography>
          )}
          {button.href && (
            <ChevronButton
              className="button"
              href={button.href}
              target={button.target}
              rel={button.rel}
              chevron
              rounded={false}
              icon="ChevronRightCircle"
              customColors={{
                background: palette.common.red,
                text: palette.common.white,
              }}
            >
              {button.children}
            </ChevronButton>
          )}
        </MuiBox>
        <MuiBox className="media">
          <MuiBox className={media.type}>
            {media.type === 'image' ? (
              <NextImage
                src={media.url ? addAssetPrefix(media.url) : undefined}
                alt={media.alt || ''}
                layout="fill"
                objectFit="cover"
              />
            ) : (
              <Video src={media.url} layout="fill" poster={media.poster} />
            )}
          </MuiBox>
        </MuiBox>
      </MuiBox>
    </StyledBanner>
  );
}

Banner.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  button: PropTypes.shape({
    children: PropTypes.string,
    href: PropTypes.string,
    rel: PropTypes.string,
    target: PropTypes.string,
  }),
  media: PropTypes.shape({
    type: PropTypes.oneOf(['image', 'video']),
    url: PropTypes.string,
    poster: PropTypes.string,
  }),
  heroBanner: PropTypes.bool,
  carousel: PropTypes.bool,
};
