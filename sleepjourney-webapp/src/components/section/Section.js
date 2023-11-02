import { useContext } from 'react';
import clsx from 'clsx';
import { styled, css } from '@mui/material/styles';
import MuiBox from '@mui/material/Box';
import MuiContainer from '@mui/material/Container';

import {
  Heading,
  SvgAnimation,
  SectionDividerWave,
  SectionDividerPattern,
} from 'components';
import addAssetPrefix from 'utils/addAssetPrefix';
import { ThemeContext } from '../layout/FoundationPage';

const StyledSection = styled(MuiBox, {
  shouldForwardProp: (prop) =>
    /(backgroundAnimation|backgroundDivider|customColors|disablePaddingTop|hasGradient|isCoverImageMobile|isFoundation|backgroundControl)/.test(
      prop
    ) === false,
})(
  ({
    theme,
    backgroundAnimation,
    backgroundDivider,
    customColors,
    disablePaddingTop,
    hasGradient,
    isCoverImageMobile,
    isFoundation,
    backgroundControl,
  }) => {
    let backgroundImageStyles = css`
      .backgroundImage {
        background-image: ${backgroundControl.bgImage?.url
          ? `url(${addAssetPrefix(backgroundControl.bgImage?.url)})`
          : 'none'};
        background-size: ${backgroundControl.innerBackground
          ? 'contain'
          : 'cover'};
        background-repeat: no-repeat;
        background-position: ${backgroundControl.focalPoint.x}%
          ${backgroundControl.focalPoint.y}%;
      }
    `;

    if (isCoverImageMobile) {
      backgroundImageStyles = css`
        ${backgroundImageStyles};
        .backgroundImage {
          ${theme.breakpoints.down('sm')} {
            background-size: cover;
          }
        }
      `;
    }

    const { svgDivider, hasDivider } = backgroundDivider;
    const { svgAnimation } = backgroundAnimation;

    let backgroundDividerStyles;
    let backgroundAnimationStyles;

    if (svgDivider) {
      const { divider, align, height } = svgDivider;

      if (divider) {
        backgroundDividerStyles = css`
          .backgroundDivider {
            position: relative;
            padding-${align}: ${height};

            ${theme.breakpoints.down('sm')} {
              padding-bottom: ${Number(divider.mobile.viewBox.split()[3])};
            }
          }
        `;
      }
    }

    if (svgAnimation) {
      const { viewBox } = svgAnimation.animation;
      const width = viewBox.split(' ')[2];
      const height = viewBox.split(' ')[3];
      // 1200 is the minWidth the animation will be at mobile
      const paddingBottom = (height / width) * 1200;
      let dividerHeight = 40;

      if (hasDivider && svgDivider) {
        dividerHeight = Number(svgDivider.divider.mobile.viewBox.split(' ')[3]);
      }

      backgroundAnimationStyles = css`
        .backgroundAnimation {
          ${theme.breakpoints.down('sm')} {
            padding-bottom: ${Math.round(paddingBottom) + dividerHeight};
          }
        }
      `;
    }

    return css`
      &:before {
        display: block;
        content: '';
        visibility: hidden;
        pointer-events: none;

        // 1px is deducted here from the top because of some lame
        // fractional pixel nonsense. Please solve.
        margin-top: ${isFoundation ? '-47px' : '-95px'};
        height: ${isFoundation ? '47px' : '95px'};

        ${theme.breakpoints.up('sm')} {
          margin-top: ${isFoundation ? '-59px' : '-119px'};
          height: ${isFoundation ? '59px' : '119px'};
        }

        ${theme.breakpoints.up('md')} {
          margin-top: ${isFoundation ? '-71px' : '-131px'};
          height: ${isFoundation ? '71px' : '131px'};
        }
      }

      .wrapper {
        padding-right: ${theme.spacing(1.6)};
        padding-left: ${theme.spacing(1.6)};
        color: ${customColors?.text};
        background-color: ${!hasGradient
          ? customColors?.background
          : undefined};
        background-image: ${hasGradient ? customColors?.background : undefined};
        position: relative;

        ${theme.breakpoints.up(480)} {
          padding-right: ${theme.spacing(2.4)};
          padding-left: ${theme.spacing(2.4)};
        }

        ${theme.breakpoints.up('md')} {
          padding-right: ${theme.spacing(3.2)};
          padding-left: ${theme.spacing(3.2)};
        }

        ${theme.breakpoints.up('xl')} {
          padding-right: ${theme.spacing(4.8)};
          padding-left: ${theme.spacing(4.8)};
        }

        ${theme.breakpoints.up('xxl')} {
          padding-right: ${theme.spacing(6)};
          padding-left: ${theme.spacing(6)};
        }
      }

      .sectionTopBottom {
        padding-top: ${disablePaddingTop ? 0 : theme.spacing(5)};
        padding-bottom: ${theme.spacing(4)};

        ${theme.breakpoints.up('md')} {
          padding-top: ${disablePaddingTop ? 0 : theme.spacing(8)};
          padding-bottom: ${theme.spacing(7)};
        }

        ${theme.breakpoints.up('xxl')} {
          padding-top: ${disablePaddingTop ? 0 : theme.spacing(13)};
          padding-bottom: ${theme.spacing(10)};
        }
      }

      .sectionFoundationTopBottom {
        padding-top: ${disablePaddingTop ? 0 : theme.spacing(4)};
        padding-bottom: ${theme.spacing(4)};

        ${theme.breakpoints.up('md')} {
          padding-top: ${disablePaddingTop ? 0 : theme.spacing(6)};
          padding-bottom: ${theme.spacing(7)};
        }
      }

      .slimBanner {
        min-height: 120px;
        padding-top: ${theme.spacing(2)};
        padding-bottom: ${theme.spacing(2)};

        ${theme.breakpoints.up('sm')} {
          padding-top: ${theme.spacing(3)};
          padding-bottom: ${theme.spacing(3)};
        }
      }

      .innerSection {
        position: relative;
        margin: 0 auto;
        max-width: 100%;

        & > :first-of-type:not(style):not(:first-of-type ~ *),
        & > style + * {
          margin-top: 0;
        }
      }

      .container {
        ${theme.breakpoints.up('sm')} {
          max-width: ${theme.containers.values.sm}px;
        }

        ${theme.breakpoints.up('md')} {
          max-width: ${theme.containers.values.md}px;
        }

        ${theme.breakpoints.up('xxl')} {
          max-width: ${theme.containers.values.lg}px;
        }
      }

      .header {
        margin-right: auto;
        margin-left: auto;

        ${theme.breakpoints.up('sm')} {
          max-width: ${theme.containers.values.sm}px;
        }

        ${theme.breakpoints.up('md')} {
          max-width: ${theme.containers.values.md}px;
        }

        ${theme.breakpoints.up('xxl')} {
          max-width: ${theme.containers.values.lg}px;
        }
      }

      ${backgroundImageStyles};
      ${backgroundDividerStyles};
      ${backgroundAnimationStyles};

      .overlap {
        ${theme.breakpoints.down('sm')} {
          padding-bottom: 0;
        }
      }

      .shopBanner {
        padding: 30px 30px 20px 30px;

        .MuiGrid-container {
          align-items: center;
        }

        .MuiTypography-h3 {
          margin-bottom: 0;
          font-weight: 300;
        }

        ${theme.breakpoints.up('sm')} {
          [class*='roundedButton'] {
            min-width: auto;
            width: 100%;
            max-width: 340px;
          }
        }

        ${theme.breakpoints.up('md')} {
          padding: 60px 60px 24px 60px;
        }
      }

      .coverImageMobile {
        background-size: cover;
        background-repeat: repeat;

        ${theme.breakpoints.down('md')} {
          background-size: cover;
        }
      }
    `;
  }
);

export default function Section(props) {
  const {
    anchor,
    subTitle,
    title,
    children,
    className,
    vdfBackgroundControl,
    fullWidth,
    slimHeight,
    customColors,
    prevSiblingBlock,
    backgroundAnimation = {},
    backgroundDivider = {},
  } = props;

  const { hasAnimation, svgAnimation } = backgroundAnimation;
  const { hasDivider, type, patternName, hasOverlap, svgDivider } =
    backgroundDivider;
  const isFirstChildMediaText =
    children[0]?.props.name === 'vdfblocks/media-text';
  const isShopBanner = className?.includes('vdf-shop-banner');
  const isCoverImageMobile = className?.includes('vdf-background-cover-mobile');
  const hasGradient = customColors?.background?.includes('gradient');
  const context = useContext(ThemeContext);
  const isFoundation = context === 'foundation';

  const backgroundControl = {
    focalPoint: {
      x: 50,
      y: 50,
    },
    ...vdfBackgroundControl,
  };

  const disablePaddingTop =
    // Only if there's a previous block
    prevSiblingBlock &&
    // and has same background color as the previous block
    prevSiblingBlock.attributes?.customColors?.background ===
      customColors?.background &&
    // and the previous block doesn't have a background image
    !prevSiblingBlock.attributes?.vdfBackgroundControl?.bgImage?.url &&
    // and the current block doesn't have a background image
    !vdfBackgroundControl?.bgImage?.url &&
    // section does not have an anchor
    !anchor &&
    // the previous section does not have a pattern
    !prevSiblingBlock.attributes?.backgroundDivider?.hasDivider;

  return (
    <StyledSection
      id={anchor}
      backgroundAnimation={backgroundAnimation}
      backgroundDivider={backgroundDivider}
      customColors={customColors}
      disablePaddingTop={disablePaddingTop}
      hasGradient={hasGradient}
      isCoverImageMobile={isCoverImageMobile}
      isFoundation={isFoundation}
      backgroundControl={backgroundControl}
    >
      <MuiBox
        id="section"
        className={clsx('wrapper', {
          sectionTopBottom: !slimHeight && !isFoundation,
          sectionFoundationTopBottom: !slimHeight && isFoundation,
          slimBanner: slimHeight,
          backgroundImage:
            !vdfBackgroundControl?.innerBackground &&
            vdfBackgroundControl?.bgImage?.url,
          backgroundDivider: hasDivider && type !== 'pattern',
          backgroundAnimation: hasAnimation,
          overlap: hasOverlap && svgDivider?.align === 'bottom',
          shopBanner: isShopBanner,
        })}
      >
        {hasAnimation && (
          <SvgAnimation
            {...svgAnimation}
            backgroundDivider={backgroundDivider}
            hasOverlap={hasOverlap && isFirstChildMediaText}
          />
        )}
        <MuiContainer
          maxWidth={false}
          className={clsx('innerSection', {
            container: !fullWidth,
            backgroundImage:
              vdfBackgroundControl?.innerBackground &&
              vdfBackgroundControl?.bgImage?.url,
          })}
        >
          {(title?.text || subTitle?.text) && (
            <Heading
              className="header"
              variant={title?.text ? 'h2' : 'h4'}
              component={title?.text ? 'h2' : 'h4'}
            >
              {title?.text ? title.text : subTitle?.text}
            </Heading>
          )}
          {children}
        </MuiContainer>
        {hasDivider && type !== 'pattern' && (
          <SectionDividerWave
            {...svgDivider}
            hasOverlap={hasOverlap && isFirstChildMediaText}
          />
        )}
      </MuiBox>
      {hasDivider && type === 'pattern' && (
        <SectionDividerPattern patternName={patternName} />
      )}
    </StyledSection>
  );
}
