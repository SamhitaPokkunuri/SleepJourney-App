import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Head from 'next/head';
import SlickSlider from 'react-slick';
import { styled, css } from '@mui/material/styles';
import MuiBox from '@mui/material/Box';

const StyledSlider = styled(MuiBox, {
  shouldForwardProp: (prop) => /(marginBottom)/.test(prop) === false,
})(
  ({ theme, marginBottom }) => css`
    margin-left: auto;
    margin-right: auto;
    margin-bottom: ${marginBottom ? '24px' : undefined};

    ${theme.breakpoints.up('md')} {
      margin-bottom: ${marginBottom ? '40px' : undefined};
    }

    ${theme.breakpoints.up('lg')} {
      margin-bottom: ${marginBottom ? '60px' : undefined};
    }

    .slick-list {
      &:focus {
        outline: none;
      }

      &.dragging {
        cursor: pointer;
        cursor: hand;
      }
    }

    .slick-slide {
      position: relative;
      overflow: hidden;

      img {
        display: block;
        // TO DO: add support for IE
        // - https://github.com/fregante/object-fit-images
        object-fit: cover;
        width: 100%;
      }

      &.slick-loading img {
        display: none;
      }

      &.dragging img {
        pointer-events: none;
      }

      .slick-initialized & {
        display: block;
      }

      .slick-loading & {
        visibility: hidden;
      }

      &.slick-active {
        z-index: 1;
      }
    }

    .slick-prev,
    .slick-next {
      position: absolute;
      font-size: 0;
      cursor: pointer;
      top: 50%;
      padding: 0;
      outline: none;
      border: none;
      transform: translateY(-50%);
      z-index: 1;
      height: 40px;
      width: 40px;
      border-radius: 50%;
      box-shadow: ${theme.cards.boxShadow};

      &,
      &:focus {
        background: ${theme.palette.common.white};
        color: ${theme.palette.common.darkGrey};
      }

      &:before {
        color: inherit;
        font-size: 1.375rem;
      }

      &:hover {
        color: ${theme.palette.common.red};
      }
    }

    .slick-prev {
      left: -50px;

      ${theme.breakpoints.up('md')} {
        left: -60px;
      }

      &:before {
        margin-left: -0.125em;
        content: ${theme.icons.chevronLeftLG};
        font-family: VodafoneIcons;
      }
    }

    .slick-next {
      right: -50px;

      ${theme.breakpoints.up('md')} {
        right: -60px;
      }

      &:before {
        margin-right: -0.125em;
        content: ${theme.icons.chevronRightLG};
        font-family: VodafoneIcons;
      }
    }

    .slick-dots {
      position: absolute;
      bottom: -40px;
      height: 40px;
      list-style: none;
      display: flex !important;
      align-items: center;
      justify-content: center;
      padding: 0;
      margin: 0;
      left: 0;
      right: 0;

      li {
        position: relative;
        height: auto;
        width: auto;
        padding: 0;
        margin: 8px;
        cursor: pointer;

        button {
          background: transparent;
          display: block;
          height: 12px;
          width: 12px;
          outline: none;
          line-height: 0px;
          font-size: 0px;
          color: transparent;
          border: 1px solid ${theme.palette.common.spanishGrey};
          cursor: pointer;
          border-radius: 50%;
          margin: 0;
          padding: 0;

          &:hover,
          &:focus {
            outline: none;
          }

          &:before {
            display: none;
          }
        }

        &.slick-active button {
          background: ${theme.palette.common.spanishGrey};
        }
      }
    }

    &.heroSlider {
      .slick-prev,
      .slick-next {
        background: rgba(0, 0, 0, 0.25);
        color: ${theme.palette.common.white};
        height: 60px;
        width: 60px;
        border-radius: 0;

        &:before {
          font-size: 2.5rem;
        }

        &:hover {
          color: ${theme.palette.common.white};
        }
      }

      .slick-prev {
        left: 0px;
      }

      .slick-next {
        right: 0px;
      }
    }

    &.mapSlider {
      .slick-slider {
        .slick-prev,
        .slick-next {
          background: rgba(0, 0, 0, 1);
          color: ${theme.palette.common.white};
          transition: all 0.3s;
          transform-origin: center;

          &:not(.slick-disabled):hover {
            transform: translateY(-50%) scale(1.2);
            color: ${theme.palette.common.white};
          }

          &.slick-disabled {
            background: rgba(0, 0, 0, 0.65);
            color: ${theme.palette.common.white};

            &:before {
              opacity: 0.75;
            }
          }
        }

        .slick-prev {
          left: -10px;
        }

        .slick-next {
          right: -10px;
        }
      }
    }

    &.sdgSlider {
      margin-left: -16px !important;
      margin-right: -16px !important;

      .slick-slider {
        .slick-current {
          opacity: 1 !important;
          transform: scale(1.2);
        }

        .slick-slide {
          padding: 20px;
          opacity: 0.5;
          text-align: center;
        }
      }

      ${theme.breakpoints.up(480)} {
        margin-left: -24px !important;
        margin-right: -24px !important;
      }
    }

    &.hasDots {
      padding-bottom: 40px;
    }

    &.hasArrows {
      width: 100%;
      padding-right: 48px;
      padding-left: 48px;

      ${theme.breakpoints.up('md')} {
        padding-right: 80px;
        padding-left: 80px;
      }
    }

    &.hasFlex {
      .slick-track {
        display: flex;
      }

      .slick-slide {
        display: flex;
        height: auto;
        float: none;

        & > div {
          flex: 1;
          display: flex;
        }
      }
    }

    &.bannerSlider {
      padding: 0 !important;

      .slick-arrow {
        background: none;
        box-shadow: none;
        border-radius: 0;
        height: 48px;
        width: 48px;

        &.slick-prev {
          left: 12px;
        }

        &.slick-next {
          right: 12px;
        }

        &:before {
          font-size: 2.125rem;
          color: ${theme.palette.common.gainsboro};
        }

        ${theme.breakpoints.up('lg')} {
          &.slick-prev {
            left: 30px;
          }

          &.slick-next {
            right: 30px;
          }

          &:before {
            font-size: 2.75rem;
          }
        }
      }

      .slick-dots {
        bottom: 5px;
        height: 48px;

        li {
          button {
            width: 10px;
            height: 10px;
            border: none;
            background: ${theme.palette.common.gainsboro};
          }

          &.slick-active button {
            background: ${theme.palette.common.red};
          }
        }

        ${theme.breakpoints.up('sm')} {
          width: 50%;
          max-width: 750px;
          left: 0px;
        }

        ${theme.breakpoints.up('lg')} {
          left: auto;
          right: calc(50% - 30px);
        }
      }
    }

    &.roaming {
      .slick-slider {
        padding: 0;

        ${theme.breakpoints.up('lg')} {
          padding: 0 80px;
        }
      }

      .slick-track {
        display: flex;
      }

      .slick-slide {
        display: flex;
        height: auto;
        float: none;

        & > div {
          flex: 1;
          display: flex;
          align-items: center;
        }
      }

      .slick-list {
        max-width: ${theme.containers.values.lg}px;
        margin: auto;
      }

      .slick-arrow {
        height: 80px;
        width: 80px;
        background: transparent;
        border-radius: 0;
        box-shadow: none;
        display: none !important;

        &,
        &:focus {
          color: ${theme.palette.common.gainsboro};
        }

        &:before {
          color: inherit;
          font-size: 2.5rem;
          transition: color 0.4s ease;
        }

        &:hover {
          color: ${theme.palette.common.red};
        }

        ${theme.breakpoints.up('lg')} {
          display: block !important;
        }
      }

      .slick-prev {
        left: 0px;

        &:before {
          margin-left: -0.125em;
        }
      }

      .slick-next {
        right: 0px;

        &:before {
          margin-right: -0.125em;
        }
      }

      .slick-dots {
        li {
          button {
            background: ${theme.palette.common.gainsboro};
            border: none;
            height: 10px;
            width: 10px;
          }

          &.slick-active button {
            background: ${theme.palette.common.red};
          }
        }
      }
    }
  `
);

function Slider(props) {
  const {
    appearance,
    arrows,
    children,
    dots,
    flex,
    marginBottom,
    slideIndex,
    ...settings
  } = props;

  const classNames = clsx({
    heroSlider: appearance === 'hero-banner',
    mapSlider: appearance === 'map-slider',
    bannerSlider: appearance === 'banner',
    sdgSlider: appearance === 'sdg-mode',
    roaming: appearance === 'roaming',
    hasDots: dots,
    hasArrows: arrows && appearance === 'default',
    hasFlex: flex,
  });

  const slider = useRef();

  useEffect(() => {
    if (slideIndex !== undefined) {
      slider.current.slickGoTo(slideIndex);
    }
  }, [slideIndex]);

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          type="text/css"
          charSet="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick-theme.min.css"
        />
      </Head>
      <StyledSlider className={classNames} marginBottom={marginBottom}>
        <SlickSlider
          dots={dots}
          arrows={arrows}
          infinite
          speed={500}
          ref={slider}
          {...settings}
        >
          {children}
        </SlickSlider>
      </StyledSlider>
    </>
  );
}

Slider.defaultProps = {
  appearance: 'default',
  dots: false,
  arrows: true,
  flex: false,
  marginBottom: true,
  fade: false,
};

Slider.propTypes = {
  /**
   * The appearance of the component.
   */
  appearance: PropTypes.oneOf([
    'default',
    'hero-banner',
    'banner',
    'map-slider',
    'sdg-mode',
    'roaming',
  ]),
  /**
   * Adds arrows to the component.
   */
  arrows: PropTypes.bool,
  /**
   * The content of the component.
   */
  children: PropTypes.node.isRequired,
  /**
   * Adds dots to the component.
   */
  dots: PropTypes.bool,
  /**
   * Sets the slide animation type to fade in.
   */
  fade: PropTypes.bool,
  /**
   * Adds a flex layout to the component.
   */
  flex: PropTypes.bool,
  /**
   * Adds margin to the bottom of the component.
   */
  marginBottom: PropTypes.bool,
  /**
   * @ignore
   */
  slideIndex: PropTypes.number,
};

export default Slider;
