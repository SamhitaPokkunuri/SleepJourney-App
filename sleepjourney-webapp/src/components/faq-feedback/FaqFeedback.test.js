/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, waitFor, fireEvent } from 'test/utils';
import { Default } from './FaqFeedback.stories';

describe('Faq Feedback', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('should render faq-feedback', () => {
    const { getByText } = render(<Default {...Default.args} />);
    expect(getByText(/Your opinion/i)).toBeInTheDocument();
  });

  it('should render faq-feedback buttons', () => {
    const { getAllByRole } = render(<Default {...Default.args} />);
    expect(getAllByRole('button')).toHaveLength(2);
    getAllByRole('button').forEach((button) => {
      expect(button).toBeInTheDocument();
      expect(button.className).toMatch('square-button');
    });
  });

  it('should render faq-feedback yes button active', () => {
    const { getByRole } = render(<Default {...Default.args} />);
    const button = getByRole('button', { name: 'Yes' });
    expect(
      button.querySelector('[data-src="/icons/foundation/thumbs-up.svg"]')
    ).toBeTruthy();
    fireEvent.click(button);
    expect(button).toHaveClass('active');
  });

  const align = [
    ['top', 'flex-start'],
    ['center', 'center'],
    ['bottom', 'flex-end'],
  ];
  test.each(align)(
    'should render faq-feedback label with align property',
    (input, expected) => {
      const { getByText } = render(<Default {...Default.args} align={input} />);
      waitFor(() =>
        expect(getByText(/Your opinion/i).parentElement).toHaveStyle(
          `align-items:${expected}`,
          `justify-content:${expected}`
        )
      );
    }
  );

  it('should render faq-feedback no button with email and trigger click', () => {
    const onClick = jest.fn();
    const { getByRole } = render(
      <Default
        {...Default.args}
        email="sample@vodafone.com"
        onClick={onClick}
      />
    );
    const link = getByRole('link', { name: 'No' });
    expect(
      link.querySelector('[data-src="/icons/foundation/thumbs-down.svg"]')
    ).toBeTruthy();
    expect(link).toHaveAttribute('href', 'mailto:sample@vodafone.com');
    fireEvent.click(link);
    waitFor(() => expect(onClick).toHaveBeenCalled());
  });
});
