import { Provider } from 'react-redux';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { ThemeProvider } from '@mui/material/styles';
import { ThemeProvider as Emotion10ThemeProvider } from 'emotion-theming';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../src/styles/theme';
import { useStore } from 'store';
import './styles.css';
import * as nextImage from 'next/image';

Object.defineProperty(nextImage, 'default', {
  configurable: true,
  value: (props) => <img {...props} />,
});

const withThemeProvider = (Story, context) => {
  const store = useStore();

  return (
    <Emotion10ThemeProvider theme={theme}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Story {...context} />
        </ThemeProvider>
      </Provider>
    </Emotion10ThemeProvider>
  );
};

export const decorators = [withThemeProvider];

export const parameters = {
  controls: {
    expanded: true,
    sort: 'alpha',
  },
  docs: {
    source: {
      excludeDecorators: true,
    },
  },
  jsx: {
    showDefaultProps: false,
  },
  nextRouter: {
    Provider: RouterContext.Provider,
  },
  options: {
    storySort: {
      order: [
        'Welcome',
        'Components',
        ['Data Display', 'Inputs', 'Layout', 'Navigation', 'Surfaces'],
      ],
    },
  },
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
};
