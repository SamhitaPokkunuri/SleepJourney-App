/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, fireEvent } from 'test/utils';
import { Default } from './Tabs.stories';

describe('Tabs', () => {
  it('should render section title', () => {
    const { getByRole } = render(<Default {...Default.args} />);
    expect(getByRole('heading')).toHaveTextContent(/Tabs story/i);
  });

  const titles = Default.args.titles.map(({ text }) => text);

  it.each(titles)('should render tabs titles', (title) => {
    const { getByRole } = render(<Default {...Default.args} />);
    expect(getByRole('tab', { name: title })).toBeTruthy();
  });

  it('should render all tabs', () => {
    const { getAllByRole } = render(<Default {...Default.args} />);
    expect(getAllByRole('tab')).toHaveLength(5);
  });

  it('should render first tab  selected', () => {
    const { getByRole } = render(<Default {...Default.args} />);
    expect(getByRole('tab', { name: 'Tab 1', selected: true })).toBeTruthy();
  });

  it('should render first tab content', () => {
    const { getByRole } = render(<Default {...Default.args} />);
    const paragraph = getByRole('tabpanel');
    expect(paragraph.querySelector('p')).toHaveTextContent(/Lorem/i);
  });

  it('should select second tab when clicked', () => {
    const { getByRole } = render(<Default {...Default.args} />);
    fireEvent.click(getByRole('tab', { name: 'Tab 2' }));
    expect(getByRole('tab', { name: 'Tab 2', selected: true })).toBeTruthy();
  });
  it('should change orientation', () => {
    const { getByRole } = render(
      <Default {...Default.args} orientation="vertical" />
    );
    expect(getByRole('tablist')).toHaveClass('MuiTabs-flexContainerVertical');
  });
});
