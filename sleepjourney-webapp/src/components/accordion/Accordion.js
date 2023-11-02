import PropTypes from 'prop-types';
import { styled, css } from '@mui/material/styles';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiBox from '@mui/material/Box';
import MuiTypography from '@mui/material/Typography';

import useWidthStyles from 'utils/useWidthStyles';
import useDisplayStyles from 'utils/useDisplayStyles';
import { FontIcon } from 'components';

const StyledAccordion = styled(MuiBox)(
  ({ theme }) => css`
    margin-bottom: ${theme.spacing(2)};

    ${theme.breakpoints.up('md')} {
      margin-bottom: ${theme.spacing(3)};
    }

    .heading {
      font-weight: 900;
      font-size: 1.25rem;
      margin: 0;

      &:first-of-type {
        margin: 0;
      }

      ${theme.breakpoints.up('sm')} {
        font-size: 1.25rem;
      }

      ${theme.breakpoints.up('md')} {
        font-size: 1.75rem;
      }
    }

    .accordionItem {
      background-color: transparent;
      border-bottom: 1px solid ${theme.palette.common.spanishGrey};

      &:first-of-type {
        border-top: 1px solid ${theme.palette.common.spanishGrey};
      }

      &.Mui-expanded {
        margin: 0;
      }
    }

    .accordionSummary {
      padding: ${theme.spacing(0.8, 0)};

      ${theme.breakpoints.up('sm')} {
        padding: ${theme.spacing(1.6, 0)};
      }

      .iconButton {
        font-size: 2rem;
        padding: 0;
        color: ${theme.palette.common.black};
        margin-right: -6px;

        ${theme.breakpoints.up('sm')} {
          font-size: 3rem;
        }
      }

      &.Mui-expanded .iconButton {
        color: ${theme.palette.common.red};
      }
    }

    .accordionDetails {
      padding: ${theme.spacing(0, 0, 2)};
      display: block;

      ${theme.breakpoints.up('sm')} {
        padding: ${theme.spacing(0, 0, 3)};
      }

      & > div > :first-of-type {
        padding-top: 0;
        margin-top: 0;
      }
    }
  `
);

const auditChart = [
  '#aeb900',
  '#d7da91',
  '#01AAC2',
  '#f49a00',
  '#767264',
  '#e30612',
  '#01aac2',
  '#bba1b3',
  '#01aac2',
  '#2b6bab',
];

function Accordion(props) {
  const {
    anchor,
    children,
    className,
    responsiveControl,
    sectionTitle,
    widthControlExt,
  } = props;

  const widthStyles = useWidthStyles(widthControlExt);
  const displayStyles = useDisplayStyles(responsiveControl);
  const isAuditChart = /audit-chart/i.test(className);

  return (
    <StyledAccordion
      id={anchor}
      sx={{
        ...widthStyles,
        ...displayStyles,
      }}
    >
      {(typeof sectionTitle === 'string' || sectionTitle?.toggle) && (
        <MuiTypography variant="h3" align="center">
          {typeof sectionTitle === 'string' ? sectionTitle : sectionTitle.text}
        </MuiTypography>
      )}
      {React.Children.map(children, (child, i) => {
        return (
          <MuiAccordion
            key={i}
            className="accordionItem"
            elevation={0}
            square
            defaultExpanded={child.props.open}
          >
            <MuiAccordionSummary
              className="accordionSummary"
              expandIcon={
                <FontIcon
                  icon="chevronDownFill"
                  fontSize="default"
                  color="inherit"
                  className="iconButton"
                />
              }
              aria-controls={`panel${i}-content`}
              id={`panel${i}-header`}
            >
              <MuiTypography
                className="heading"
                style={isAuditChart ? { color: auditChart[i] } : null}
                dangerouslySetInnerHTML={{ __html: child.props.title }}
              />
            </MuiAccordionSummary>
            <MuiAccordionDetails className="accordionDetails">
              {child}
            </MuiAccordionDetails>
          </MuiAccordion>
        );
      })}
    </StyledAccordion>
  );
}

Accordion.propTypes = {
  /**
   * @ignore
   */
  anchor: PropTypes.string,
  /**
   * The content of the component.
   */
  children: PropTypes.node.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * @ignore
   */
  responsiveControl: PropTypes.shape({
    mobile: PropTypes.bool,
    tablet: PropTypes.bool,
    desktop: PropTypes.bool,
  }),
  /**
   * Adds a title before the component.
   */
  sectionTitle: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      toggle: PropTypes.bool,
      text: PropTypes.string,
    }),
  ]),
  /**
   * @ignore
   */
  widthControlExt: PropTypes.shape({
    mobile: PropTypes.number,
    tablet: PropTypes.number,
    desktop: PropTypes.number,
  }),
};

export default Accordion;
