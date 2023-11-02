import PropTypes from 'prop-types';
import { styled, css } from '@mui/material/styles';
import MuiBox from '@mui/material/Box';

import Heading from '../heading/Heading';

const StyledRoamingHubServicesItem = styled(MuiBox)(
  ({ theme }) => css`
    padding: 6px 0px;
    margin: 0 0 8px;
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;

    ${theme.breakpoints.up('sm')} {
      flex-direction: row;
      margin: 0;
      padding: 6px 20px;
    }

    .heading {
      margin: 0 0 12px 0;
      text-align: center;

      ${theme.breakpoints.up('sm')} {
        margin: 0 36px 0 0;
        text-align: right;
        flex-grow: 0;
        flex-basis: 180px;
        flex-shrink: 0;
      }

      ${theme.breakpoints.up('md')} {
        flex-basis: 200px;
      }

      ${theme.breakpoints.up('xxl')} {
        margin: 0 48px 0 0;
      }
    }

    .content {
      position: relative;
      background-color: ${theme.palette.common.white};
      box-shadow: 0px 2px 8px 0 rgba(0, 0, 0, 0.16);
      overflow: hidden;
      display: flex;
      flex-grow: 1;
      flex-shrink: 0;
      font-size: 1.125rem;
      height: 40px;
      border-radius: 20px;

      ${theme.breakpoints.up('sm')} {
        font-size: 1.25rem;
        height: 48px;
        border-radius: 24px;
      }

      ${theme.breakpoints.up('xxl')} {
        font-size: 1.5rem;
      }

      &:after {
        content: '';
        position: absolute;
        background-image: url(/images/background/curves.svg);
        background-size: 40px 40px;
        height: 40px;
        width: 40px;
        left: calc(50% - 20px);
        top: 0;

        ${theme.breakpoints.up('sm')} {
          background-size: 48px 48px;
          height: 48px;
          width: 48px;
          left: calc(50% - 24px);
        }
      }

      .stat {
        padding: 0 20px;
        max-width: 50%;
        flex-basis: 50%;
        flex-grow: 0;
        display: flex;
        align-items: center;
        font-weight: 300;

        ${theme.breakpoints.up('sm')} {
          padding: 0 30px;
        }

        .total {
          font-weight: 900;
          margin-right: 8px;
        }
      }

      .networks {
        color: ${theme.palette.common.darkGrey};
        justify-content: end;

        .total {
          color: ${theme.palette.common.red};
        }
      }

      .countries {
        background-color: ${theme.palette.common.red};
        color: ${theme.palette.common.white};
        justify-content: start;
      }
    }
  `
);

export default function RoamingHubServicesItem(props) {
  const { countries, networks, heading } = props;

  return (
    <StyledRoamingHubServicesItem>
      <Heading className="heading" variant="h5">
        {heading}
      </Heading>
      <MuiBox className="content">
        <span className="stat networks">
          <span className="total">{networks}</span> Networks
        </span>
        <span className="stat countries">
          <span className="total">{countries}</span> Countries
        </span>
      </MuiBox>
    </StyledRoamingHubServicesItem>
  );
}

RoamingHubServicesItem.propTypes = {
  /**
   * The number of countries to display.
   */
  countries: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  /**
   * The heading to display.
   */
  heading: PropTypes.string.isRequired,
  /**
   * The number of networks to display.
   */
  networks: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
};
