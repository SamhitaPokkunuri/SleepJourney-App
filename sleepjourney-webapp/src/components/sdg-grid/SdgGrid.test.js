/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render } from 'test/utils';
import { Default } from './SdgGrid.stories';

describe('SDG Grid', () => {
  it('should render sdg-grid', () => {
    const { getByRole } = render(<Default {...Default.args} />);
    expect(getByRole('grid')).toBeInTheDocument();
  });

  it('should render sdg-grid right side', () => {
    const { container } = render(<Default {...Default.args} />);
    const rightSide = container.querySelector('.columnRight');
    expect(rightSide.querySelector('.slick-track').children).toHaveLength(13);
  });

  it('should render sdg-grid right side heading', () => {
    const { getAllByRole } = render(<Default {...Default.args} />);
    const h2 = getAllByRole('heading')[0];
    expect(h2).toHaveTextContent(
      'Explore the world of possibilities for the digital era'
    );
    expect(h2).toHaveClass('MuiTypography-h2');
    expect(h2).toHaveStyle(`text-align: left;`);
  });
});
