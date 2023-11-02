import React from 'react';
import { useDispatch } from 'react-redux';
import { addContainer } from 'stories/utils/decorators';
import GlobalSearch from './GlobalSearch';
import { updateGlobalSearch } from 'lib/slices/uiSlice';

const globalSearch = {
  title: 'Components/Navigation/GlobalSearch',
  component: GlobalSearch,
  decorators: [addContainer('lg')],
};

export const Default = (args) => {
  const dispatch = useDispatch();
  dispatch(updateGlobalSearch({ isExpanded: true, value: 'Testing' }));

  return (
    <>
      <GlobalSearch {...args} />
    </>
  );
};

export default globalSearch;
