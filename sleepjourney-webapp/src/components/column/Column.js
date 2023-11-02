import PropTypes from 'prop-types';
import { styled, css } from '@mui/material/styles';
import MuiGrid from '@mui/material/Grid';

import useDisplayStyles from 'utils/useDisplayStyles';

const StyledColumn = styled(MuiGrid, {
  shouldForwardProp: (prop) =>
    /(alignItems|order|verticalAlignment)/.test(prop) === false,
})(
  ({ theme, alignItems, order, verticalAlignment }) => css`
    order: ${order ? order : 'unset'};
    align-self: ${verticalAlignment ? alignItems : 'auto'};

    ${theme.breakpoints.down('sm')} {
      &:empty {
        display: none;
      }
    }

    & > :first-of-type:not(style):not(:first-of-type ~ *),
    & > style + * {
      margin-top: 0;
    }
  `
);

function Column(props) {
  const {
    children,
    columnCount,
    fitContent,
    hasHiddenColumn,
    order,
    responsiveControl,
    verticalAlignment,
    width,
  } = props;

  const alignItems = {
    top: 'flex-start',
    center: 'center',
    bottom: 'flex-end',
  }[verticalAlignment];

  const widthAuto = {
    none: false,
    grow: true,
    shrink: 'auto',
  }[fitContent];

  const displayStyles = useDisplayStyles(responsiveControl);

  let sm = Math.round(12 / columnCount);

  if (width) {
    sm = Math.round((width / 100) * 12);
  }

  if (widthAuto) {
    sm = widthAuto;
  }

  if (hasHiddenColumn) {
    sm = true;
  }

  return (
    <StyledColumn
      role="gridcell"
      item
      sx={{ ...displayStyles }}
      xs={12}
      sm={sm}
      alignItems={alignItems}
      order={order}
      verticalAlignment={verticalAlignment}
    >
      {children}
    </StyledColumn>
  );
}

Column.defaultProps = {
  marginBottom: true,
};

Column.propTypes = {
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * The number of columns.
   */
  columnCount: PropTypes.number,
  /**
   * Used to set the width of each column.
   */
  hasHiddenColumn: PropTypes.bool,
  /**
   * If 'shrink', the grid item's width matches its content. If 'grow', the grid item's width grows to use the space available in the grid container.  If 'none', the prop is ignored.
   */
  fitContent: PropTypes.oneOf(['none', 'grow', 'shrink']),
  /**
   * Sets the order of the component.
   */
  order: PropTypes.number,
  /**
   * @ignore
   */
  responsiveControl: PropTypes.shape({
    mobile: PropTypes.bool,
    tablet: PropTypes.bool,
    desktop: PropTypes.bool,
  }),
  /**
   * Sets the vertical alignment of the columns.
   */
  verticalAlignment: PropTypes.oneOf(['top', 'center', 'bottom']),
  /**
   * Sets the number of columns the grid item uses.
   **/
  width: PropTypes.number,
};

export default Column;
