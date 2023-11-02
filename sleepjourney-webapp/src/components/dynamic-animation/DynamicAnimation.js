import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Lottie from 'lottie-react-web';
import { styled } from '@mui/material/styles';
import MuiBox from '@mui/material/Box';
import { getAnimation } from 'lib/graphql/getAnimation';

import useWidthStyles from 'utils/useWidthStyles';
import useDisplayStyles from 'utils/useDisplayStyles';

const StyledAnimation = styled(MuiBox)`
  position: relative;
`;

function DynamicAnimation(props) {
  const [animData, setAnimData] = useState(null);
  const [loading, setLoading] = useState(false);
  const {
    infiniteLoop,
    renderer,
    autoPlay,
    selectedAnimation,
    widthControlExt,
    responsiveControl,
  } = props;

  const widthStyles = useWidthStyles(widthControlExt);
  const displayStyles = useDisplayStyles(responsiveControl);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const res = await getAnimation(selectedAnimation.id);
      if (res?.body?.value) {
        setAnimData(JSON.parse(unescape(res.body.value)));
      }
      setLoading(false);
    }
    loadData();
  }, []);

  if (loading) {
    return 'Loading animation...';
  }

  return animData ? (
    <StyledAnimation sx={{ ...widthStyles, ...displayStyles }}>
      <Lottie
        options={{
          animationData: animData,
          loop: infiniteLoop,
          autoplay: autoPlay,
          rendererSettings: renderer,
        }}
      />
    </StyledAnimation>
  ) : (
    'Animation error, please check your data!'
  );
}

DynamicAnimation.propTypes = {
  /**
   * Will start playing as soon as it is ready.
   */
  autoPlay: PropTypes.bool,
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

DynamicAnimation.defaultProps = {
  autoPlay: true,
  infiniteLoop: false,
};

export default DynamicAnimation;
