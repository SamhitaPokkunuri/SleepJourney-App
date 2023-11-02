import PropTypes from 'prop-types';
import { styled, css } from '@mui/material/styles';
import MuiBox from '@mui/material/Box';

const StyledAudio = styled(MuiBox)(
  ({ theme }) => css`
    margin: ${theme.spacing(0, 0, 3)};

    &:last-child {
      margin-bottom: 0;
    }

    &:focus {
      outline: none;
    }

    & > audio {
      display: block;
      width: 100%;

      &:focus {
        outline: none;
      }
    }
  `
);

function Audio(props) {
  const { src } = props;

  return (
    <StyledAudio component="figure">
      <audio controls src={src}>
        Your browser does not support the <code>audio</code> element.
      </audio>
    </StyledAudio>
  );
}

Audio.propTypes = {
  /**
   * The source of the audio file.
   */
  src: PropTypes.string.isRequired,
};

export default Audio;
