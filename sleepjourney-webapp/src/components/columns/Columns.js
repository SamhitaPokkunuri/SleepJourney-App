import PropTypes from 'prop-types';
import { styled, css } from '@mui/material/styles';
import MuiBox from '@mui/material/Box';
import MuiGrid from '@mui/material/Grid';

import { Column } from 'components';
import useWidthStyles from 'utils/useWidthStyles';

const StyledColumns = styled(MuiBox)(
  ({ theme }) => css`
    margin: 16px auto;

    ${theme.breakpoints.up('sm')} {
      margin: 24px auto;
    }

    ${theme.breakpoints.up('lg')} {
      margin: 36px auto;
    }
  `
);

function Columns(props) {
  const { verticalAlignment, children, className, spacing, widthControlExt } =
    props;
  const widthStyles = useWidthStyles(widthControlExt);

  const hasHiddenColumn = children
    .map((item) => {
      if (item.props.responsiveControl) {
        return Object.values(item.props.responsiveControl);
      }

      return [];
    })
    .some((array) => array.some((bool) => bool));

  const alignItems = {
    top: 'flex-start',
    center: 'center',
    bottom: 'flex-end',
  }[verticalAlignment];

  return (
    <StyledColumns sx={{ ...widthStyles }}>
      <MuiGrid
        role="grid"
        container
        spacing={{
          xs: 2,
          md: spacing,
        }}
        className={className}
        alignItems={alignItems}
      >
        {React.Children.map(children, ({ key, props: childProps }) => {
          return (
            <Column
              key={key}
              columnCount={children.length}
              hasHiddenColumn={hasHiddenColumn}
              {...childProps}
            />
          );
        })}
      </MuiGrid>
    </StyledColumns>
  );
}

Columns.defaultProps = {
  verticalAlignment: 'top',
  spacing: 2,
};

Columns.propTypes = {
  /**
   * Sets the vertical alignment of the columns.
   */
  verticalAlignment: PropTypes.oneOf(['top', 'center', 'bottom']),
  /**
   * The content of the component.
   */
  children: PropTypes.node.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * Defines the space between the type `item` component. It can only be used on a type `container` component.
   */
  spacing: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
};

export default Columns;
