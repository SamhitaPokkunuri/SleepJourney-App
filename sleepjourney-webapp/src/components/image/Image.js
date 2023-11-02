import { useContext } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme, styled, css } from '@mui/material/styles';
import MuiBox from '@mui/material/Box';
import MuiLink from '@mui/material/Link';

import { NextImage } from 'components';
import ImageMask from './image-mask';
import ImageBadge from './image-badge';
import addAssetPrefix from 'utils/addAssetPrefix';
import useWidthStyles from 'utils/useWidthStyles';
import useDisplayStyles from 'utils/useDisplayStyles';
import { ThemeContext } from '../layout/FoundationPage';

const StyledImage = styled(MuiBox, {
  shouldForwardProp: (prop) =>
    /(align|marginBottom|marginTop|mediaCircle|width)/.test(prop) === false,
})(
  ({ theme, align, marginBottom, marginTop, mediaCircle, width }) => css`
    &.image {
      position: relative;
      width: ${typeof width === 'number' ? `${width}px` : width};
      max-width: 100%;
      margin-top: ${marginTop ? theme.spacing(3) : undefined};
      margin-bottom: ${marginBottom ? theme.spacing(3) : undefined};
      margin-left: ${/(center|right)/.test(align) ? 'auto' : undefined};
      margin-right: ${/(center|left)/.test(align) ? 'auto' : undefined};
    }

    &.imageSizes {
      width: ${mediaCircle.diam};
      max-width: ${mediaCircle.max};
    }

    .imageStyleSquare {
      overflow: hidden;
      position: relative;
      padding-bottom: 100%;
      height: 0;
      width: 100%;
    }

    .imageStyleRounded {
      border-radius: 50%;
      overflow: hidden;
      position: relative;
      height: 0;
      padding-bottom: 100%;
    }

    .imageStyleBorder {
      border: 1px solid ${theme.palette.common.spanishGrey};
    }
  `
);

export default function Image(props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const {
    alt,
    caption,
    url,
    href,
    widthControlExt,
    responsiveControl,
    sizeSlug,
    mediaSize,
    width,
    height,
    initialWidth = 0,
    initialHeight = 0,
    align = 'center',
    className,
    marginBottom = true,
    marginTop = false,
    hasBorder = false,
    badge = {
      hasImageBadge: false,
      color: theme.palette.common.red,
    },
    imageMask = {
      hasImageMask: false,
      svgImageMask: {
        color: theme.palette.common.red,
      },
    },
  } = props;

  let mediaCircle = { max: '460px', diam: '80%', badge: 185 };
  const isLargeMedia = mediaSize === 'large';
  const isMediumMedia = mediaSize === 'medium';
  const isSmallMedia = mediaSize === 'small';

  if (isLargeMedia && !isMobile) {
    mediaCircle = { max: '590px', diam: '95%', badge: 230 };
  } else if (isLargeMedia && isMobile) {
    mediaCircle = { max: '460px', diam: '80%', badge: 130 };
  } else if ((isSmallMedia && !isMobile) || (isMediumMedia && isMobile)) {
    mediaCircle = { max: '240px', diam: '60%', badge: 100 };
  } else if (isSmallMedia && isMobile) {
    mediaCircle = { max: '120px', diam: '40%', badge: 80 };
  }

  const { hasImageMask, svgImageMask } = imageMask;
  const { hasImageBadge, hideImageMobile, color } = badge;
  const isRounded = /is-style-rounded/.test(className) || hasImageMask;
  const isSquare = /is-style-square/.test(className);
  const isFullWidth = /(full_width)/.test(sizeSlug);
  const hideImage = hideImageMobile && isMobile;
  const newMarginBottom = hideImage ? false : marginBottom;
  const context = useContext(ThemeContext);
  const isFoundation = context === 'foundation';
  const widthStyles = useWidthStyles(widthControlExt, isFoundation, align);
  const displayStyles = useDisplayStyles(responsiveControl);

  let layout = 'intrinsic';

  if (isRounded || isSquare) {
    layout = 'fill';
  } else if (isFullWidth) {
    layout = 'responsive';
  }

  const ImageElement = (
    <MuiBox
      className={clsx({
        imageStyleSquare: isSquare,
        imageStyleRounded: isRounded,
        imageStyleBorder: hasBorder,
      })}
    >
      <NextImage
        src={addAssetPrefix(url)}
        alt={typeof caption === 'string' ? caption : alt}
        layout={layout}
        objectFit={isRounded || isSquare ? 'cover' : undefined}
        width={layout !== 'fill' ? width || initialWidth : undefined}
        height={layout !== 'fill' ? height || initialHeight : undefined}
      />
    </MuiBox>
  );

  return (
    <StyledImage
      className={clsx('image', {
        imageSizes: mediaSize && isRounded,
      })}
      sx={{ ...widthStyles, ...displayStyles }}
      align={align}
      marginBottom={newMarginBottom}
      marginTop={marginTop}
      mediaCircle={mediaCircle}
      width={width}
    >
      {!hideImage &&
        (href ? (
          <MuiLink href={href} rel="noopener" target="_blank" underline="hover">
            {ImageElement}
          </MuiLink>
        ) : (
          ImageElement
        ))}
      {hasImageMask && <ImageMask {...svgImageMask} />}
      {hasImageBadge && (
        <ImageBadge
          size={mediaCircle.badge}
          color={color}
          hideImage={hideImage}
        />
      )}
    </StyledImage>
  );
}

Image.propTypes = {
  /**
   * @ignore
   */
  alt: PropTypes.string,

  caption: PropTypes.string,

  url: PropTypes.string,

  href: PropTypes.string,

  /**
   * @ignore
   */
  widthControlExt: PropTypes.shape({
    mobile: PropTypes.number,
    tablet: PropTypes.number,
    desktop: PropTypes.number,
  }),

  /**
   * @ignore
   */
  responsiveControl: PropTypes.shape({
    mobile: PropTypes.bool,
    tablet: PropTypes.bool,
    desktop: PropTypes.bool,
  }),

  sizeSlug: PropTypes.string,

  mediaSize: PropTypes.oneOf(['large', 'medium', 'small']),

  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /**
   * @ignore
   */
  initialWidth: PropTypes.number,

  /**
   * @ignore
   */
  initialHeight: PropTypes.number,

  align: PropTypes.oneOf(['center', 'right', 'left', 'full', 'wide']),

  className: PropTypes.oneOf(['is-style-rounded', 'is-style-square']),

  marginBottom: PropTypes.bool,

  marginTop: PropTypes.bool,

  hasBorder: PropTypes.bool,

  /**
   * @ignore
   */
  badge: PropTypes.shape({
    color: PropTypes.string,
    hasImageBadge: PropTypes.bool,
    hideImageMobile: PropTypes.bool,
  }),

  /**
   * @ignore
   */
  imageMask: PropTypes.shape({
    hasImageMask: PropTypes.bool,
    svgImageMask: PropTypes.shape({
      color: PropTypes.string,
    }),
  }),
};
