import React from 'react';
import { render } from 'test/utils';
import ScrollingIndicator from './ScrollingIndicator';

describe('ScrollingIndicator', () => {
  it('should render scroll bar', () => {
    const { container } = render(<ScrollingIndicator />);
    const scrollBar = container.querySelector('.scroll-bar');
    expect(scrollBar).toBeInTheDocument();
  });
});
