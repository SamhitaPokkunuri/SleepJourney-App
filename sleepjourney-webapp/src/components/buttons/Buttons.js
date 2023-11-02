import clsx from 'clsx';
import { styled, css } from '@mui/material/styles';
import MuiList from '@mui/material/List';
import MuiListItem from '@mui/material/ListItem';

const StyledButtons = styled(MuiList)(
  ({ theme }) => css`
    padding: 0;
    margin: 0;

    &.inlineList {
      display: flex;
      flex-wrap: wrap;
    }

    .listItem {
      padding: 0;
      margin-bottom: 20px;
    }

    .inlineListItem {
      width: 50%;
      padding-right: ${theme.spacing(0.5)};

      &:nth-of-type(even) {
        padding-right: ${theme.spacing(0)};
        padding-left: ${theme.spacing(0.5)};
      }

      a {
        width: 100%;
        justify-content: end;
      }

      ${theme.breakpoints.up('sm')} {
        width: auto;
        padding: ${theme.spacing(0)};
        margin-right: ${theme.spacing(1)};

        &:nth-of-type(even) {
          padding: ${theme.spacing(0)};
        }

        &:last-child {
          margin-right: ${theme.spacing(0)};
        }
      }
    }
  `
);

export default function Buttons(props) {
  // Also used for Dauntless Button Group
  const { children, className } = props;

  return children.length === 1 ? (
    children[0]
  ) : (
    <StyledButtons
      className={clsx({
        inlineList: className === 'is-style-inline',
      })}
      component="ul"
      aria-label="button list"
    >
      {children.map((child) => {
        return (
          <MuiListItem
            className={clsx('listItem', {
              inlineListItem: className === 'is-style-inline',
            })}
            key={child.key}
            component="li"
          >
            {child}
          </MuiListItem>
        );
      })}
    </StyledButtons>
  );
}
