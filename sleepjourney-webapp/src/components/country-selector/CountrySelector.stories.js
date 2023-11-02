import React from 'react';
import { useDispatch } from 'react-redux';
import { addContainer } from 'stories/utils/decorators';
import CountrySelector from './CountrySelector';
import { updateCountrySelector } from 'lib/slices/uiSlice';

const countrySelector = {
  title: 'Components/Layout/CountrySelector',
  component: CountrySelector,
  decorators: [addContainer('lg')],
};

export const Default = (args) => {
  const dispatch = useDispatch();
  dispatch(updateCountrySelector({ isExpanded: true, isVisible: true }));

  return (
    <>
      <CountrySelector {...args} />
    </>
  );
};

export default countrySelector;
