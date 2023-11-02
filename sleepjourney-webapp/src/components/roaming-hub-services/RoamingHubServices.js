import PropTypes from 'prop-types';
import { styled, css } from '@mui/material/styles';
import MuiList from '@mui/material/List';
import MuiListItem from '@mui/material/ListItem';

const StyledRoamingHubServices = styled(MuiList)(
  ({ theme }) => css`
    margin: 20px auto;
    max-width: ${theme.containers.values.sm}px;

    ${theme.breakpoints.up('sm')} {
      margin: 40px auto;
    }

    ${theme.breakpoints.up('md')} {
      margin: 60px auto;
    }

    ${theme.breakpoints.up('xl')} {
      column-count: 2;
      max-width: none;
    }

    > li {
      justify-content: center;
    }
  `
);

export default function RoamingHubServices(props) {
  const { children } = props;

  return (
    <StyledRoamingHubServices disablePadding>
      {children.map((child) => {
        return (
          <MuiListItem key={child.key} disablePadding>
            {child}
          </MuiListItem>
        );
      })}
    </StyledRoamingHubServices>
  );
}

RoamingHubServices.propTypes = {
  /**
   * The content of the component.
   */
  children: PropTypes.node.isRequired,
};
