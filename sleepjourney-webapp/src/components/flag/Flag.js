import { styled } from '@mui/material/styles';
import MuiBox from '@mui/material/Box';

const codes = [
  'al',
  'au',
  'cd',
  'cz',
  'de',
  'eg',
  'es',
  'gb',
  'gh',
  'gr',
  'hu',
  'ie',
  'in',
  'it',
  'ke',
  'is',
  'mz',
  'ng',
  'nl',
  'nz',
  'pt',
  'ro',
  'tr',
  'tz',
  'za',
];

const StyledFlag = styled(MuiBox)(({ theme }) => {
  const width = 27;
  const height = 18;

  const flags = codes.reduce((acc, code, index) => {
    return {
      ...acc,
      [`&.${code}`]: {
        backgroundPositionY: index * -height,
      },
    };
  }, {});

  return {
    width,
    height,
    flexShrink: 0,
    pointerEvents: 'none',
    marginRight: theme.spacing(1),
    backgroundImage: 'url(/images/flags/flags@2x.png)',
    backgroundSize: `${width}px ${height * codes.length}px`,
    backgroundPositionX: 0,
    ...flags,
  };
});

export default function Flag(props) {
  const { code } = props;

  return <StyledFlag role="img" component="span" className={code} />;
}
