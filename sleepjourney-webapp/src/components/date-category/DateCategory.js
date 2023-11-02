import PropTypes from 'prop-types';
import NextLink from 'next/link';
import { styled, css } from '@mui/material/styles';
import MuiBox from '@mui/material/Box';

const StyledDateCategory = styled(MuiBox, {
  shouldForwardProp: (prop) => /(categoryColor)/.test(prop) === false,
})(
  ({ theme, categoryColor }) => css`
    font-size: 0.875rem;
    line-height: 1.125rem;

    & > :last-child:before {
      border-left: 2px solid ${categoryColor || theme.palette.common.pink};
      content: '';
      height: 12px;
      margin: ${theme.spacing(0, 1)};
    }

    a {
      text-decoration: none;

      &:hover {
        color: ${categoryColor || theme.palette.common.pink};
      }
    }
  `
);

function Category(props) {
  const { label, url } = props;

  return url ? (
    <NextLink href={url} prefetch={false}>
      <a>{label}</a>
    </NextLink>
  ) : (
    <span>{label}</span>
  );
}

export default function DateCategory(props) {
  const {
    showDate,
    showCategory,
    date,
    category,
    categoryColor,
    categoryAlias,
  } = props;

  const hasDate = showDate && date;
  const hasCategory = showCategory && category;

  return hasDate || hasCategory ? (
    <StyledDateCategory categoryColor={categoryColor}>
      {hasDate && <span>{date}</span>}
      {hasCategory && <Category label={category} url={categoryAlias} />}
    </StyledDateCategory>
  ) : null;
}

DateCategory.propTypes = {
  showDate: PropTypes.bool,
  showCategory: PropTypes.bool,
  date: PropTypes.string,
  category: PropTypes.string,
  categoryColor: PropTypes.string,
  categoryAlias: PropTypes.string,
};
