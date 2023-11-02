import React from 'react';
import ToggleButton from './ToggleButton';

const toggleButton = {
  title: 'Components/Inputs/ToggleButton',
  component: ToggleButton,
  parameters: {
    layout: 'centered',
  },
};

export const Default = (args) => {
  const [active, setActive] = React.useState(args.active);

  return (
    <ToggleButton
      {...args}
      active={active}
      onClick={() => {
        setActive(!active);
      }}
    />
  );
};

Default.args = {
  label: 'Toggle Button',
};

export default toggleButton;
