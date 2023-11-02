import React from 'react';
import { render, screen } from 'test/utils';
import ReadingTime from './ReadingTime';

describe('ReadingTime', () => {
  const readingTimeProps = {
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
  };

  it('should render clock icon', () => {
    render(<ReadingTime {...readingTimeProps} />);
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('should render < 1 minute read', () => {
    render(<ReadingTime {...readingTimeProps} />);
    expect(screen.getByText('< 1 minute read')).toBeInTheDocument();
  });

  it('should render 1 minute read', () => {
    render(<ReadingTime {...readingTimeProps} wordsPerMinute={8} />);
    expect(screen.getByText('1 minute read')).toBeInTheDocument();
  });
});
