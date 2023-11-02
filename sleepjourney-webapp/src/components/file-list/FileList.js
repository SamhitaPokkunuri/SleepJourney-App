import { styled, css } from '@mui/material/styles';
import MuiBox from '@mui/material/Box';
import MuiList from '@mui/material/List';
import MuiListItem from '@mui/material/ListItem';
import MuiTypography from '@mui/material/Typography';

import useWidthStyles from 'utils/useWidthStyles';

const StyledFileList = styled(MuiBox)(
  ({ theme }) => css`
    margin-bottom: ${theme.spacing(3)};

    .header {
      margin-left: 0;
      margin-right: auto;
      text-align: left;

      ${theme.breakpoints.up('sm')} {
        maxwidth: '83.33%';
      }

      ${theme.breakpoints.up('lg')} {
        max-width: 66.66%;
      }
    }

    .fileList {
      padding: 0;
      margin: 0;
    }

    .fileListItem {
      padding: 0;
      margin-bottom: ${theme.spacing(1.5)};

      > :last-child {
        margin-bottom: 0;
      }
    }
  `
);

export default function FileList(props) {
  const { title, children, widthControlExt } = props;
  const widthStyles = useWidthStyles(widthControlExt);

  return (
    <StyledFileList sx={{ ...widthStyles }}>
      {title?.toggle && title?.text && (
        <MuiTypography className="header" variant="h2">
          {title?.text}
        </MuiTypography>
      )}
      <MuiList className="fileList" component="ul" aria-label="file list">
        {children.map((child) => {
          return (
            <MuiListItem
              key={child.key}
              component="li"
              className="fileListItem"
            >
              {child}
            </MuiListItem>
          );
        })}
      </MuiList>
    </StyledFileList>
  );
}
