import { styled, css } from '@mui/material/styles';
import MuiBox from '@mui/material/Box';
import useScrollingIndicator from 'utils/useScrollingIndicator';

const StyledScrollingIndicator = styled(MuiBox)(
  ({ theme }) => css`
    z-index: 99;

    .scroll-bar {
      background-color: ${theme.palette.common.red};
      width: 0;
      height: 5px;
      display: block;
      transition: width 0.2s ease;
    }
  `
);

export default function ScrollingIndicator(props) {
  const width = useScrollingIndicator();

  return (
    <StyledScrollingIndicator {...props}>
      <span className="scroll-bar" style={{ width }}></span>
    </StyledScrollingIndicator>
  );
}
