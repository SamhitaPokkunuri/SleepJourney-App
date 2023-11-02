/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, fireEvent, waitFor } from 'test/utils';
import { Default } from './PreviewBar.stories';

describe('Preview Bar', () => {
  let windowSpy;
  beforeEach(() => {
    windowSpy = jest.spyOn(window, 'window', 'get');
  });

  afterEach(() => {
    windowSpy.mockRestore();
  });

  it('should render preview-bar', () => {
    const { getByText } = render(<Default {...Default.args} />);
    const container = document.querySelector('.MuiContainer-root');
    expect(getByText(/this is page/i)).toHaveTextContent(
      'This is page is a preview. Click here to exit preview mode.'
    );
    expect(container.className).toMatch(/container/i);
  });

  it('should render preview-bar link', () => {
    const onClick = jest.fn();
    const { getByRole } = render(
      <Default {...Default.args} onClick={onClick} />
    );
    expect(getByRole('link', { name: 'Click here' }));
    expect(getByRole('link')).toHaveAttribute('href', '/api/exit-preview');
    fireEvent.click(getByRole('link').attributes.href);

    waitFor(() => expect(onClick).toHaveBeenCalled());
    windowSpy.mockImplementation(() => ({
      location: {
        origin: getByRole('link')['href'],
      },
    }));
    expect(window.location.origin).toEqual(getByRole('link')['href']);
  });
});
