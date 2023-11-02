//Application dependencies
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

// Vendor and internal dependencies
import { AccordionItem, Tab } from 'components';

export default function TabPreRender(props) {
  const { layout } = props;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const accordionItemProps = {
    ...props,
    name: 'vdfblocks/tab -> vdfblocks/accordion-item',
  };

  return isMobile && layout?.mobile.orientation === 'vertical' ? (
    <AccordionItem {...accordionItemProps} />
  ) : (
    <Tab {...props} />
  );
}
