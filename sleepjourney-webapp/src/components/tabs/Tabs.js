import { useContext } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { styled, css } from '@mui/material/styles';
import MuiBox from '@mui/material/Box';
import MuiTabs from '@mui/material/Tabs';
import MuiTab from '@mui/material/Tab';
import MuiTypography from '@mui/material/Typography';

import Icon from 'components/icon/Icon';
import { ThemeContext } from '../layout/FoundationPage';
import useWidthStyles from 'utils/useWidthStyles';

const StyledTabs = styled(MuiBox, {
  shouldForwardProp: (prop) =>
    /(isFoundation|orientation)/.test(prop) === false,
})(
  ({ theme, isFoundation, orientation }) => css`
    padding: ${orientation === 'vertical' ? theme.spacing(0, 1.1) : undefined};

    ${theme.breakpoints.up('sm')} {
      margin-top: ${!isFoundation ? theme.spacing(3) : 0};
      margin-bottom: ${theme.spacing(3)};
    }

    .verticalTabs {
      display: flex;
    }

    .tabInner {
      ${theme.breakpoints.up('sm')} {
        margin-left: auto;
        margin-right: auto;
        max-width: ${theme.containers.values.sm}px;
        padding-top: ${orientation === 'horizontal'
          ? theme.spacing(1)
          : undefined};
      }

      ${theme.breakpoints.up('md')} {
        max-width: ${theme.containers.values.md}px;
        padding-top: ${orientation === 'horizontal'
          ? theme.spacing(2)
          : undefined};
      }

      ${theme.breakpoints.up('xxl')} {
        max-width: ${theme.containers.values.lg}px;
      }
    }

    .scroller {
      align-items: start;
    }

    .tabPanel {
      flex: 1;
    }

    .heading {
      margin-bottom: ${theme.spacing(2)};

      ${theme.breakpoints.up('sm')} {
        margin-left: 0;
        margin-right: auto;
        max-width: ${theme.containers.values.sm}px;
      }

      ${theme.breakpoints.up('md')} {
        max-width: ${theme.containers.values.md}px;
      }
    }

    .foundationHeading {
      font-size: 3rem !important;
      line-height: 3.125rem !important;
      font-weight: 900;
      margin-bottom: ${theme.spacing(1)};

      ${theme.breakpoints.up('sm')} {
        font-size: 3.75rem !important;
        line-height: 3.75rem !important;
        margin-bottom: ${theme.spacing(3)};
      }

      ${theme.breakpoints.up('md')} {
        font-size: 5.625rem !important;
        line-height: 5.625rem !important;
      }
    }

    .flexContainer {
      position: relative;
      justify-content: flex-start;

      ${theme.breakpoints.up('sm')} {
        margin-left: auto;
        margin-right: auto;
        max-width: ${theme.containers.values.sm}px;
        padding: 0;
      }

      ${theme.breakpoints.up('md')} {
        flex-wrap: wrap;
        flex-shrink: 1;
        max-width: ${theme.containers.values.md}px;
      }

      ${theme.breakpoints.up('xxl')} {
        max-width: ${theme.containers.values.lg}px;
      }
    }

    .indicator {
      display: none;
    }

    .tab {
      .tabIcon {
        margin: 0 6px 0 0;
      }
    }

    .verticalLabel {
      font-weight: 700;
      text-align: left;
      color: ${theme.palette.common.spanishGrey};
      padding-left: 0;
    }

    .tabButton {
      background-color: ${theme.palette.common.white};
      color: ${theme.palette.common.darkGrey};
      border-radius: 2px;
      box-shadow: ${theme.cards.boxShadow};
      margin: ${orientation === 'horizontal'
        ? theme.spacing(0, 2, 1.6, 0)
        : theme.spacing(0, 1, 1, 0)};
      font-size: 1rem;
      padding: 8px 16px;
      font-weight: 700;
      min-height: 44px;

      &:hover,
      &.Mui-selected {
        background-color: ${theme.palette.common.red};
        color: ${theme.palette.common.white};
      }
    }

    .foundationButton {
      background-color: ${theme.palette.common.darkGrey};
      color: ${theme.palette.common.white};
      border-radius: 100px;

      svg {
        [class*='is-line'] path:not([class*='no-fill']) {
          fill: ${theme.palette.common.white};
        }

        [class*='is-line'] path:not([class*='no-stroke']) {
          stroke: ${theme.palette.common.white};
        }
      }

      &:hover,
      &.Mui-selected {
        background-color: ${theme.palette.common.white};
        color: ${theme.palette.common.red};

        svg {
          [class*='is-line'] path:not([class*='no-fill']) {
            fill: ${theme.palette.common.red};
          }

          [class*='is-line'] path:not([class*='no-stroke']) {
            stroke: ${theme.palette.common.red};
          }
        }
      }
    }
  `
);

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vdf-tabpanel-${index}`}
      aria-labelledby={`vdf-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

function Tabs(props) {
  const {
    anchor,
    children,
    titles,
    sectionTitle,
    orientation,
    widthControlExt,
  } = props;

  const context = useContext(ThemeContext);
  const isFoundation = context === 'foundation';
  const widthStyles = useWidthStyles(widthControlExt);
  const [value, setValue] = React.useState(0);

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  return (
    <StyledTabs
      id={anchor}
      isFoundation={isFoundation}
      orientation={orientation}
    >
      {sectionTitle?.toggle && (
        <MuiTypography
          className={clsx({
            heading: !isFoundation,
            foundationHeading: isFoundation,
          })}
          variant="h2"
          component="h3"
          align="left"
        >
          {sectionTitle.text}
        </MuiTypography>
      )}
      <MuiBox
        className={clsx({
          verticalTabs: orientation === 'vertical',
        })}
      >
        <MuiTabs
          orientation={orientation}
          variant="scrollable"
          scrollButtons={false}
          value={value}
          onChange={handleChange}
          aria-label="Tabbed Navigation"
          indicatorColor="primary"
          textColor="inherit"
          classes={{
            scroller: 'scroller',
            flexContainer: 'flexContainer',
            indicator: 'indicator',
          }}
        >
          {titles.map((title, index) => {
            const { icon } = children[index].props;

            return (
              <MuiTab
                className={clsx('tab', {
                  verticalLabel: orientation === 'vertical',
                  tabButton: orientation !== 'vertical',
                  foundationButton: orientation !== 'vertical' && isFoundation,
                })}
                key={index}
                id={`vdf-tab-${index}`}
                aria-controls={`vdf-tabpanel-${index}`}
                label={
                  <span dangerouslySetInnerHTML={{ __html: title.text }} />
                }
                icon={
                  icon && (
                    <Icon
                      className="tabIcon"
                      icon={icon}
                      iconSet="group"
                      fontSize="small"
                    />
                  )
                }
              />
            );
          })}
        </MuiTabs>
        {children.map((child, i) => (
          <TabPanel value={value} index={i} key={i} className="tabPanel">
            <MuiBox className="tabInner">
              <MuiBox sx={{ ...widthStyles }}>{child}</MuiBox>
            </MuiBox>
          </TabPanel>
        ))}
      </MuiBox>
    </StyledTabs>
  );
}

Tabs.propTypes = {
  /**
   * @ignore
   */
  anchor: PropTypes.string,
  /**
   * The content of the component.
   */
  children: PropTypes.node.isRequired,
  /**
   * The tabs orientation (layout flow direction).
   */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  /**
   * Adds a title before the component.
   */
  sectionTitle: PropTypes.shape({
    toggle: PropTypes.bool,
    text: PropTypes.string,
  }),
  /**
   * The titles to display as the tabs labels.
   */
  titles: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
    })
  ).isRequired,
  /**
   * @ignore
   */
  widthControlExt: PropTypes.shape({
    mobile: PropTypes.number,
    tablet: PropTypes.number,
    desktop: PropTypes.number,
  }),
};

Tabs.defaultProps = {
  orientation: 'horizontal',
};

export default Tabs;
