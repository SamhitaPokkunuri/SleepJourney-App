import PropTypes from 'prop-types';
import NextLink from 'next/link';
import { styled, css } from '@mui/material/styles';
import MuiList from '@mui/material/List';
import MuiListItem from '@mui/material/ListItem';
import MuiListItemText from '@mui/material/ListItemText';

const StyledTags = styled(MuiList)(
  ({ theme }) => css`
    margin: auto -4px 0;
    display: flex;
    flex-wrap: wrap;

    .tagsListItem {
      width: auto;
      margin: 4px;
      padding: 0px;
      cursor: pointer;
    }

    .tag {
      color: ${theme.palette.common.dimGrey};
      border: 1px solid ${theme.palette.common.dimGrey};
      border-radius: 11px;
      padding: 3px 8px 1px;
      line-height: 1rem;
      font-size: 0.875rem;
    }
  `
);

function Tags(props) {
  const { data } = props;

  return (
    <StyledTags disablePadding>
      {data.map((label, i) => (
        <NextLink
          key={`${label}-${i}`}
          href={{
            pathname: '/news',
            query: { tag: label },
            // as: 'news',
          }}
          passHref
        >
          <MuiListItem className="tagsListItem">
            <MuiListItemText className="tag" disableTypography>
              {label}
            </MuiListItemText>
          </MuiListItem>
        </NextLink>
      ))}
    </StyledTags>
  );
}

Tags.propTypes = {
  /**
   * The tags data.
   */
  data: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Tags;
