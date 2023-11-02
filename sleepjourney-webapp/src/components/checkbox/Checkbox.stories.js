import React from 'react';
import Checkbox from './Checkbox';

const checkbox = {
  title: 'Components/Inputs/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    checked: {
      control: { type: null },
    },
    data: {
      control: { type: null },
    },
  },
};

export const Default = (args) => {
  const [checked, setChecked] = React.useState([args.data[0]]);

  return (
    <Checkbox
      {...args}
      checked={checked}
      onChange={(item) => () => {
        const itemIndex = checked.findIndex((x) => x.tid === item.tid);

        if (itemIndex > -1) {
          const newChecked = [...checked];
          newChecked.splice(itemIndex, 1);
          setChecked(newChecked);
        } else {
          setChecked([...checked, item]);
        }
      }}
    />
  );
};

Default.args = {
  data: [
    {
      tid: 1,
      name: 'first',
    },
    {
      tid: 2,
      name: 'second',
    },
    {
      tid: 3,
      name: 'third',
    },
    {
      tid: 4,
      name: 'forth',
    },
  ],
};

export default checkbox;
