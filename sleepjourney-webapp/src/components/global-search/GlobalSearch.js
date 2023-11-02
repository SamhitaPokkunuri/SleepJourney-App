import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { styled, css } from '@mui/material/styles';
import MuiBox from '@mui/material/Box';
import MuiContainer from '@mui/material/Container';
import MuiDialog from '@mui/material/Dialog';
import MuiIconButton from '@mui/material/IconButton';
import MuiSlide from '@mui/material/Slide';
import MuiTypography from '@mui/material/Typography';

import { FontIcon, Search, PopularLinks } from 'components';
import { selectUiByKey, updateGlobalSearch } from 'lib/slices/uiSlice';
import { updateSearchValue } from 'lib/slices/filterSlice';

const StyledGlobalSearch = styled(MuiDialog)(
  ({ theme }) => css`
    .searchPanel {
      background-color: ${theme.palette.common.darkGrey};
      color: ${theme.palette.common.white};
      padding: ${theme.spacing(0, 1)};
    }

    .container {
      position: relative;
      margin: 0 auto;
      outline: none;
      display: flex;
      flex-direction: column;
      flex-grow: 1;

      ${theme.breakpoints.up('md')} {
        max-width: ${theme.containers.values.md}px;
      }
    }

    .closeButton {
      font-size: 1.5rem;
      position: absolute;
      right: 0;
      top: 0;

      &:hover {
        background-color: transparent;
      }

      ${theme.breakpoints.up('sm')} {
        font-size: 3.125rem;
        right: ${theme.spacing(1)};
        top: ${theme.spacing(1)};
      }
    }

    .searchContent {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      padding: ${theme.spacing(0, 0.5, '5%')};
      padding-top: ${theme.spacing(7.2)};

      ${theme.breakpoints.up('md')} {
        padding-top: ${theme.spacing(9.4)};
      }

      ${theme.breakpoints.up('lg')} {
        padding-top: ${theme.spacing(16)};
      }
    }

    .search {
      width: 100%;
      margin: 0 auto;
      padding: ${theme.spacing(3, 0, 1)};

      ${theme.breakpoints.up('sm')} {
        width: 66.66%;
        padding: ${theme.spacing(4, 0, 2)};
      }

      ${theme.breakpoints.up('md')} {
        width: 50%;
        padding: ${theme.spacing(5, 0, 2)};
      }
    }
  `
);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <MuiSlide direction="down" ref={ref} {...props} />;
});

export default function GlobalSearch() {
  const dispatch = useDispatch();
  const globalSearch = useSelector(selectUiByKey('globalSearch'));
  const router = useRouter();

  const handleSearchPanel = () => {
    dispatch(updateGlobalSearch({ isExpanded: !globalSearch.isExpanded }));
  };

  const handleSearchValue = (value) => (event) => {
    if (typeof value === 'string') {
      dispatch(updateGlobalSearch({ value }));
    } else {
      dispatch(updateGlobalSearch({ value: event.target.value }));
    }
  };

  const handleOnClick = () => {
    dispatch(updateSearchValue(globalSearch.value));
    dispatch(updateGlobalSearch({ endValue: globalSearch.value }));
    router.push({
      pathname: '/global-search-results',
      query: { search: globalSearch.value },
    });
  };

  return (
    <StyledGlobalSearch
      id="global-search"
      fullScreen
      aria-labelledby="search-title"
      open={globalSearch.isExpanded}
      onClose={handleSearchPanel}
      PaperProps={{
        className: 'searchPanel',
      }}
      TransitionComponent={Transition}
      transitionDuration={500}
    >
      <MuiContainer className="container">
        <MuiIconButton
          onClick={handleSearchPanel}
          className="closeButton"
          size="large"
        >
          <FontIcon icon="close" color="white" fontSize="inherit" />
        </MuiIconButton>
        <MuiBox className="searchContent">
          <MuiTypography id="search-title" variant="h2" align="center">
            Search
          </MuiTypography>
          <MuiBox className="search">
            <Search
              placeholder="Enter your search term"
              value={globalSearch.value}
              onChange={handleSearchValue()}
              onClear={handleSearchValue('')}
              square
              handleOnClick={() => handleOnClick()}
              onKeyDown={(e) => {
                if (e.keyCode == 13) {
                  handleOnClick();
                }
              }}
              autoFocus
            />
          </MuiBox>
          <PopularLinks searchTitle={'Popular searches'} />
        </MuiBox>
      </MuiContainer>
    </StyledGlobalSearch>
  );
}
