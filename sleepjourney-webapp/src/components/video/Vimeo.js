// Vendor and internal dependencies
import { Video } from 'components';

export default function Vimeo(props) {
  const { displayAs, url, widthControlExt } = props;

  return <Video displayAs={displayAs} src={url} widthControlExt={widthControlExt} />;
}
