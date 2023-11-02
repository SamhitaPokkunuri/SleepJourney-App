import { createTheme } from '@mui/material/styles';

const colors = {
  // Greys
  white: '#ffffff',
  shadeGrey: '#f4f4f4',
  lightGrey: '#ebebeb',
  gainsboro: '#d8d8d8',
  silver: '#cccccc',
  mediumGrey: '#b2b2b2',
  spanishGrey: '#999999',
  grey: '#767264',
  dimGrey: '#666',
  defaultGrey: '#4a4d4e',
  charcoal: '#424242',
  darkGrey: '#333333',
  black: '#000000',
  // Colors
  cyan: '#00b0ca',
  teal: '#007c92',
  darkTeal: '#007079',
  lightBlue: '#00aac1',
  darkBlue: '#2b6bab',
  green: '#aeba00',
  lightGreen: '#d6da91',
  oliveGreen: '#aeb900',
  darkOliveGreen: '#a1a601',
  yellow: '#ffcb00',
  lightYellow: '#fecb00',
  orange: '#f49b00',
  lightPink: '#b193a8',
  pink: '#fe61af',
  darkPink: '#7f1d7c',
  red: 'rgb(230, 0, 0)',
  alphaRed: 'rgba(230, 0, 0, 0.75)',
  darkRed: '#bd0000',
  // Social colours
  linkedin: '#0a66c2',
  twitter: '#1da1f2',
  youtube: '#ff0000',
  instagram: '#833ab4',
  facebook: '#1877f2',
  email: '#072f56',
};

// Create a theme instance, below overrides defaults
// https://material-ui.com/customization/default-theme/
const theme = createTheme({
  typography: {
    fontFamily: 'VodafoneRegular, Arial, sans-serif',
    body1: {
      lineHeight: '1.375em',
    },
    body2: {
      lineHeight: '1.375em',
    },
  },
  palette: {
    common: {
      white: colors.white,
      shadeGrey: colors.shadeGrey,
      lightGrey: colors.lightGrey,
      gainsboro: colors.gainsboro,
      silver: colors.silver,
      mediumGrey: colors.mediumGrey,
      spanishGrey: colors.spanishGrey,
      grey: colors.grey,
      dimGrey: colors.dimGrey,
      darkGrey: colors.darkGrey,
      defaultGrey: colors.defaultGrey,
      black: colors.black,
      pink: colors.pink,
      red: colors.red,
      darkRed: colors.darkRed,
      alphaRed: colors.alphaRed,
      cyan: colors.cyan,
      teal: colors.teal,
    },
    primary: {
      main: colors.white,
      light: colors.white,
      dark: colors.shadeGrey,
      contrastText: colors.darkGrey,
    },
    secondary: {
      main: colors.red,
      light: colors.alphaRed,
      dark: colors.darkRed,
      contrastText: colors.white,
    },
    tertiary: {
      main: colors.silver,
      contrastText: colors.black,
    },
    background: {
      default: colors.white,
    },
    borders: {
      primary: colors.mediumGrey,
    },
    text: {
      primary: colors.darkGrey,
      secondary: colors.dimGrey,
      disabled: colors.spanishGrey,
      hint: colors.spanishGrey,
    },
    social: {
      twitter: colors.twitter,
      facebook: colors.facebook,
      linkedin: colors.linkedin,
      email: colors.email,
      instagram: colors.instagram,
      youtube: colors.youtube,
    },
    table: {
      cyan: colors.cyan,
      green: colors.green,
      red: colors.red,
      yellow: colors.lightYellow,
    },
    supplyChain: {
      darkOliveGreen: colors.darkOliveGreen,
      darkPink: colors.darkPink,
      darkTeal: colors.darkTeal,
    },
  },
  cards: {
    borderRadius: 0,
    boxShadow: '0px 2px 8px 0 rgba(0, 0, 0, 0.16)',
    boxShadowHover: '0px 2px 12px 0 rgba(0, 0, 0, 0.20)',
    border: `4px solid ${colors.red}`,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 768,
      md: 992,
      lg: 1280,
      xl: 1440,
      xxl: 1680,
    },
  },
  containers: {
    values: {
      sm: 768,
      md: 1280,
      lg: 1440,
      xl: 1680,
    },
  },
  spacing: 10,
  shape: {
    borderRadius: 6,
  },
  icons: {
    chevronUp: '"\\e91a"',
    chevronRight: '"\\e91b"',
    chevronDown: '"\\e91c"',
    chevronLeft: '"\\e91d"',
    chevronUpFill: '"\\e91e"',
    chevrontRightFill: '"\\e91f"',
    chevronDownFill: '"\\e920"',
    chevrontLeftFill: '"\\e921"',
    chevronRightLG: '"\\e901"',
    chevronLeftLG: '"\\e902"',
    chevronUpXL: '"\\e903"',
    chevronDownXL: '"\\e904"',
    arrowLeft: '"\\e919"',
    close: '"\\e917"',
    globe: '"\\e90A"',
    hamburger: '"\\e905"',
    search: '"\\e90B"',
    download: '"\\e912"',
    popOut: '"\\e914"',
    tick: '"\\e916"',
    email: '"\\e909"',
    emailFill: '"\\e908"',
    facebook: '"\\e90d"',
    facebookFill: '"\\e90c"',
    linkedin: '"\\e910"',
    linkedinFill: '"\\e90f"',
    twitter: '"\\e913"',
    twitterFill: '"\\e911"',
    instagram: '"\\e90e"',
    youtube: '"\\e918"',
    account: '"\\e922"',
  },
});

theme.components = {
  MuiAccordion: {
    styleOverrides: {
      root: {
        '&.Mui-expanded': {
          margin: theme.spacing(1.5, 0),
          '&:last-child': {
            marginBottom: theme.spacing(1.5),
          },
        },
      },
      rounded: {
        borderRadius: theme.shape.borderRadius,
      },
    },
  },
  MuiAccordionSummary: {
    styleOverrides: {
      root: {
        padding: theme.spacing(0, 1),
        [theme.breakpoints.up('sm')]: {
          padding: theme.spacing(0, 2),
        },
        [theme.breakpoints.up('md')]: {
          padding: theme.spacing(0.5, 2.5),
        },
      },
      content: {
        margin: theme.spacing(2, 0),
      },
      expandIconWrapper: {
        '&.Mui-expanded': {
          transform: 'rotateX(180deg)',
        },
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: {
        textTransform: 'none',
        fontWeight: 700,
        minHeight: '48px',
        lineHeight: '1.25rem',
        padding: '10px 16px',
        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        minWidth: 150,
        fontSize: '1rem',
        [theme.breakpoints.up('sm')]: {
          fontSize: '1.125rem',
          padding: '16px 20px',
          minHeight: '56px',
        },
        [theme.breakpoints.up('md')]: {
          fontSize: '1.25rem',
        },
        '&.Mui-disabled': {
          color: theme.palette.common.spanishGrey,
          '&:after': {
            color: theme.palette.common.spanishGrey,
          },
        },
      },
      text: {
        padding: '10px 16px',
        [theme.breakpoints.up('sm')]: {
          padding: '16px 20px',
        },
      },
      textSecondary: {
        color: theme.palette.common.spanishGrey,
        '&:hover': {
          backgroundColor: 'transparent',
        },
        [theme.breakpoints.up('md')]: {
          fontSize: '1.125rem',
        },
      },
      outlined: {
        transition: 'none',
        padding: '5px 16px',
        borderRadius: '2px',
        border: `1px solid ${theme.palette.common.spanishGrey}`,
      },
      outlinedPrimary: {
        border: `1px solid ${theme.palette.primary.main}`,
        '&:hover': {
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
        },
      },
    },
  },
  MuiButtonBase: {
    defaultProps: { disableRipple: true },
  },
  MuiCheckbox: {
    styleOverrides: {
      colorSecondary: {
        '&.Mui-checked': {
          color: theme.palette.common.cyan,
          '&:hover': {
            backgroundColor: 'transparent',
          },
        },
      },
    },
  },
  MuiContainer: {
    defaultProps: { disableGutters: true, maxWidth: false },
  },
  MuiCssBaseline: {
    styleOverrides: `
      @font-face {
        font-family: VodafoneIcons;
        font-style: normal;
        font-display: auto;
        font-weight: 400;
        src: local('VodafoneIcons'),
          url('/fonts/vodafone-icons.woff') format('woff');
      }

      @font-face {
        font-family: VodafoneRegular;
        font-style: normal;
        font-display: auto;
        font-weight: 300;
        src: local('VodafoneLight'),
          url('/fonts/vodafone-light.woff') format('woff');
      }

      @font-face {
        font-family: VodafoneRegular;
        font-style: normal;
        font-display: auto;
        font-weight: 400;
        src: local('VodafoneRegular'),
          url('/fonts/vodafone-regular.woff') format('woff');
      }

      @font-face {
        font-family: VodafoneRegular;
        font-style: normal;
        font-display: auto;
        font-weight: 700;
        src: local('VodafoneBold'),
          url('/fonts/vodafone-bold.woff') format('woff');
      }

      @font-face {
        font-family: VodafoneRegular;
        font-style: normal;
        font-display: auto;
        font-weight: 900;
        src: local('VodafoneBlack'),
          url('/fonts/vodafone-black.woff') format('woff');
      }

      html {
        min-width: 320px;
        scroll-behavior: smooth;
      }

      a {
        color: inherit;
      }

      p:empty {
        display: none;
      }

      sup {
        position: relative;
        vertical-align: top;
        top: -7px;
        font-size: 0.875rem;
      }

      sub {
        position: relative;
        vertical-align: bottom;
        font-size: 0.875rem;
        bottom: -7px;
      }

      b,
      strong {
        font-weight: 900;
      }
    `,
  },
  MuiDivider: {
    styleOverrides: {
      root: {
        margin: theme.spacing(2, 0),
        backgroundColor: theme.palette.common.silver,
      },
    },
  },
  MuiFormControl: {
    styleOverrides: {
      root: {
        display: 'flex',
      },
    },
  },
  MuiFormLabel: {
    defaultProps: { focused: false },
    styleOverrides: {
      root: {
        fontWeight: 700,
        fontSize: '1.25rem',
        display: 'block',
        color: theme.palette.text.primary,
        padding: theme.spacing(2, 0),
      },
    },
  },
  MuiIconButton: {
    styleOverrides: {
      root: {
        '&.Mui-disabled': {
          backgroundColor: theme.palette.common.silver,
          color: theme.palette.common.white,
        },
      },
      colorSecondary: {
        '&:hover': {
          backgroundColor: 'transparent',
        },
      },
    },
  },
  MuiInputBase: {
    styleOverrides: {
      input: {
        height: '1.25em',
      },
    },
  },
  MuiList: {
    styleOverrides: {
      root: {
        margin: 'revert',
        [theme.breakpoints.up('sm')]: {
          fontSize: '1.125rem',
        },
        [theme.breakpoints.up('md')]: {
          fontSize: '1.25rem',
        },
      },
    },
  },
  MuiListItem: {
    defaultProps: { disableGutters: true },
  },
  MuiListItemText: {
    styleOverrides: {
      root: {
        marginTop: 0,
        marginBottom: 0,
      },
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        borderRadius: '6px',
        backgroundColor: theme.palette.common.white,
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: theme.palette.common.spanishGrey,
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: theme.palette.common.spanishGrey,
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: theme.palette.common.cyan,
        },
      },
      input: {
        fontSize: '1.125rem',
        padding: '16px',
      },
      inputSizeSmall: {
        paddingTop: '12px',
        paddingBottom: '12px',
      },
    },
  },
  MuiTab: {
    styleOverrides: {
      root: {
        fontSize: '1.25rem',
        textTransform: 'unset',
        lineHeight: '1em',
        padding: '12px 20px',
        maxWidth: 'none',
        flexDirection: 'row',
        [theme.breakpoints.up('sm')]: {
          minWidth: '80px',
        },
        '&.Mui-selected': {
          color: theme.palette.common.red,
        },
      },
      textColorInherit: {
        opacity: 1,
      },
    },
  },
  MuiTabs: {
    styleOverrides: {
      flexContainer: {
        display: 'flex',
        flexGrow: '1',
        flexShrink: '0',
      },
      flexContainerVertical: {
        justifyContent: 'start',
        alignItems: 'start',
        flexShrink: '1',
      },
      scrollable: {
        display: 'flex',
        overflowX: 'auto',
        overflowY: 'hidden',
      },
      vertical: {
        flexShrink: '0',
        maxWidth: '400px',
        paddingRight: '48px',
        width: '30%',
      },
    },
  },
  MuiToolbar: {
    defaultProps: { disableGutters: true },
  },
  MuiTypography: {
    styleOverrides: {
      h1: {
        fontSize: '1.75rem',
        fontWeight: 900,
        lineHeight: '1em',
        '& strong, & b': {
          fontWeight: 900,
        },
        [theme.breakpoints.up('sm')]: {
          fontSize: '2.5rem',
        },
        [theme.breakpoints.up('md')]: {
          fontSize: '3.5rem',
        },
      },
      h2: {
        fontSize: '1.875rem',
        fontWeight: 900,
        lineHeight: '1em',
        marginTop: '1.25rem',
        marginBottom: '2.5rem',
        '& strong, & b': {
          fontWeight: 900,
        },
        [theme.breakpoints.up('sm')]: {
          fontSize: '2.5rem',
        },
        [theme.breakpoints.up('md')]: {
          fontSize: '3.125rem',
          marginTop: '1.25rem',
        },
      },
      h3: {
        fontSize: '1.5rem',
        fontWeight: 900,
        lineHeight: '1.125em',
        marginTop: '1.25rem',
        marginBottom: '1.25rem',
        '& strong, & b': {
          fontWeight: 900,
        },
        [theme.breakpoints.up('sm')]: {
          fontSize: '2.125rem',
        },
        [theme.breakpoints.up('md')]: {
          fontSize: '2.5rem',
        },
      },
      h4: {
        fontSize: '1.125rem',
        fontWeight: 900,
        lineHeight: '1.25em',
        marginTop: '1.25rem',
        marginBottom: '1.25rem',
        '& strong, & b': {
          fontWeight: 900,
        },
        [theme.breakpoints.up('sm')]: {
          fontSize: '1.25rem',
        },
        [theme.breakpoints.up('md')]: {
          fontSize: '1.5rem',
        },
      },
      h5: {
        fontSize: '1.125rem',
        fontWeight: 900,
        lineHeight: '1.25em',
        marginTop: '0.875em',
        marginBottom: '0.875em',
        '& strong, & b': {
          fontWeight: 900,
        },
        [theme.breakpoints.up('sm')]: {
          fontSize: '1.25rem',
        },
        [theme.breakpoints.up('md')]: {
          fontSize: '1.5rem',
        },
      },
      h6: {
        fontSize: '1.125rem',
        fontWeight: 900,
        lineHeight: '1.375em',
        marginTop: '1rem',
        marginBottom: '1rem',
        '& strong, & b': {
          fontWeight: 900,
        },
        [theme.breakpoints.up('sm')]: {
          fontSize: '1.25rem',
        },
        [theme.breakpoints.up('md')]: {
          fontSize: '1.5rem',
        },
      },
      body1: {
        fontSize: '1rem',
        [theme.breakpoints.up('sm')]: {
          fontSize: '1.125rem',
        },
        [theme.breakpoints.up('md')]: {
          fontSize: '1.25rem',
        },
      },
      body2: {
        fontSize: '0.875rem',
        [theme.breakpoints.up('sm')]: {
          fontSize: '1rem',
        },
        [theme.breakpoints.up('md')]: {
          fontSize: '1.125rem',
        },
      },
      gutterBottom: {
        marginBottom: '1.25em',
        [theme.breakpoints.up('md')]: {
          marginBottom: '1.375em',
        },
      },
    },
  },
  PrivateTabIndicator: {
    styleOverrides: {
      root: {
        transition: 'none',
        bottom: '9px',
        '&:after': {
          color: theme.palette.common.red,
          border: '6px solid transparent',
          borderTopColor: 'currentColor',
          content: '""',
          display: 'block',
          height: '0',
          marginLeft: '-6px',
          width: '0',
          position: 'absolute',
          top: '100%',
          left: '50%',
          transform: 'rotate(0)',
          zIndex: '1',
        },
      },
      vertical: {
        display: 'none',
      },
    },
  },
};

export default theme;
