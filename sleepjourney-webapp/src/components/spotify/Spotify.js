import { styled, css } from '@mui/material/styles';
import Embed from '../embed/Embed';

const StyledEmbed = styled(Embed)(
  () => css`
    &.spotify {
      max-height: 250px;
    }
  `
);

export default function Spotify(props) {
  const { url } = props;

  const URI = url.replace('https://open.spotify.com/', '');
  return (
    <StyledEmbed
      title="Spotify"
      className="spotify"
      url={`https://embed.spotify.com/${URI}?utm_source=generator&theme=0`}
      allowtransparency="true"
    />
  );
}
