/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, fireEvent } from 'test/utils';
import { Expanded, Collasped } from './Accordion.stories';

describe('Expanded Story Accordion', () => {
  it('should render title -- Expanded State Accordion', () => {
    const { getByRole } = render(<Expanded {...Expanded.args} />);
    expect(getByRole('heading', { name: 'Expanded State Accordion' }));
  });

  it('should render content expanded', () => {
    const { getByText } = render(<Expanded {...Expanded.args} />);
    expect(getByText('AccordionItem').parentElement).toHaveClass(
      'Mui-expanded'
    );
  });

  it('should collapse if when click on title', () => {
    const { getByText } = render(<Expanded {...Expanded.args} />);
    fireEvent.click(getByText('AccordionItem'));
    expect(getByText('AccordionItem').parentElement).not.toHaveClass(
      'Mui-expanded'
    );
  });
});

describe('Collapsed Story Accordion', () => {
  it('should render title -- Collapsed State Accordion', () => {
    const { getByRole } = render(<Collasped {...Collasped.args} />);
    expect(getByRole('heading', { name: 'Collapsed State Accordion' }));
  });

  it('should render content collapsed', () => {
    const { getByText } = render(<Collasped {...Collasped.args} />);
    expect(getByText('AccordionItem').parentElement).not.toHaveClass(
      'Mui-expanded'
    );
  });

  it('should expand if collapsed', () => {
    const { getByText } = render(<Collasped {...Collasped.args} />);
    fireEvent.click(getByText('AccordionItem'));
    expect(getByText('AccordionItem').parentElement).toHaveClass(
      'Mui-expanded'
    );
  });
});
