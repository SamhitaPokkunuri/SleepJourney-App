//Application dependencies
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

// Vendor and internal dependencies
import { Accordion, Tabs } from 'components';

export default function TabsPreRender(props) {
  const {
    layout = {
      mobile: {
        orientation: 'horizontal',
      },
      desktop: {
        orientation: 'horizontal',
      },
    },
  } = props;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const accordionProps = {
    ...props,
    name: 'vdfblocks/tabs -> vdfblocks/accordion',
    children: props.children.map((item, i) => ({
      ...item,
      props: {
        ...item.props,
        title: props.titles[i].text,
      },
    })),
  };

  const { orientation } = isMobile ? layout.mobile : layout.desktop;

  return isMobile && layout.mobile.orientation === 'vertical' ? (
    <Accordion {...accordionProps} />
  ) : (
    <Tabs orientation={orientation} {...props} />
  );
}
