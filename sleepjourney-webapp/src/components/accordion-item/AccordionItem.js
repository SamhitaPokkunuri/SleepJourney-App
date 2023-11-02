import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import MuiBox from '@mui/material/Box';

const StyledAccordionItem = styled(MuiBox)`
  flex-grow: 1;
  min-width: 0;
`;

function AccordionItem(props) {
  const { children } = props;

  return <StyledAccordionItem>{children}</StyledAccordionItem>;
}

AccordionItem.propTypes = {
  /**
   * The content of the component.
   */
  children: PropTypes.node.isRequired,
};

export default AccordionItem;
