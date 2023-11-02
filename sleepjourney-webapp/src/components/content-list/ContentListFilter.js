import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme, styled, css } from '@mui/material/styles';
import MuiBox from '@mui/material/Box';
import MuiButton from '@mui/material/Button';
import MuiCollapse from '@mui/material/Collapse';
import MuiContainer from '@mui/material/Container';
import MuiDivider from '@mui/material/Divider';
import MuiFormControl from '@mui/material/FormControl';
import MuiFormLabel from '@mui/material/FormLabel';

import {
  updateSearchValue,
  updateSelectValues,
  updateDateRangeValues,
  clearFilters,
  sortOptions,
  sortOptionsSearch,
} from 'lib/slices/filterSlice';
import {
  ChevronButton,
  DateRange,
  Search,
  ReactSelect,
  Select,
  ToggleButton,
} from 'components';
import hasObjectEntries from 'utils/hasObjectEntries';

const StyledContentListFilter = styled(MuiBox)(
  ({ theme }) => css`
    margin-bottom: ${theme.spacing(2)};

    .filterHeader {
      display: flex;
      justify-content: space-between;

      ${theme.breakpoints.down('md')} {
        flex-wrap: wrap;
      }
    }

    .searchContainer {
      display: flex;
      justify-content: center;
      align-items: start;
      margin-bottom: ${theme.spacing(1.5)};

      ${theme.breakpoints.down('md')} {
        order: 1;
        width: 100%;
      }

      ${theme.breakpoints.up('md')} {
        flex-basis: 600px;
      }
    }

    .filterButtonContainer {
      margin-bottom: ${theme.spacing(1.5)};
      display: flex;
      flex-grow: 1;

      ${theme.breakpoints.down('md')} {
        order: 2;
      }

      ${theme.breakpoints.up('md')} {
        flex-basis: 25%;
        flex-shrink: 0;
      }
    }

    .sortButtonContainer {
      margin-bottom: ${theme.spacing(1.5)};
      padding-left: 12px;
      display: flex;
      justify-content: flex-end;
      flex-shrink: 0;
      flex-grow: 1;

      ${theme.breakpoints.down('md')} {
        order: 3;
        margin-left: auto;
      }

      ${theme.breakpoints.up('md')} {
        flex-basis: 25%;

        > div {
          width: auto;
        }
      }
    }

    .mobileClearFilterButton {
      ${theme.breakpoints.down('sm')} {
        position: absolute;
        z-index: 1;
        top: 18px;
        right: 0;
      }
    }

    .searchOptions {
      position: relative;
      background: ${theme.palette.common.white};
      border-radius: ${theme.cards.borderRadius};
      border: 1px solid ${theme.palette.common.spanishGrey};
    }

    .searchOptionsGroup {
      margin: auto;
      padding: ${theme.spacing(1, 1.5, 2)};

      ${theme.breakpoints.up('sm')} {
        padding: ${theme.spacing(2, 3.2)};
      }

      ${theme.breakpoints.up('lg')} {
        padding: ${theme.spacing(2, 4.8)};
      }
    }

    .formLabel {
      padding: 0;
      padding: ${theme.spacing(1.5, 0)};

      ${theme.breakpoints.up('md')} {
        padding: ${theme.spacing(2, 0)};
      }
    }

    .dateRange {
      display: flex;

      ${theme.breakpoints.down('sm')} {
        flex-direction: column;
      }

      ${theme.breakpoints.up('sm')} {
        > :last-of-type {
          margin-left: ${theme.spacing(2)};
        }
      }

      ${theme.breakpoints.up('md')} {
        > :last-of-type {
          margin-left: ${theme.spacing(3)};
        }
      }
    }

    .multiSelect {
      display: flex;

      ${theme.breakpoints.down('sm')} {
        flex-direction: column;
      }

      ${theme.breakpoints.up('sm')} {
        fieldset {
          flex: 1;
        }

        > :last-of-type {
          margin-left: ${theme.spacing(2)};
        }

        fieldset:only-child {
          margin-left: 0;
        }
      }

      ${theme.breakpoints.up('md')} {
        > :last-of-type {
          margin-left: ${theme.spacing(3)};
        }
      }
    }
  `
);

export default function ContentListFilter(props) {
  const { categories, tags, searchFilter, sources, applyFilters, searchFor } =
    props;
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const dispatch = useDispatch();
  const {
    search,
    sortBy,
    dateRange,
    categories: selectedCategories,
    tags: selectedTags,
  } = useSelector((state) => state.filter);
  const [filterDropdown, setFilterDropdown] = useState(false);

  useEffect(() => {
    // Global search takes place so update search field state
    dispatch(updateSearchValue(searchFor));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchFor]);

  useEffect(() => {
    // If query Tag exists preselect filter
    if (router?.query?.tag) {
      let selectedTag = [];
      tags.map(({ tid, name }) => {
        if (router.query.tag === name) {
          selectedTag = [{ value: tid, label: name }];
        }
      });
      dispatch(updateSelectValues({ tags: selectedTag }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.tag]);

  const handleSearchValue = (value) => (event) => {
    if (typeof value === 'string') {
      dispatch(updateSearchValue(value));
    } else {
      dispatch(updateSearchValue(event.target.value));
    }

    // Search text is empty
    if (search && !event.target.value) {
      applyQueryFilters(false, true);
    }
  };

  const handleClearSearchValue = () => {
    // Clear search is clicked
    if (sources.mode === 'global-search-filter') {
      router.replace({ pathname: '/global-search-results', query: {} });
    }

    dispatch(updateSearchValue(''));
    applyQueryFilters(false, true);
  };

  const handleSearchOnClick = (value) => {
    if (sources.mode === 'global-search-filter') {
      router.replace({
        pathname: '/global-search-results',
        query: { search: value },
      });
    }
  };

  const handleSortOptions = (selection, callback) => () => {
    dispatch(updateSelectValues({ sortBy: selection }));
    if (callback) {
      callback();
    }
    applyQueryFilters(selection);
  };

  const handleSelectValues = (name) => (selected) => {
    dispatch(updateSelectValues({ [name]: selected }));
  };

  const categoryOptions = categories
    ?.map(({ tid, name, color }) => {
      if (searchFilter.selectedCategories.indexOf(tid) > -1) {
        return {
          value: tid,
          label: name,
          color,
        };
      }

      return null;
    })
    .filter((i) => i);

  const tagOptions = tags?.map(({ tid, name }) => {
    return {
      value: tid,
      label: name,
    };
  });

  const handleDateOptions =
    (toFrom) => (monthYear) => (selection, callback) => () => {
      dispatch(updateDateRangeValues({ toFrom, monthYear, selection }));
      if (callback) {
        callback();
      }
    };

  const handleClearFilters = () => {
    dispatch(clearFilters());
    applyFilters({ search: search }, true);

    // Only for news page
    removeNewsTagQuery();
  };

  const handleApplyFilters = (e) => {
    e.preventDefault();
    applyQueryFilters();
  };

  const applyQueryFilters = (sortSelection, clearSearch) => {
    const selectedCategoryIds = selectedCategories?.map((cat) => cat.value);
    const selectedTagIds = selectedTags?.map((tag) => tag.value);

    const filters = {
      categories: selectedCategoryIds,
      tags: selectedTagIds,
      dateRange: dateRange,
      sortBy: sortSelection || sortBy,
      search: clearSearch ? '_clear' : search,
    };
    applyFilters(filters);

    // Only for news page
    removeNewsTagQuery();
  };

  const removeNewsTagQuery = () => {
    // Only for news page
    if (router?.query?.alias?.length === 1) {
      if (router?.query?.alias[0] === 'news') {
        const tagName = router.query.tag;

        if (tagName) {
          router.replace({ pathname: '/news', query: {} });
        }
      }
    }
  };

  const hasFilters = hasObjectEntries(
    selectedCategories,
    selectedTags,
    dateRange
  );

  return (
    <StyledContentListFilter component="form" onSubmit={handleApplyFilters}>
      <MuiBox className="filterHeader">
        <MuiBox className="filterButtonContainer">
          <ToggleButton
            label="Filter"
            active={filterDropdown}
            onClick={() => setFilterDropdown(!filterDropdown)}
          />
          {!isMobile && hasFilters && (
            <MuiButton color="secondary" onClick={handleClearFilters}>
              Clear filters
            </MuiButton>
          )}
        </MuiBox>
        <MuiBox className="searchContainer">
          <Search
            size="small"
            value={search || searchFor}
            onChange={handleSearchValue()}
            onClear={() => handleClearSearchValue()}
            handleOnClick={(e) => handleSearchOnClick(e)}
          />
        </MuiBox>
        <MuiBox className="sortButtonContainer">
          <Select
            value={
              sortBy
                ? `Sort by: ${sortBy.name}`
                : sources.mode === 'global-search-filter'
                ? `Sort by: ${sortOptionsSearch[0].name}`
                : `Sort by: ${sortOptions[0].name}`
            }
            options={
              sources.mode === 'global-search-filter'
                ? sortOptionsSearch
                : sortOptions
            }
            boxShadow="active"
            overlayDropdown={true}
            onSelect={handleSortOptions}
          />
        </MuiBox>
      </MuiBox>
      <MuiCollapse in={filterDropdown} className="searchOptions">
        {isMobile && hasFilters && (
          <MuiButton
            className="mobileClearFilterButton"
            color="secondary"
            onClick={handleClearFilters}
          >
            Clear filters
          </MuiButton>
        )}
        <MuiContainer className="searchOptionsGroup">
          {(searchFilter.categories || searchFilter.tags) && (
            <>
              <MuiBox className="multiSelect">
                {searchFilter.categories && (
                  <MuiFormControl component="fieldset" variant="standard">
                    <MuiFormLabel className="formLabel" component="legend">
                      Categories
                    </MuiFormLabel>
                    <ReactSelect
                      options={categoryOptions}
                      value={selectedCategories}
                      placeholder="Select categories"
                      isMulti
                      name="categories"
                      instanceId="categories"
                      onChange={handleSelectValues('categories')}
                    />
                  </MuiFormControl>
                )}
                {searchFilter.tags && (
                  <MuiFormControl component="fieldset" variant="standard">
                    <MuiFormLabel className="formLabel" component="legend">
                      Tags
                    </MuiFormLabel>
                    <ReactSelect
                      options={tagOptions}
                      value={selectedTags}
                      placeholder="Select tags"
                      isMulti
                      name="tags"
                      instanceId="tags"
                      onChange={handleSelectValues('tags')}
                    />
                  </MuiFormControl>
                )}
              </MuiBox>
              <MuiDivider />
            </>
          )}
          {searchFilter.dateRange && dateRange && (
            <MuiFormControl component="fieldset" variant="standard">
              <MuiFormLabel className="formLabel" component="legend">
                Date range
              </MuiFormLabel>
              <MuiBox className="dateRange">
                <DateRange
                  label="From"
                  yearFrom="2015"
                  month={dateRange.from.month}
                  year={dateRange.from.year}
                  onSelect={handleDateOptions('from')}
                />
                <DateRange
                  label="To"
                  yearFrom="2015"
                  month={dateRange.to.month}
                  year={dateRange.to.year}
                  onSelect={handleDateOptions('to')}
                />
              </MuiBox>
            </MuiFormControl>
          )}
          <MuiBox
            display="flex"
            justifyContent="center"
            pt={{ md: 1 }}
            pb={{ md: 1 }}
          >
            <ChevronButton size="small" type="submit">
              Apply Filters
            </ChevronButton>
          </MuiBox>
        </MuiContainer>
      </MuiCollapse>
    </StyledContentListFilter>
  );
}
