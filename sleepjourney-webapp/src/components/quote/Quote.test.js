/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render } from 'test/utils';
import { Default } from './Quote.stories';

describe('Quote', () => {
  it('should render quote', () => {
    render(<Default {...Default.args} />);
    const blockquote = document.querySelector('.blockquote');
    const citation = document.querySelector('.citation');
    expect(blockquote).toBeInTheDocument();
    expect(citation).toBeInTheDocument();
  });

  it('should render quote with blockquote only ', () => {
    render(<Default {...Default.args} citation={null} />);
    const citation = document.querySelector('.citation');
    expect(citation).not.toBeInTheDocument();
  });
});
