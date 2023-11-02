import PropTypes from 'prop-types';
import { styled, css } from '@mui/material/styles';
import MuiBox from '@mui/material/Box';
import MuiGrid from '@mui/material/Grid';

import useWidthStyles from 'utils/useWidthStyles';
import { SDGCard, Heading } from 'components';

const StyledSdgList = styled(MuiBox)(
  ({ theme }) => css`
    margin-bottom: ${theme.spacing(1)};

    .gridItem {
      ${theme.breakpoints.up('sm')} {
        display: flex;
      }
    }
  `
);

export default function SdgList(props) {
  const {
    title,
    columns,
    chevron,
    hideDescription,
    children,
    widthControlExt,
  } = props;

  const widthStyles = useWidthStyles(widthControlExt);

  return (
    <StyledSdgList sx={{ ...widthStyles }}>
      {title && <Heading variant="h2">{title}</Heading>}

      <MuiGrid container spacing={2}>
        {children.map(({ key, props }) => {
          const {
            target,
            post: { heroImageUrl, title, description, url },
          } = props;

          return (
            <MuiGrid
              item
              key={key}
              className="gridItem"
              xs={12}
              md={6}
              lg={12 / columns}
            >
              <SDGCard
                image={{
                  src: heroImageUrl,
                }}
                title={title}
                description={description}
                link={{
                  url,
                  target,
                }}
                chevron={chevron}
                hideDescription={hideDescription}
              />
            </MuiGrid>
          );
        })}
      </MuiGrid>
    </StyledSdgList>
  );
}

SdgList.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  columns: PropTypes.number,
  title: PropTypes.string,
  /**
   * @ignore
   */
  widthControlExt: PropTypes.shape({
    mobile: PropTypes.number,
    tablet: PropTypes.number,
    desktop: PropTypes.number,
  }),
};
