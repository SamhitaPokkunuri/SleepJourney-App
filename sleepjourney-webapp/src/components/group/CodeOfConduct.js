import React from 'react';
import clsx from 'clsx';
import { styled, css } from '@mui/material/styles';
import MuiBox from '@mui/material/Box';

import useWidthStyles from 'utils/useWidthStyles';
import ConditionalWrapper from 'utils/conditionalWrapper';
import Icon from '../icon/Icon';

const StyledCodeOfConduct = styled(MuiBox)(
  ({ theme }) => css`
    &.codeConduct {
      position: relative;

      ul {
        padding: 0;
      }

      ul li {
        list-style-type: none;
        align-items: baseline;
        padding: 0;

        &:before {
          content: "";
          display: inline-block;
          margin: ${theme.spacing(0, 1.6, 0, 0)};
          border: 2px solid ${theme.palette.common.red};
          border-radius: 50%;
          width: 10px;
          height: 10px;
        }

        p {
          display: inline;
        }

        div {
          display: inline-block;
        }

        span {
          margin-top: 0 !important;
        }
      }

      .vdf-narrow-steps {
        max-width: 540px;
        margin: auto;
        padding: ${theme.spacing(0.8, 3)};

        .inner-step {
          max-width: 100%;
          padding: 0;
        }
      }
    }

    &.stepCodeConduct {
      .inner-step {
        max-width: 540px;
        margin: auto;
        padding: ${theme.spacing(0.8, 3)};
      }

      .adornment {
        display: block;
        margin: 0 auto 16px;
        width: 220px;

        &.large {
          width: 100%;

          .border {
            height: 20px;
            border:  2px solid #979797;
            border-top: none;
            border-radius: 0 0 40px 40px;
            margin-bottom: ${theme.spacing(3.2)};

            &:before, &:after {
              content: "";
              height: 24px;
              width: 36px;
              transform: none;
              border-radius: 0 36px 0 0;
              border-top: 2px solid #979797;
              border-right: 2px solid #979797;
              position: absolute;
              left: calc(50% - 37px);
              top: 18px;
              box-shadow: 0 -21px 0 0 #fff;
            }

            &:after {
              transform: scaleX(-1);
              left: calc(50% - 1px);
            }
          }
        }
      }

      .border {
        position: relative;
        height: 10px;
        margin-bottom: ${theme.spacing(2.4)};
        display: block;
        border: 2px solid ${theme.palette.common.gainsboro};
        border-top: none;
        border-radius: 0 0 20px 20px;

        &:before {
          content: "";
          display: block;
          box-shadow: 2px 2px 0 0 ${theme.palette.common.gainsboro};
          width: 20px;
          height: 20px;
          position: absolute;
          transform: rotate(45deg) skew(5deg, 5deg);
          top: -3px;
          background: ${theme.palette.common.white};
          left: calc(50% - 10px);
        }
      }

      .disc {
        border: 2px solid ${theme.palette.common.red};
        border-radius: 50%;
        width: 20px;
        height: 20px;
        display: block;
        margin: auto;
      }

      h4 {
        margin-top: 0;
      }
    }

    &.outline {
      .inner-step {
        background: ${theme.palette.common.white};
        position: relative;
        z-index: 1;
        border: 2px solid #979797;
        border-right: none;
        padding-top: ${theme.spacing(2.4)};
      }

      .disc {
        background-color: ${theme.palette.common.red};
      }

      ul li:before {
        background-color: ${theme.palette.common.red};
      }
    }

    &.stepGroup {
      position: relative;

      &:before {
        content: "";
        position: absolute;
        top: 90px;
        bottom: 96px;
        left: 12px;
        width: calc(50% - 106px);
        border: 2px solid #979797;
        border-radius: 30px 0 0 30px;
        border-right-color: transparent;
        z-index: 0;
      }

      &:after {
        content: "";
        position: absolute;
        box-shadow: 2px 2px 0 0 #979797;
        width: 24px;
        height: 24px;
        left: calc(50% - 120px);
        top: 79px;
        transform: rotate(-45deg);
      }
    }

    .logoTitle {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 120px;

      ${theme.breakpoints.up('sm')} {
        height: 212px;
      }

      h3 {
        position: relative;
        background: ${theme.palette.common.white};
        margin: ${theme.spacing(4, 2, 0)}};
        border-radius: ${theme.spacing(8)};
        line-height: 1;
        z-index: 1;

        ${theme.breakpoints.up('sm')} {
          margin: ${theme.spacing(5.2, 3, 0)};
        }
      }

      svg {
        position: absolute;
        top: 0;
        left: 12px;
        z-index: 1;
        height: 120px;
        width: auto;

        ${theme.breakpoints.up('sm')} {
          height: 212px;
        }
      }
    }
`
);

function hasClassName(array, value) {
  return array && array.includes(value);
}

export default function CodeOfConduct(props) {
  const { children, widthControlExt, className } = props;

  const isCodeConduct = hasClassName(className, 'vdf-code-of-conduct');
  const isLogoTitle = hasClassName(className, 'vdf-logo-title');
  const isStep = hasClassName(className, 'vdf-step');
  const isStepGroup = hasClassName(className, 'vdf-steps-group');
  const isOutline = hasClassName(className, 'vdf-outline');
  const widthStyles = useWidthStyles(widthControlExt);

  // contains custom classes to be removed at a later stage
  const classNames = clsx('vdf-group', className, {
    codeConduct: isCodeConduct,
    stepCodeConduct: isStep,
    stepGroup: isStepGroup,
    outline: isOutline,
  });

  return (
    <StyledCodeOfConduct className={classNames} sx={{ ...widthStyles }}>
      {isStep && !isStepGroup && (
        <span
          className={clsx('adornment', {
            large: className && className.includes('vdf-large-step'),
          })}
        >
          <span className="border"></span> <span className="disc"></span>
        </span>
      )}
      <ConditionalWrapper
        condition={(isStep && !isStepGroup) || isLogoTitle}
        wrapper={(children) => (
          <div
            className={clsx({
              ['inner-step']: isStep,
              logoTitle: isLogoTitle,
            })}
          >
            {children}
          </div>
        )}
      >
        {isLogoTitle && <Icon icon="Logo" iconSet="code-conduct" />}
        {children}
      </ConditionalWrapper>
    </StyledCodeOfConduct>
  );
}
