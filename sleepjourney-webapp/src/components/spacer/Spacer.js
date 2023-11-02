import MuiBox from '@mui/material/Box';

import useDisplayStyles from 'utils/useDisplayStyles';

export default function Spacer({ height, responsiveControl }) {
  const displayStyles = useDisplayStyles(responsiveControl);

  return (
    <MuiBox
      component="div"
      style={{ height: `${height}px` }}
      sx={{ ...displayStyles }}
    ></MuiBox>
  );
}
