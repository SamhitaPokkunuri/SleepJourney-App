import PropTypes from 'prop-types';
import { styled, css } from '@mui/material/styles';
import MuiList from '@mui/material/List';

const StyledProfessionalServices = styled(MuiList)(
  ({ theme }) => css`
    counter-reset: olCounter;
    margin: 0 -16px -40px;

    ${theme.breakpoints.up(480)} {
      margin: 0 -24px -40px;
    }

    ${theme.breakpoints.up('md')} {
      margin: 0 -32px -40px;
    }

    ${theme.breakpoints.up('lg')} {
      width: 1160px;
      margin: 0 auto -440px;
    }
  `
);

export default function ProfessionalServices(props) {
  const { children } = props;

  return (
    <StyledProfessionalServices component="ol" disablePadding>
      {children}
    </StyledProfessionalServices>
  );
}

ProfessionalServices.propTypes = {
  /**
   * The content of the component.
   */
  children: PropTypes.node.isRequired,
};
