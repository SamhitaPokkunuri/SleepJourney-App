import { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { styled, css } from '@mui/material/styles';
import MuiBox from '@mui/material/Box';
import MuiButton from '@mui/material/Button';
import MuiTypography from '@mui/material/Typography';

import { ThemeContext } from '../layout/FoundationPage';
import Icon from '../icon/Icon';
import { pulse, rotate, scale } from 'utils/cssAnimations';

const StyledFaqFeedback = styled(MuiBox, {
  shouldForwardProp: (prop) => /(align|customColors)/.test(prop) === false,
})(
  ({ theme, align, customColors }) => css`
    ${theme.breakpoints.up('sm')} {
      display: flex;
      align-items: center;
      justify-content: ${align};
    }

    .typography {
      font-size: 1rem !important;
      color: ${customColors?.text
        ? customColors.text
        : theme.palette.common.red};
      font-weight: 700;

      &,
      &:first-of-type {
        margin: ${theme.spacing(1, 2, 1, 0)};
      }
    }

    .faq-button {
      margin-right: ${theme.spacing(1)};
      min-height: 44px;
      min-width: 80px;
      padding: ${theme.spacing(0, 3)};
      flex-grow: 1;
      background-color: ${theme.palette.common.white};
      color: ${theme.palette.common.black};
      transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);

      &:last-child {
        margin-right: 0;
      }

      .react-svg-icon {
        flex-shrink: 0;
        margin-left: ${theme.spacing(1)};
        transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1);
      }
    }

    .square-button {
      border-radius: 2px;
      box-shadow: ${theme.cards.boxShadow};
      animation-duration: 400;
      animationtimingfunction: cubic-bezier(0.4, 0, 0.2, 1);

      &.yes-button {
        transform-origin: center right;

        .react-svg-icon {
          transform-origin: center left;
        }
      }

      &.no-button {
        transform-origin: center left;

        .react-svg-icon {
          transform-origin: center right;
        }
      }

      &:hover,
      &.active {
        background-color: ${theme.palette.common.red};
        color: ${theme.palette.common.white};
      }

      &::after {
        content: '';
        height: 100%;
        opacity: 0;
        border: 2px solid ${theme.palette.common.red};
        width: 100%;
        position: absolute;
        border-radius: 2;
        animation-duration: 400;
        animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      }

      .react-svg-icon {
        animation-duration: 400;
        animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      }

      &.animating {
        animation-name: ${scale};

        &::after {
          animation-name: ${pulse};
        }

        .icon {
          animation-name: ${rotate};
        }
      }
    }

    .rounded-button {
      border-radius: 100px;
      border: 2px solid ${theme.palette.common.darkGrey};

      &:hover,
      &.active {
        border-color: ${theme.palette.common.red};

        .label {
          transform: translateX(3px);
        }

        .icon {
          transform: rotate(-12deg);
        }
      }

      &:hover:not(.active) {
        background-color: ${theme.palette.common.white};
        color: ${theme.palette.common.red};
        box-shadow: ${theme.cards.boxShadow};
      }

      &.active {
        background-color: ${theme.palette.common.red};
        color: ${theme.palette.common.white};
      }
    }

    .label {
      transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1);
      font-size: 1rem;
      font-weight: 700;
      display: table;
    }
  `
);

export default function FaqFeedback(props) {
  const { label, email, align, customColors } = props;
  const [feedback, setFeedback] = useState(false);
  const [animating, setAnimating] = useState('');
  const context = useContext(ThemeContext);
  const shape = context === 'foundation' ? 'rounded' : 'square';

  const handleFeedback = (button) => (e) => {
    if (button === 'yes') {
      e.preventDefault();
      setFeedback(!feedback);
    }

    setAnimating(button);
    setTimeout(() => {
      setAnimating('');
    }, 500);
  };

  return (
    <StyledFaqFeedback align={align} customColors={customColors}>
      <MuiTypography className="typography">{label}</MuiTypography>
      <MuiBox display="flex" paddingY={1}>
        <MuiButton
          className={clsx('faq-button', 'yes-button', `${shape}-button`, {
            animating: animating === 'yes',
            active: feedback,
          })}
          onClick={handleFeedback('yes')}
        >
          <span className="label">Yes</span>
          <Icon icon="ThumbsUp" iconSet="foundation" fontSize="small" />
        </MuiButton>
        <MuiButton
          className={clsx('faq-button', 'no-button', `${shape}-button`, {
            animating: animating === 'no',
          })}
          href={email ? `mailto:${email}` : undefined}
          onClick={handleFeedback('no')}
        >
          <span className="label">No</span>
          <Icon icon="ThumbsDown" iconSet="foundation" fontSize="small" />
        </MuiButton>
      </MuiBox>
    </StyledFaqFeedback>
  );
}

FaqFeedback.propTypes = {
  label: PropTypes.string,
  email: PropTypes.string,
  align: PropTypes.string,
};
