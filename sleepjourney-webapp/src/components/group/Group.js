import React from 'react';
import clsx from 'clsx';
import { styled, css } from '@mui/material/styles';
import MuiBox from '@mui/material/Box';

import useWidthStyles from 'utils/useWidthStyles';
import useDisplayStyles from 'utils/useDisplayStyles';
import SupplyChain from 'components/group/SupplyChain';
import CodeOfConduct from 'components/group/CodeOfConduct';
import SocialExco from 'components/social-exco/SocialExco';

const StyledGroup = styled(MuiBox, {
  shouldForwardProp: (prop) =>
    /(customColors|hasGradient|width)/.test(prop) === false,
})(
  ({ theme, customColors, hasGradient, width }) => css`
    color: ${customColors?.text};
    background-color: ${!hasGradient ? customColors?.background : undefined};
    background-image: ${hasGradient ? customColors?.background : undefined};

    &.sustainableDevGoals {
      margin-left: auto;
      margin-right: auto;

      ${theme.breakpoints.up('sm')} {
        width: 83.33%;
      }

      ${theme.breakpoints.up('md')} {
        width: 66.666667%;
      }

      .MuiGrid-container {
        justify-content: center;

        > .MuiGrid-item {
          max-width: 200px;
          flex-basis: 50%;

          ${theme.breakpoints.up('sm')} {
            flex-basis: 50%;
          }

          ${theme.breakpoints.up('md')} {
            max-width: 250px;
          }

          h5 {
            font-size: 1rem;
            line-height: 1.5rem;
            font-weight: 700;
            text-align: center;
            margin-top: ${theme.spacing(1)};

            ${theme.breakpoints.up('sm')} {
              font-size: inherit;
              line-height: inherit;
              margin-top: ${theme.spacing(2)};
            }

            ${theme.breakpoints.up('md')} {
              font-size: inherit;
              line-height: inherit;
            }
          }

          p {
            font-weight: 300;
            font-size: 1rem;
            line-height: 1.125rem;
            text-align: center;
            margin-top: 0;
          }
        }
      }
    }

    &.sustainableDevList {
      margin-left: auto;
      margin-right: auto;

      .MuiGrid-container {
        justify-content: center;

        > .MuiGrid-item {
          max-width: 250px;
          margin-bottom: ${theme.spacing(2)};
          flex-basis: 33.33333333%;

          ${theme.breakpoints.up('md')} {
            max-width: 200px;
            margin-bottom: ${theme.spacing(3)};
          }
        }
      }
    }

    &.largeNumStatement {
      h3:first-of-type:not(.vdf-text-vodafonered),
      h3.vdf-text-vodafonered:first-of-type {
        margin-bottom: 0;
      }

      h3.vdf-text-vodafonered:not(:first-of-type):not(:last-child) {
        margin: 0;
      }

      h3:last-of-type:not(.vdf-text-vodafonered),
      h3.vdf-text-vodafonered:last-child {
        margin-top: 0;
      }
    }

    &.largeNumFeature {
      h3:first-of-type {
        margin-top: ${theme.spacing(2)};

        ${theme.breakpoints.up('md')} {
          margin-top: ${theme.spacing(3)};
        }

        ${theme.breakpoints.up('lg')} {
          margin-top: 0;
        }
      }

      h3 {
        margin: 0;
        color: ${theme.palette.common.dimGrey};
      }

      p,
      p:first-of-type {
        width: 100%;
      }

      p:not(:last-child),
      p:first-of-type:not(:last-child) {
        margin: 0;
      }

      p:first-of-type {
        margin-top: 0;
      }

      .MuiGrid-item {
        ${theme.breakpoints.down('lg')} {
          max-width: 100%;
          flex-basis: 100%;
        }
      }
    }

    &.statBar {
      position: relative;

      &:before,
      &:after {
        content: '';
        display: block;
        height: 5px;
      }

      &:before {
        background-color: ${theme.palette.common.lightGrey};
        width: 100%;
      }

      &:after {
        background-color: ${theme.palette.common.red};
        width: ${width}%;
        position: absolute;
        top: 0;
      }

      p:first-of-type {
        margin-top: ${theme.spacing(2)};
        margin-bottom: ${theme.spacing(1)};
      }
    }

    &.contactBanner {
      .MuiGrid-item {
        &:first-of-type {
          margin-bottom: ${theme.spacing(2)};
        }

        > * {
          margin: 0;
        }

        p {
          color: ${theme.palette.common.white};
        }
      }

      ${theme.breakpoints.up('sm')} {
        .MuiGrid-item {
          display: flex;
          flex-direction: column;
          justify-content: center;
          margin-bottom: 0px !important;

          &:last-child {
            align-items: flex-end;
          }
        }
      }

      ${theme.breakpoints.up('md')} {
        button {
          min-width: 200px;
        }

        button.yes-button,
        button.no-button {
          min-width: auto;
        }
      }
    }

    &.centerAligned {
      display: flex;
      justify-content: center;
    }
  `
);

function hasClassName(array, value) {
  return array && array.includes(value);
}

export default function Group(props) {
  const {
    anchor,
    children,
    widthControlExt,
    responsiveControl,
    className,
    customColors,
  } = props;

  const hasGradient = customColors?.background?.includes('gradient');
  const hasStatBar = hasClassName(className, 'vdf-stat-bar');
  const isSupplyChain = hasClassName(className, 'vdf-supply-chain');
  const isCodeConduct = hasClassName(className, 'vdf-code-of-conduct');
  const isLogoTitle = hasClassName(className, 'vdf-logo-title');
  const isStep = hasClassName(className, 'vdf-step');
  const isTier = hasClassName(className, 'vdf-tier');
  const isStepGroup = hasClassName(className, 'vdf-steps-group');
  const isOutline = hasClassName(className, 'vdf-outline');
  const isContactBanner = hasClassName(className, 'vdf-contact-banner');
  const isCenterAligned = hasClassName(className, 'center-align');
  const isExCoSocial = hasClassName(className, 'exco-social');
  // to gauge the progress of the statbar
  let width = 0;
  if (
    hasStatBar &&
    children[0].props.content &&
    children[0].props.content.includes('%')
  ) {
    width = parseInt(children[0].props.content.replace('%', ''));
  }
  const widthStyles = useWidthStyles(widthControlExt);
  const displayStyles = useDisplayStyles(responsiveControl);

  if (isSupplyChain || isTier) {
    return React.createElement(SupplyChain, props);
  } else if (
    isCodeConduct ||
    isLogoTitle ||
    isStep ||
    isStepGroup ||
    isOutline
  ) {
    return React.createElement(CodeOfConduct, props);
  } else if (isExCoSocial) {
    return React.createElement(SocialExco, null, props.children);
  }

  // contains custom classes to be removed at a later stage
  const classNames = clsx('vdf-group', className, {
    sustainableDevGoals: hasClassName(className, 'vdf-sustainable-dev-goals'),
    sustainableDevList: hasClassName(className, 'vdf-sustainable-dev-list'),
    largeNumStatement: hasClassName(className, 'vdf-large-number-statement'),
    largeNumFeature: hasClassName(className, 'vdf-large-number-feature'),
    statBar: hasStatBar,
    codeConduct: isCodeConduct,
    stepCodeConduct: isStep,
    stepGroup: isStepGroup,
    outline: isOutline,
    contactBanner: isContactBanner,
    centerAligned: isCenterAligned,
  });

  return (
    <StyledGroup
      id={anchor}
      className={classNames}
      sx={{
        ...widthStyles,
        ...displayStyles,
      }}
      customColors={customColors}
      hasGradient={hasGradient}
      width={width}
    >
      {children}
    </StyledGroup>
  );
}
