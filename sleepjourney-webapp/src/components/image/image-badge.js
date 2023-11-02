import PropTypes from 'prop-types';
import { styled, css } from '@mui/material/styles';
import MuiBox from '@mui/material/Box';

import Badge from './badge/badge.js';

const StyledImageBadge = styled(MuiBox, {
  shouldForwardProp: (prop) => /(color|hideImage|size)/.test(prop) === false,
})(
  ({ theme, color, hideImage, size }) => css`
    position: ${hideImage ? 'relative' : 'absolute'};
    top: ${hideImage ? 0 : -Math.floor(size / 5)}px;
    right: ${hideImage ? 0 : -Math.floor(size / 5)}px;
    margin: ${hideImage ? '0 auto' : 0};
    width: ${hideImage ? '100%' : '60%'};
    max-width: ${hideImage ? '100%' : size};
    color: ${color};

    svg {
      width: 100%;
      height: auto;
    }

    circle.background {
      fill: currentColor;
    }

    .lines path {
      fill: ${color === '#e60000' || color === 'rgb(230, 0, 0)'
        ? theme.palette.common.white
        : theme.palette.common.red};
    }
  `
);

export default function ImageBadge(props) {
  const { color, size, hideImage } = props;

  return (
    <StyledImageBadge color={color} hideImage={hideImage} size={size}>
      <Badge />
    </StyledImageBadge>
  );
}

ImageBadge.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  hideImage: PropTypes.bool,
};
