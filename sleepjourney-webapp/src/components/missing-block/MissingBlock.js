import MuiBox from '@mui/material/Box';
import MuiContainer from '@mui/material/Container';
import MuiGrid from '@mui/material/Grid';

export default function MissingBlock({ name }) {
  return (
    <MuiBox component="div" className="vdf-missing-block">
      <MuiContainer fixed>
        <MuiGrid container direction="row">
          Missing block {name} need to add children here and message of what is
          missing...
        </MuiGrid>
      </MuiContainer>
    </MuiBox>
  );
}
