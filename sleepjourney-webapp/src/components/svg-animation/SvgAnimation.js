import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useInView } from 'react-intersection-observer';
import { motion, useAnimation } from 'framer-motion';
import { styled, css } from '@mui/material/styles';
import MuiBox from '@mui/material/Box';

const StyledSvgAnimation = styled(MuiBox, {
  shouldForwardProp: (prop) =>
    /( anchor|flipped|hasDivider|hasOverlap|offset|position|svgDivider|viewBox)/.test(
      prop
    ) === false,
})(
  ({
    theme,
    anchor,
    flipped,
    hasDivider,
    hasOverlap,
    offset,
    position,
    svgDivider,
    viewBox,
  }) => {
    let containerPositionStyles;

    if (anchor === 'top') {
      containerPositionStyles = css`
        top: ${0 + offset}px;
      `;
    } else if (anchor === 'bottom') {
      containerPositionStyles = css`
        bottom: ${0 - offset}px;
      `;
    } else {
      containerPositionStyles = css`
        top: calc(50% + ${offset}px);
        transform: translateY(-50%);
      `;
    }

    const aspectRatio = viewBox.split(' ')[3] / viewBox.split(' ')[2];
    let dividerHeight = 40;

    if (hasOverlap) {
      dividerHeight = 300;
    } else if (hasDivider && svgDivider) {
      dividerHeight = Number(svgDivider.divider.mobile.viewBox.split(' ')[3]);
    }

    let animationPositionStyles;

    if (position === 'left' || (position === 'right' && flipped)) {
      animationPositionStyles = css`
        ${theme.breakpoints.down('sm')} {
          left: -10%;
        }
        left: 0;
      `;
    } else if (position === 'center') {
      animationPositionStyles = css`
        left: 50%;
        transform: scaleX(${flipped ? -1 : 1}) translateX(-50%);
      `;
    } else if (position === 'right' || (position === 'left' && flipped)) {
      animationPositionStyles = css`
        ${theme.breakpoints.down('sm')} {
          right: -10%;
        }
        right: 0;
      `;
    }

    return css`
      position: absolute;
      overflow: hidden;
      z-index: 0;
      left: 0;
      right: 0;
      height: ${aspectRatio * 1200}px;
      bottom: ${dividerHeight}px;

      ${theme.breakpoints.up('sm')} {
        bottom: auto;
        height: ${aspectRatio * 1440}px;
        ${containerPositionStyles};
      }

      ${theme.breakpoints.up(1440)} {
        height: 0;
        padding-bottom: ${aspectRatio * 100}%;
      }

      .svgAnimation {
        display: block;
        position: absolute;
        transform: scaleX(${flipped ? -1 : 1});
        width: 100%;
        min-width: 1200px;
        ${animationPositionStyles};

        ${theme.breakpoints.up('sm')} {
          min-width: 1440px;
        }
      }
    `;
  }
);

export default function SvgAnimation(props) {
  const {
    animation: { path, viewBox, position },
    strokeColor,
    anchor = 'top',
    offset = 0,
    flipped = false,
    hasOverlap,
    backgroundDivider: { hasDivider, svgDivider },
  } = props;

  const [mounted, setMounted] = useState(false);
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  useEffect(() => {
    if (!mounted) {
      setMounted(true);
    }

    if (inView) {
      controls.start('visible');
    }
  }, [mounted, controls, inView]);

  const variants = {
    visible: { pathLength: 1 },
    hidden: { pathLength: 0 },
  };

  return mounted ? (
    <StyledSvgAnimation
      ref={ref}
      anchor={anchor}
      flipped={flipped}
      hasDivider={hasDivider}
      hasOverlap={hasOverlap}
      offset={offset}
      position={position}
      svgDivider={svgDivider}
      viewBox={viewBox}
    >
      <svg className="svgAnimation" viewBox={viewBox}>
        <motion.path
          d={path}
          stroke={strokeColor}
          fill="none"
          strokeWidth="4"
          strokeDasharray="none"
          initial="hidden"
          animate={controls}
          transition={{ duration: 2 }}
          variants={variants}
        />
      </svg>
    </StyledSvgAnimation>
  ) : null;
}

SvgAnimation.propTypes = {
  hasOverlap: PropTypes.bool,
  animation: PropTypes.shape({
    name: PropTypes.string,
    path: PropTypes.string,
    viewBox: PropTypes.string,
    position: PropTypes.string,
  }),
  flipped: PropTypes.bool,
  strokeColor: PropTypes.string,
  anchor: PropTypes.oneOf(['top', 'middle', 'bottom']),
  offset: PropTypes.number,
};
