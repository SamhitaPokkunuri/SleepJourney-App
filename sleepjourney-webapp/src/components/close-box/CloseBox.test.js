import React from 'react';
import { render, screen } from 'test/utils';
import CloseBox from './CloseBox';

describe('CloseBox', () => {
  const closeBoxProps = {
    children: 'Close box',
  };

  it('should render children', () => {
    render(<CloseBox {...closeBoxProps} />);
    expect(screen.getByText('Close box')).toBeInTheDocument();
  });
});
