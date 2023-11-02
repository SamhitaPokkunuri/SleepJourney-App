import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import ReactPlayer from 'react-player/lazy';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme, styled, css } from '@mui/material/styles';
import MuiBox from '@mui/material/Box';
import MuiButton from '@mui/material/Button';
import MuiContainer from '@mui/material/Container';
import MuiDialog from '@mui/material/Dialog';
import MuiFade from '@mui/material/Fade';

import { Play, PlayGrey, PlaySimple } from './icons';
import capitalise from 'utils/capitalise';
import addAssetPrefix from 'utils/addAssetPrefix';
import useWidthStyles from 'utils/useWidthStyles';
import useDisplayStyles from 'utils/useDisplayStyles';

const icons = {
  play: Play,
  playGrey: PlayGrey,
  simple: PlaySimple,
};

const StyledVideo = styled(MuiBox, {
  shouldForwardProp: (prop) => /(coverImage|ratio)/.test(prop) === false,
})(
  ({ theme, coverImage, ratio }) => css`
    margin-bottom: ${theme.spacing(3)};

    &.layoutFill {
      background-color: black;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      display: flex;
      align-items: center;
      margin: 0;
    }

    .player {
      position: relative;
      height: 0;
      background-color: ${theme.palette.common.black};
      background-size: cover;
      background-position: center;
      background-image: ${coverImage ? `url(${coverImage})` : 'none'};
      outline: none;
      padding-bottom: ${(ratio[1] / ratio[0]) * 100}%;

      & > div {
        position: absolute;
        right: 0;
        left: 0;
      }

      svg {
        height: 90px;
        width: 90px;
      }

      video {
        outline: none;
      }
    }

    .mobileOverlayButton {
      svg {
        margin-left: auto;
        display: block;
        height: 90px;
        width: 90px;
      }
    }

    .container {
      background-color: ${theme.palette.common.darkGrey};
    }

    .paper {
      background-color: transparent;
      color: ${theme.palette.common.white};
      max-width: 1200px;
      margin: auto;
      padding: 60px 5%;
      width: 100%;

      ${theme.breakpoints.down('sm')} {
        max-width: 100% !important;
      }
    }

    .close {
      position: fixed;
      top: 11px;
      right: 11px;
      outline: none;
      color: ${theme.palette.common.white};

      ${theme.breakpoints.up('sm')} {
        top: 22px;
        right: 22px;
      }

      ${theme.breakpoints.up('md')} {
        top: 36px;
        right: 36px;
      }

      &:before {
        font-family: VodafoneIcons;
        font-size: 2em;
        content: ${theme.icons.close};
      }

      span {
        color: transparent;
        position: absolute;
      }
    }
  `
);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <MuiFade ref={ref} {...props} />;
});

function youTubeGetID(url) {
  url = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
  return url[2] !== undefined ? url[2].split(/[^0-9a-z_\-]/i)[0] : url[0];
}

function Video(props) {
  const {
    displayAs,
    src,
    aspectRatio,
    widthControlExt,
    responsiveControl,
    poster,
    className,
    videoName,
    videoDescription,
    videoThumbnailUrl,
    videoUploadDate,
    layout,
    name,
  } = props;

  const isYouTube = name === 'core-embed/youtube';
  const youtubeMovieId = isYouTube && src ? youTubeGetID(src) : '';
  const [imageFileName, setImageFileName] = useState('');
  const [loadingCover, setLoadingCover] = useState(true);

  useEffect(() => {
    if (isYouTube && youtubeMovieId) {
      fetch(`/api/ytimg`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ youtubeMovieId }),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if (data?.url) {
            setImageFileName(data.url);
          }
          setLoadingCover(false);
        })
        .catch((err) => {
          console.error(err);
          setLoadingCover(false);
        });
    } else {
      setLoadingCover(false);
    }
  }, [src]);

  const widthStyles = useWidthStyles(widthControlExt);
  const displayStyles = useDisplayStyles(responsiveControl);
  const coverImage = poster ? addAssetPrefix(poster) : null;
  const [open, setOpen] = useState(false);
  const handleOpen = (e) => {
    e.preventDefault();
    setOpen(true);
  };
  const theme = useTheme();
  const ratio = aspectRatio.split(':');
  const tabletUpView = useMediaQuery(theme.breakpoints.up('md'));
  const tabletDownView = useMediaQuery(theme.breakpoints.down('md'));
  let IconSymbol = className?.includes('is-style-vdf-simple-play-icon')
    ? icons['simple']
    : icons['play'];

  if (displayAs === 'overlay' && tabletDownView) {
    IconSymbol = icons['playGrey'];
  }

  return (
    <StyledVideo
      className={clsx({
        [`layout${capitalise(layout)}`]: layout !== 'default',
      })}
      sx={{ ...widthStyles, ...displayStyles }}
      coverImage={coverImage}
      ratio={ratio}
    >
      {(displayAs !== 'overlay' || tabletUpView) && (
        <MuiContainer className="player">
          {loadingCover ? (
            'Loading...'
          ) : (
            <ReactPlayer
              width="100%"
              height="100%"
              url={src}
              light={coverImage || imageFileName || true}
              playIcon={<IconSymbol />}
              controls
              playing
            />
          )}
        </MuiContainer>
      )}
      {displayAs === 'overlay' && tabletDownView && (
        <>
          <div className="mobileOverlayButton" onClick={handleOpen}>
            <IconSymbol />
          </div>
          {open && (
            <MuiDialog
              open={open}
              onClose={() => setOpen(false)}
              aria-labelledby="vdf-modal-title"
              aria-describedby="vdf-modal-description"
              PaperProps={{
                classes: { root: 'paper' },
                elevation: 0,
                square: true,
              }}
              classes={{
                container: 'container',
              }}
              hideBackdrop
              transition={Transition}
              scroll="body"
            >
              <MuiButton
                onClick={() => setOpen(false)}
                className="close"
                color="inherit"
              >
                Close modal
              </MuiButton>
              <MuiContainer className="player">
                <ReactPlayer
                  width="100%"
                  height="100%"
                  url={src}
                  config={{ vimeo: { playerOptions: { playsinline: true } } }} // to prevent fullscreen mode
                  controls
                  playing
                />
              </MuiContainer>
            </MuiDialog>
          )}
        </>
      )}
      <div
        dangerouslySetInnerHTML={{
          __html: `
            <script type="application/ld+json">
              {
                "@context": "https://schema.org",
                "@type": "VideoObject",
                "name": "${videoName}",
                "description": "${videoDescription}",
                "thumbnailUrl": "${videoThumbnailUrl}",
                "uploadDate": "${videoUploadDate}"
              }
            </script>
          `,
        }}
      />
    </StyledVideo>
  );
}

Video.propTypes = {
  /**
   * Sets the aspect ratio of the video.
   */
  aspectRatio: PropTypes.oneOf(['1:1', '4:3', '16:9']),
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * Sets the position of the video relative to it's container.
   */
  layout: PropTypes.oneOf(['default', 'fill']),
  /**
   * @ignore
   */
  responsiveControl: PropTypes.shape({
    mobile: PropTypes.bool,
    tablet: PropTypes.bool,
    desktop: PropTypes.bool,
  }),
  /**
   * Sets the src for the video.
   */
  src: PropTypes.string.isRequired,
  /**
   * @ignore
   */
  widthControlExt: PropTypes.shape({
    mobile: PropTypes.number,
    tablet: PropTypes.number,
    desktop: PropTypes.number,
  }),
};

Video.defaultProps = {
  aspectRatio: '16:9',
  layout: 'default',
};

export default Video;
