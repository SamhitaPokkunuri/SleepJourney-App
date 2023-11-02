import { styled, css } from '@mui/material/styles';
import MuiBox from '@mui/material/Box';

import { SocialShare, DateCategory } from 'components';

const StyledDateSocialBar = styled(MuiBox)(
  ({ theme }) => css`
    position: relative;
    z-index: 1;
    margin-bottom: ${theme.spacing(1.5)};

    ${theme.breakpoints.up('xs')} {
      display: flex;
      align-items: center;
    }

    ${theme.breakpoints.up('sm')} {
      margin-bottom: ${theme.spacing(2)};
    }
  `
);

export default function DateSocialBar(props) {
  const {
    facebook,
    linkedin,
    twitter,
    email,
    type,
    collapsed,
    fontSize,
    showDate,
    date,
    showCategory,
    category,
    categoryColor,
    categoryAlias,
    showShareIcons,
    title,
    description,
    canonical,
  } = props;

  return (
    <StyledDateSocialBar>
      <DateCategory
        showDate={showDate}
        date={date}
        showCategory={showCategory}
        category={category}
        categoryColor={categoryColor}
        categoryAlias={categoryAlias}
      />
      {showShareIcons && (
        <SocialShare
          facebook={facebook}
          linkedin={linkedin}
          twitter={twitter}
          email={email}
          type={type}
          collapsed={collapsed}
          fontSize={fontSize}
          title={title}
          description={description}
          canonical={canonical}
        />
      )}
    </StyledDateSocialBar>
  );
}
