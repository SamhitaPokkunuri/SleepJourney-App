import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTheme, styled, css } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import MuiBox from '@mui/material/Box';

const dividerOverlap = {
  path: 'M 0,312.48663 V 88 c 0,0 37.27,12 104,12 131.79,0 271,-70 271,-70 v 282.48663 z',
  viewBox: '0 0 375 250',
};

const StyledSectionDividerWave = styled(MuiBox, {
  shouldForwardProp: (prop) =>
    /(align|color|dropShadow|flipped|isMobile|inverted|rotated)/.test(prop) ===
    false,
})(
  ({
    theme,
    align,
    color,
    dropShadow,
    flipped,
    isMobile,
    inverted,
    rotated,
  }) => css`
    position: absolute;
    overflow: hidden;
    width: 100%;
    left: 0;
    ${align}: 0;

    ${theme.breakpoints.down('sm')} {
      opacity: 0;
    }

    .svg {
      display: block;
      transform: rotate(${rotated && !isMobile ? '180deg' : '0'});

      ${theme.breakpoints.up('sm')} {
        min-width: 1680px;
      }
    }

    .path {
      fill: ${color};
      transform-origin: center;
      transform: scaleX(${flipped ? -1 : 1});
      filter: ${dropShadow
        ? `drop-shadow(rgba(0, 0, 0, 0.08) 0px ${
            inverted || isMobile ? '-30px' : '30px'
          } 0px )`
        : undefined};
    }
  `
);

export default function SectionDividerWave(props) {
  const {
    divider = {
      path: 'M0,180C235.3,214.62,371.28,30,684,30c314.73,0,562.81,180,920,180,189,0,316-50,316-50V0H0Z',
      invertedPath:
        'M0,240H1920V160s-127,50-316,50C1246.81,210,998.73,30,684,30,371.28,30,235.3,214.62,0,180Z',
      viewBox: '0 0 1920 240',
      mobile: {
        path: 'M0,130V88s37.27,12,104,12c131.79,0,271-70,271-70V130Z',
        viewBox: '0 0 375 130',
      },
    },
    align,
    color,
    width,
    height,
    flipped,
    inverted,
    dropShadow,
    hasOverlap,
  } = props;

  const { path, invertedPath, viewBox, mobile } = divider;

  const [mounted, setMounted] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const rotated =
    (!inverted && align === 'bottom') || (inverted && align === 'top');

  useEffect(() => {
    if (!mounted) {
      setMounted(true);
    }
  }, [mounted]);

  let svgPath = path;
  let svgViewBox = viewBox;
  let svgHeight = height;

  if (inverted) {
    svgPath = invertedPath;
  } else if (isMobile && hasOverlap) {
    svgPath = dividerOverlap.path;
    svgViewBox = dividerOverlap.viewBox;
    svgHeight = dividerOverlap.viewBox.split(' ')[3];
  } else if (isMobile) {
    svgPath = mobile.path;
    svgViewBox = mobile.viewBox;
    svgHeight = mobile.viewBox.split(' ')[3];
  }

  return (
    <StyledSectionDividerWave
      style={{ opacity: mounted ? 1 : undefined }}
      align={align}
      color={color}
      dropShadow={dropShadow}
      flipped={flipped}
      isMobile={isMobile}
      inverted={inverted}
      rotated={rotated}
    >
      <svg
        className="svg"
        viewBox={svgViewBox}
        height={svgHeight}
        width={isMobile ? '100%' : width}
        preserveAspectRatio="none"
        role="img"
      >
        <path className="path" d={svgPath} />
      </svg>
    </StyledSectionDividerWave>
  );
}

SectionDividerWave.propTypes = {
  hasOverlap: PropTypes.bool,
  divider: PropTypes.shape({
    path: PropTypes.string,
    invertedPath: PropTypes.string,
    viewBox: PropTypes.string,
    mobile: PropTypes.shape({
      path: PropTypes.string,
      viewBox: PropTypes.string,
    }),
  }),
  align: PropTypes.string,
  color: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  flipped: PropTypes.bool,
  inverted: PropTypes.bool,
  dropShadow: PropTypes.bool,
};
