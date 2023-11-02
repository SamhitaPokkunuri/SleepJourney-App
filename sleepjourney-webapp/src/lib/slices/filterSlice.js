import { createSlice } from '@reduxjs/toolkit';

export const sortOptions = [
  // { id: 1, name: 'Relevance', value: 'relevance' },
  { id: 2, name: 'Newest first', value: 'newest' },
  { id: 3, name: 'Oldest first', value: 'oldest' },
];

export const sortOptionsSearch = [
  { id: 1, name: 'Relevance', value: 'relevance' },
  { id: 2, name: 'Newest first', value: 'newest' },
  { id: 3, name: 'Oldest first', value: 'oldest' },
];

const initialState = {
  search: '',
  sortBy: '',
  categories: [],
  tags: [],
  dateRange: {
    from: { month: {}, year: {} },
    to: { month: {}, year: {} },
  },
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    updateSearchValue: (state, { payload }) => {
      return {
        ...state,
        search: payload,
      };
    },
    updateDateRangeValues: (state, { payload }) => {
      const { toFrom, monthYear, selection } = payload;

      if (typeof toFrom !== 'string' && typeof monthYear !== 'string') {
        return state;
      }

      state.dateRange[toFrom][monthYear] =
        selection.value.length > 0 ? selection : {};
    },
    updateSelectValues: (state, { payload }) => {
      return {
        ...state,
        ...payload,
      };
    },
    clearFilters: (state) => {
      const { search } = state;

      return {
        ...initialState,
        search,
      };
    },
  },
});

export const {
  updateSearchValue,
  updateDateRangeValues,
  updateSelectValues,
  clearFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
