import MuiBox from '@mui/material/Box';

import useWidthStyles from 'utils/useWidthStyles';
import useDisplayStyles from 'utils/useDisplayStyles';

export default function Embed(props) {
  const {
    widthControlExt,
    responsiveControl,
    url,
    height = 400,
    className,
  } = props;
  const widthStyles = useWidthStyles(widthControlExt);
  const displayStyles = useDisplayStyles(responsiveControl);

  return (
    <MuiBox sx={{ ...widthStyles, ...displayStyles }}>
      <iframe
        src={url}
        width="100%"
        height={height}
        frameBorder="0"
        className={className}
        allowFullScreen
      ></iframe>
    </MuiBox>
  );
}
