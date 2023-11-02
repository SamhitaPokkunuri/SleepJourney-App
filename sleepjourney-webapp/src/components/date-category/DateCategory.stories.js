import React from 'react';
import { addContainer } from 'stories/utils/decorators';
import DateCategory from './DateCategory';

const dateCategory = {
  title: 'Components/Navigation/DateCategory',
  component: DateCategory,
  decorators: [addContainer()],
};

export const Default = (args) => {
  return <DateCategory {...args} />;
};

Default.args = {
  showDate: true,
  showCategory: true,
  date: '29-03-2022',
  category: 'Inclusion',
  categoryColor: 'purple',
  categoryAlias: 'https://staging.vodafone.com/news/inclusion',
};

export default dateCategory;
