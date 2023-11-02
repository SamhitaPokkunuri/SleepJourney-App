import clsx from 'clsx';
import { styled, css } from '@mui/material/styles';
import MuiBox from '@mui/material/Box';

import useWidthStyles from 'utils/useWidthStyles';
import ConditionalWrapper from 'utils/conditionalWrapper';
import Icon from '../icon/Icon';

const StyledSupplyChain = styled(MuiBox)(
  ({ theme }) => css`
    &.supplyChain {
      position: relative;
      overflow-x: hidden;
      max-width: 1750px;
      margin: 0 auto;
      padding-top: ${theme.spacing(4)};
      padding-bottom: ${theme.spacing(6)};

      .diagram {
        padding: ${theme.spacing(1, 1, 6)};
        width: 100%;

        ${theme.breakpoints.up(1060)} {
          display: none;
        }
      }
    }

    &.supplyChainTier {
      position: relative;

      ${theme.breakpoints.up(1060)} {
        margin-top: -42px;
      }

      .inner-tier {
        margin-top: -13px;
        padding-bottom: ${theme.spacing(2)};
        position: relative;

        ${theme.breakpoints.up(1060)} {
          position: absolute;
          top: -32px;
          right: 60px;
          z-index: 3;
          margin-top: 0;
          max-width: 350px;
          padding-bottom: ${theme.spacing(0.5)};
          background-color: ${theme.palette.common.white};
          box-shadow: ${theme.cards.boxShadow};
        }

        h3 {
          position: relative;
          background-color: ${theme.palette.common.red};
          color: ${theme.palette.common.white};
          padding: ${theme.spacing(2, 1)};
          margin: 0;
          font-size: 1.75rem;
          line-height: 2.25rem;

          ${theme.breakpoints.up(1060)} {
            padding: ${theme.spacing(2)};

            &:before {
              content: '';
              display: block;
              height: 24px;
              width: 24px;
              border: 1px solid ${theme.palette.common.red};
              border-radius: 50%;
              background-color: ${theme.palette.common.white};
              position: absolute;
              top: 24px;
              left: -12px;
            }
          }
        }

        p {
          margin: 0 !important;
          padding: ${theme.spacing(2, 1)};

          ${theme.breakpoints.up(1060)} {
            padding: ${theme.spacing(2)};
          }
        }
      }

      &.vdf-tier-1 {
        ${theme.breakpoints.up(1060)} {
          position: relative;
          z-index: 2;
          margin-top: 0;
        }
      }

      &.vdf-tier-2 {
        .inner-tier {
          ${theme.breakpoints.up(1060)} {
            left: 40px;
            right: auto;
            top: 157px;
          }

          h3 {
            background-color: ${theme.palette.supplyChain.darkOliveGreen};

            &:before {
              border-color: ${theme.palette.supplyChain.darkOliveGreen};
              right: -12px;
              left: auto;
            }
          }
        }
      }

      &.vdf-tier-3 {
        .inner-tier {
          ${theme.breakpoints.up(1060)} {
            top: 176px;
          }

          h3 {
            background-color: ${theme.palette.supplyChain.darkPink};

            &:before {
              border-color: ${theme.palette.supplyChain.darkPink};
            }
          }
        }
      }

      &.vdf-tier-4 {
        .inner-tier {
          ${theme.breakpoints.up(1060)} {
            top: 0;
            margin: 0;
            position: relative;
            float: right;
            margin-top: -44px !important;
          }

          h3 {
            background-color: ${theme.palette.supplyChain.darkTeal};

            &:before {
              border-color: ${theme.palette.supplyChain.darkTeal};
            }
          }
        }

        .vdf-tier-4-end {
          ${theme.breakpoints.up(1060)} {
            margin-top: -42px;
          }
        }
      }

      .svg {
        position: relative;
        z-index: 1;

        &.desktop,
        & g[class*='__hidden-mobile'] {
          display: none;

          ${theme.breakpoints.up(1060)} {
            display: block;
          }
        }

        &.mobile {
          ${theme.breakpoints.up(1060)} {
            display: none;
          }
        }

        svg {
          margin: auto;
          display: block;

          ${theme.breakpoints.down(1060)} {
            width: 100%;
          }

          ${theme.breakpoints.up(1060)} {
            width: 100%;
            width: 989px;
            height: 365.669px;

            &.logo {
              height: 221.666px;
            }

            &.tier-1 {
              height: 212.75px;
            }

            &.tier-2 {
              height: 286.665px;
            }

            &.tier-3 {
              height: 244.664px;
            }
          }
        }
      }
    }
  `
);

function hasClassName(array, value) {
  return array && array.includes(value);
}

export default function SupplyChain(props) {
  const { children, widthControlExt, className } = props;

  const isSupplyChain = hasClassName(className, 'vdf-supply-chain');
  const isTier = hasClassName(className, 'vdf-tier');
  const widthStyles = useWidthStyles(widthControlExt);

  // contains custom classes to be removed at a later stage
  const classNames = clsx('vdf-group', className, {
    supplyChain: isSupplyChain,
    supplyChainTier: isTier,
  });

  return (
    <StyledSupplyChain className={classNames} sx={{ ...widthStyles }}>
      {isSupplyChain && (
        <Icon
          icon="Diagram"
          iconSet="supply-chain"
          className="diagram mobile"
        />
      )}
      {isTier && className.includes('1') && (
        <>
          <div className="svg mobile">
            <Icon icon="LogoMobile" iconSet="supply-chain" />
          </div>
          <div className="svg desktop">
            <Icon icon="Logo" iconSet="supply-chain" className="logo" />
          </div>
        </>
      )}
      {isTier && className.includes('2') && (
        <div className="svg">
          <Icon icon="Tier1" iconSet="supply-chain" className="tier-1" />
        </div>
      )}
      {isTier && className.includes('3') && (
        <div className="svg">
          <Icon icon="Tier2" iconSet="supply-chain" className="tier-2" />
        </div>
      )}
      {isTier && className.includes('4') && (
        <>
          <div className="svg">
            <Icon icon="Tier3" iconSet="supply-chain" className="tier-3" />
          </div>
          <div className="svg desktop vdf-tier-4-end">
            <Icon icon="Tier4" iconSet="supply-chain" />
          </div>
        </>
      )}
      <ConditionalWrapper
        condition={isTier}
        wrapper={(children) => <div className="inner-tier">{children}</div>}
      >
        {children}
      </ConditionalWrapper>

      {isTier && className.includes('4') && (
        <>
          <div className="svg mobile">
            <Icon icon="Tier4" iconSet="supply-chain" />
          </div>
        </>
      )}
    </StyledSupplyChain>
  );
}
