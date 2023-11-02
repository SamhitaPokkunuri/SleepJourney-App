import PropTypes from 'prop-types';
import { styled, css } from '@mui/material/styles';
import MuiBox from '@mui/material/Box';
import MuiListItem from '@mui/material/ListItem';

const StyledProfessionalServicesItem = styled(MuiListItem)(
  ({ theme }) => css`
    counter-increment: olCounter;
    align-items: start;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 16px;

    &::after {
      content: '';
      position: absolute;
      background-repeat: no-repeat;
      background-size: cover;
      z-index: -1;
      background-position: center;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }

    .list-item-content {
      max-width: 288px;
      margin: auto;

      ${theme.breakpoints.up('sm')} {
        max-width: 660px;
      }

      &::before {
        display: block;
        content: counter(olCounter);
        line-height: 48px;
        text-align: center;
        background-color: ${theme.palette.common.red};
        border-radius: 24px;
        height: 48px;
        width: 48px;
        font-weight: 900;
        font-size: 2rem;
        color: white;
      }
    }

    &:nth-of-type(3n + 1) {
      height: 420px;

      ${theme.breakpoints.between(420, 'lg')} {
        width: 420px;
        margin: auto;
      }

      ${theme.breakpoints.up('sm')} {
        width: 480px;
        height: 480px;
        padding: 80px;
      }

      &::after {
        background-image: url(images/background/circle-1.svg);
      }
    }

    &:nth-of-type(3n + 2) {
      height: 640px;
      top: -40px;

      ${theme.breakpoints.between(640, 'lg')} {
        width: 640px;
        margin: auto;
      }

      ${theme.breakpoints.up('sm')} {
        width: 720px;
        height: 720px;
        padding: 120px;
      }

      ${theme.breakpoints.up('lg')} {
        width: 780px;
        height: 780px;
        top: -370px;
        left: 380px;
      }

      &::after {
        background-image: url(images/background/circle-2.svg);
      }
    }

    &:nth-of-type(3n + 3) {
      height: 1080px;
      top: -106px;

      ${theme.breakpoints.between(1080, 'lg')} {
        width: 1080px;
        margin: auto;
      }

      ${theme.breakpoints.up('lg')} {
        width: 960px;
        height: 960px;
        padding: 200px;
        top: -490px;
      }

      &::after {
        background-image: url(images/background/circle-3.svg);
      }
    }

    div[role='grid'] {
      margin-top: 0;

      ${theme.breakpoints.down('sm')} {
        margin-bottom: 20px;
      }
    }

    div[role='gridcell'] {
      ${theme.breakpoints.down('sm')} {
        display: flex;
        margin-bottom: 0;

        br {
          display: none;
        }

        .react-svg-icon {
          margin-right: 16px;

          svg {
            font-size: 60px;
          }
        }

        p {
          text-align: left;
        }
      }

      ${theme.breakpoints.up('sm')} {
        text-align: center;
      }
    }
  `
);

export default function ProfessionalServicesItem(props) {
  const { children } = props;

  return (
    <StyledProfessionalServicesItem>
      <MuiBox className="list-item-content">{children}</MuiBox>
    </StyledProfessionalServicesItem>
  );
}

ProfessionalServicesItem.propTypes = {
  /**
   * The content of the component.
   */
  children: PropTypes.node.isRequired,
};
