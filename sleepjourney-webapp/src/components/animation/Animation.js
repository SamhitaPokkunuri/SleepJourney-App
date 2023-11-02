import PropTypes from 'prop-types';
import Lottie from 'lottie-react-web';
import { styled } from '@mui/material/styles';
import MuiBox from '@mui/material/Box';

import useWidthStyles from 'utils/useWidthStyles';
import useDisplayStyles from 'utils/useDisplayStyles';

const StyledAnimation = styled(MuiBox)`
  position: relative;
`;

function Animation(props) {
  const {
    infiniteLoop,
    renderer,
    autoPlay,
    data,
    widthControlExt,
    responsiveControl,
  } = props;

  const widthStyles = useWidthStyles(widthControlExt);
  const displayStyles = useDisplayStyles(responsiveControl);

  return (
    <StyledAnimation sx={{ ...widthStyles, ...displayStyles }}>
      <Lottie
        options={{
          animationData: data,
          loop: infiniteLoop,
          autoplay: autoPlay,
          rendererSettings: renderer,
        }}
      />
    </StyledAnimation>
  );
}

Animation.propTypes = {
  /**
   * Will start playing as soon as it is ready.
   */
  autoPlay: PropTypes.bool,
  /**
   * The JSON file containing the animation data.
   */
  data: PropTypes.object,
  /**
   * Will play the animation over and over.
   */
  infiniteLoop: PropTypes.bool,
  /**
   * Settings object to render the animation.
   */
  renderer: PropTypes.string,
  /**
   * @ignore
   */
  responsiveControl: PropTypes.shape({
    mobile: PropTypes.bool,
    tablet: PropTypes.bool,
    desktop: PropTypes.bool,
  }),
  /**
   * @ignore
   */
  widthControlExt: PropTypes.shape({
    mobile: PropTypes.number,
    tablet: PropTypes.number,
    desktop: PropTypes.number,
  }),
};

Animation.defaultProps = {
  autoPlay: true,
  infiniteLoop: false,
};

export default Animation;
