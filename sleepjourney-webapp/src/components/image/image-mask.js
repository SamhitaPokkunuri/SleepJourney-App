import PropTypes from 'prop-types';
import { styled, css } from '@mui/material/styles';
import MuiBox from '@mui/material/Box';

const StyledImageMask = styled(MuiBox, {
  shouldForwardProp: (prop) => /(color)/.test(prop) === false,
})(
  ({ color }) => css`
    position: absolute;
    top: 50%;
    left: 50%;
    width: 110%;
    height: 110%;
    transform: translate(-50%, -50%);
    color: ${color};

    path {
      fill: none;
      stroke: currentColor;
      stroke-width: 5;
    }
  `
);

export default function ImageMask(props) {
  const { color } = props;

  return (
    <StyledImageMask
      component="svg"
      xmlns="http://www.w3.org/2000/svg"
      width="492"
      height="480"
      viewBox="0 0 492 480"
      color={color}
    >
      <g>
        <path d="M249,10c128,0,213.55,115,213.55,237.75S376.92,470,249,470,17.3,370.5,17.3,247.75,121,10,249,10Z" />
        <path d="M172.6,446.94C41.93,407.09-14,277.52,19.54,167.7S167.76-4.49,298.44,35.36s209.39,161.18,175.81,271S303.28,486.79,172.6,446.94Z" />
      </g>
    </StyledImageMask>
  );
}

ImageMask.propTypes = {
  color: PropTypes.string,
};
