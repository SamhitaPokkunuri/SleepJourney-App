// Vendor and internal dependencies
import { Video } from 'components';

export default function Youtube(props) {
  const { displayAs, url, widthControlExt, name } = props;

  return (
    <Video
      displayAs={displayAs}
      src={url}
      widthControlExt={widthControlExt}
      name={name}
    />
  );
}
