import React from 'react';
import clsx from 'clsx';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme, styled, css } from '@mui/material/styles';
import MuiBox from '@mui/material/Box';
import MuiCardMedia from '@mui/material/CardMedia';
import MuiCardContent from '@mui/material/CardContent';
import MuiTypography from '@mui/material/Typography';

import { Slider, Link } from 'components';
import addAssetPrefix from 'utils/addAssetPrefix';

const StyledMontageWall = styled(MuiBox)(
  ({ theme }) => css`
    ${theme.breakpoints.up('md')} {
      background-color: ${theme.palette.common.red};
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      height: calc(100vh - 98px);
      min-height: 616px;
      flex-direction: column;
      white-space: nowrap;
      overflow-y: hidden;
      overflow-x: auto;

      &::-webkit-scrollbar {
        width: 10px;
        height: 16px;
      }

      &::-webkit-scrollbar-track {
        background-color: ${theme.palette.common.white};
        box-shadow: inset 0 0 1px rgba(0, 0, 0, 0.3);
      }

      &::-webkit-scrollbar-thumb {
        background-color: ${theme.palette.common.spanishGrey};
      }
    }
  `
);

const StyledMontageSlider = styled(MuiBox)`
  margin-bottom: 60px;
  padding-right: 0;
  padding-left: 0;
  width: 100%;

  & > div {
    padding: 0;
    margin-bottom: 0;
  }

  & .slick-slide {
    padding: 0 !important;
  }

  & .slick-prev,
  & .slick-next {
    top: auto !important;
    bottom: -50px !important;
    transform: translateY(0) !important;
  }

  & .slick-prev {
    left: 35% !important;
  }

  & .slick-next {
    right: 35% !important;
  }
`;

const StyledMontageCard = styled(MuiBox)(
  ({ theme }) => css`
    ${theme.breakpoints.up('md')} {
      cursor: pointer;
      overflow: hidden;
      height: 33.33333%;
      min-height: 200px;
      width: 20%;
      min-width: 20%;
      perspective: 1000px;
      position: relative;

      & .media {
        transform: rotateY(180deg);
      }

      & .content {
        transform: rotateY(0deg);
      }
    }

    & .blankBox {
      ${theme.breakpoints.up('md')} {
        background-color: ${theme.palette.common.red};
        color: ${theme.palette.common.white};
        height: 33.33333%;
        min-height: 200px;
        width: 20%;
        min-width: 20%;
      }
    }

    & .title {
      ${theme.breakpoints.up('md')} {
        display: flex;
        align-items: center;
        padding: 15px 60px 15px 30px;
        position: relative;
        z-index: 1;
        overflow: visible;
        white-space: normal;
      }
    }

    & .cardTitle {
      margin-top: 0;
      margin-bottom: ${theme.spacing(0.5)};
      white-space: normal;
      width: 100%;

      ${theme.breakpoints.up('sm')} {
        margin-bottom: ${theme.spacing(1)};
      }

      &:last-child {
        margin-bottom: 0;
      }
    }

    & .media {
      height: 100%;
      min-height: 204px;
      background-color: ${theme.palette.common.shadeGrey};
    }

    & .chevron {
      position: absolute;
      bottom: ${theme.spacing(1.1)};
      right: ${theme.spacing(1.1)};

      ${theme.breakpoints.up('md')} {
        &:after {
          font-family: VodafoneIcons;
          content: ${theme.icons.chevronRightLG};
          color: ${theme.palette.common.red};
          font-size: 1.25rem;
          margin-left: 12px;
          vertical-align: bottom;
        }
      }
    }

    & .backface {
      backface-visibility: hidden;
      transform-style: preserve-3d;
      transition: ease-in-out 600ms;
    }

    & .content {
      padding: ${theme.spacing(2, 1)};

      ${theme.breakpoints.up('sm')} {
        padding: ${theme.spacing(3, 2)};
      }

      ${theme.breakpoints.up('md')} {
        display: flex;
        flex-direction: column;
        text-align: center;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 0;
        bottom: 0;
        width: 100%;
        background: ${theme.palette.common.white};
        transform: rotateY(-180deg);
        padding: ${theme.spacing(0, 1.1)};
      }
    }
  `
);

export default function MontageWall(props) {
  const { children, title, getPostById } = props;

  const theme = useTheme();
  const tabletUpView = useMediaQuery(theme.breakpoints.up('sm'));
  const desktopUpView = useMediaQuery(theme.breakpoints.up('md'));

  // slider settings
  const sliderSettings = {
    responsive: [
      {
        breakpoint: 992,
      },
      {
        breakpoint: 10000, // a unrealistically big number to cover up greatest screen resolution
        settings: 'unslick',
      },
    ],
  };

  return desktopUpView ? (
    <StyledMontageWall>
      {children.map((contentProps, index) => {
        const { props } = contentProps;
        const childPost = getPostById(props.post.id);

        const titleBox = (
          <MuiBox
            key={`title-${index}`}
            className={clsx('blankBox', { title: index === 4 })}
          >
            {index === 4 && (
              <MuiTypography variant="h1">
                <span dangerouslySetInnerHTML={{ __html: title.text }} />
              </MuiTypography>
            )}
          </MuiBox>
        );

        return (
          <>
            {(index === 4 || index === 6) &&
              title.toggle &&
              title.text &&
              titleBox}
            {contentItem(childPost, [6, 6, 6], index, 'basic', classes)}
          </>
        );
      })}
    </StyledMontageWall>
  ) : (
    <StyledMontageSlider>
      <Slider
        appearance="default"
        arrows
        slidesToShow={tabletUpView ? 3 : 2}
        slidesToScroll={1}
        {...sliderSettings}
      >
        {children.map((contentProps, index) => {
          const { props } = contentProps;
          const childPost = getPostById(props.post.id);

          return contentItem(childPost, [6, 6, 6], index, 'slider', classes);
        })}
      </Slider>
    </StyledMontageSlider>
  );
}

function contentItem(contentPropsObj, grid, index, type) {
  const { id, heroImageUrl, heroImage, thumbnailImage, url, title } =
    contentPropsObj;
  const image = {
    url:
      heroImageUrl ||
      (thumbnailImage &&
        process.env.NEXT_PUBLIC_ASSET_PREFIX_URL + thumbnailImage) ||
      (heroImage && process.env.NEXT_PUBLIC_ASSET_PREFIX_URL + heroImage),
  };

  return (
    <StyledMontageCard key={`${type}-${id}`}>
      <MuiCardMedia
        className={clsx('media', 'backface')}
        image={addAssetPrefix(image.url)}
      >
        <span className="chevron" />
      </MuiCardMedia>
      <MuiCardContent className={clsx('content', 'backface')}>
        <MuiTypography className="cardTitle" variant="h4">
          {url ? (
            <Link backgroundLink href={url}>
              {title}
            </Link>
          ) : (
            <span dangerouslySetInnerHTML={{ __html: title }} />
          )}
        </MuiTypography>
      </MuiCardContent>
    </StyledMontageCard>
  );
}
