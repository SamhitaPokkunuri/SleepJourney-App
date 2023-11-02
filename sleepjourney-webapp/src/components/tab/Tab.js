import PropTypes from 'prop-types';
import { styled, css } from '@mui/material/styles';
import MuiBox from '@mui/material/Box';

const StyledTab = styled(MuiBox)(
  ({ theme }) => css`
    ${theme.breakpoints.up('sm')} {
      padding: ${theme.spacing(1.2, 0)};
    }
  `
);

function Tab(props) {
  const { children } = props;

  return <StyledTab>{children}</StyledTab>;
}

Tab.propTypes = {
  /**
   * The content of the component.
   */
  children: PropTypes.node.isRequired,
};

export default Tab;
