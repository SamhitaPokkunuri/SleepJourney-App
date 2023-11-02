import { styled, css } from '@mui/material/styles';
import MuiBox from '@mui/material/Box';
import MuiList from '@mui/material/List';
import MuiListItem from '@mui/material/ListItem';
import MuiTypography from '@mui/material/Typography';

import { Image } from 'components';

const StyledAvailableCountries = styled(MuiBox)(
  ({ theme }) => css`
    margin-bottom: ${theme.spacing(3)};

    .heading {
      margin: ${theme.spacing(3, 0, 1)};
      font-weight: 700;
    }

    .countryList {
      display: flex;
      flex-wrap: wrap;
      padding: 0;
      margin: ${theme.spacing(0, -0.75)};
    }

    .countryListItem {
      width: auto;
      padding: 0;
      margin: ${theme.spacing(0, 0.75, 0.75)};
      border-radius: 50%;
      box-shadow: rgb(0 0 0 / 40%) 0px 0px 6px 0px;
    }
  `
);

export default function AvailableCountries(props) {
  const { label, children } = props;

  return (
    <StyledAvailableCountries>
      <MuiTypography className="heading" variant="h5">
        {label}
      </MuiTypography>
      <MuiList className="countryList">
        {children.map((item) => (
          <MuiListItem key={item.key} className="countryListItem">
            <Image
              {...item.props}
              width={40}
              height={40}
              className="is-style-rounded"
              marginBottom={false}
              alt={item.props.alt}
            />
          </MuiListItem>
        ))}
      </MuiList>
    </StyledAvailableCountries>
  );
}
