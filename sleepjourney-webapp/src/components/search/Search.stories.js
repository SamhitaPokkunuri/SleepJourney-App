import React from 'react';
import { addContainer } from 'stories/utils/decorators';
import Search from './Search';

const search = {
  title: 'Components/Inputs/Search',
  component: Search,
  decorators: [addContainer('sm')],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    value: {
      control: { type: null },
    },
  },
};

export const Default = (args) => {
  const [value, setValue] = React.useState(args.value ?? '');

  return (
    <Search
      {...args}
      value={value}
      onChange={(event) => setValue(event.target.value)}
      handleOnClick={(value) => {
        alert(`Search submitted ${value}`);
      }}
    />
  );
};

Default.args = {
  placeholder: 'Start typing here...',
  square: false,
};

export default search;
