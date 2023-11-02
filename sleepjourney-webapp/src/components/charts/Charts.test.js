/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render } from 'test/utils';
import { Pie, Horizontal } from './Charts.stories';

describe('Chart', () => {
  it('should render pie-chart', () => {
    const { container } = render(<Pie {...Pie.args} />);
    expect(container.firstChild).toHaveClass('chart-pie');
  });

  it('should render pie-chart canvas', () => {
    render(<Pie {...Pie.args} />);
    const PieChart = document.querySelector('.chart-pie');
    expect(PieChart.querySelector('canvas')).toBeInTheDocument();
    expect(PieChart.querySelector('canvas')).toHaveClass(
      'chartjs-render-monitor'
    );
  });

  it('should render horizntal-chart', () => {
    const { container } = render(<Horizontal {...Horizontal.args} />);
    expect(container.firstChild).toHaveClass('chart-horizontalBar');
  });

  it('should render horizntal-chart canvas', () => {
    render(<Horizontal {...Horizontal.args} />);
    const HorizontalChart = document.querySelector('.chart-horizontalBar');
    expect(HorizontalChart.querySelector('canvas')).toBeInTheDocument();
    expect(HorizontalChart.querySelector('canvas')).toHaveClass(
      'chartjs-render-monitor'
    );
  });
});
