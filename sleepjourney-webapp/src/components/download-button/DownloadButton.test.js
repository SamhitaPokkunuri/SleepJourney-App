/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render } from 'test/utils';
import { fireEvent } from '@testing-library/react';
import { Default } from './DownloadButton.stories';

describe('Download Button', () => {
  let windowSpy;
  beforeEach(() => {
    windowSpy = jest.spyOn(window, 'window', 'get');
  });

  afterEach(() => {
    windowSpy.mockRestore();
  });

  it('should renders download button', () => {
    const { getByRole } = render(<Default {...Default.args} />);
    const defaultButton = getByRole('button');
    expect(getByRole('button', { name: 'Download Button' }));
    expect(
      defaultButton.querySelector('[data-src="/icons/global/download.svg"]')
    ).toBeTruthy();
    expect(defaultButton).toHaveAttribute('download', '');
  });

  it('should makes the button full width', () => {
    const { getByRole } = render(<Default {...Default.args} />);
    const defaultButton = getByRole('button');
    expect(defaultButton).toHaveClass('MuiButton-fullWidth');
    expect(defaultButton).toHaveStyle(`width: 100%`);
  });

  it('should remove button full width', () => {
    const { getByRole } = render(
      <Default {...Default.args} fullWidth={false} />
    );
    const defaultButton = getByRole('button');
    expect(defaultButton).not.toHaveClass('MuiButton-fullWidth');
  });

  it('should fire onClick function', () => {
    const onClick = jest.fn();
    const { getByRole } = render(
      <Default {...Default.args} onClick={onClick} />
    );
    fireEvent.click(getByRole('button'));
    expect(onClick).toHaveBeenCalled();
  });

  it('should simulatedownload the file', () => {
    const handleClick = jest.fn();
    const { getByRole } = render(
      <Default {...Default.args} onClick={handleClick} />
    );
    const link = getByRole('button');
    link.download = 'test-file.txt';
    link.href = `data:application/txt,hello%20world`;
    fireEvent.click(link);
    expect(handleClick).toHaveBeenCalled();
  });

  it('should open file in href is provided', () => {
    const onClick = jest.fn();
    const { getByRole } = render(
      <Default
        {...Default.args}
        href="http://vodafone.com/content/dam/vodcom/devices/r209-zr/ec-r209zr.pdf"
        onClick={onClick}
      />
    );
    const defaultButton = getByRole('link');
    expect(defaultButton['href']).toBe(
      'http://vodafone.com/content/dam/vodcom/devices/r209-zr/ec-r209zr.pdf'
    );
    fireEvent.click(defaultButton);
    expect(onClick).toHaveBeenCalled();
    windowSpy.mockImplementation(() => ({
      location: {
        origin: defaultButton['href'],
      },
    }));
    expect(windowSpy).toHaveBeenCalled();
    expect(window.location.origin).toEqual(defaultButton['href']);
  });

  it('should change icon when it set to new one in the same group', () => {
    const { getByRole } = render(
      <Default {...Default.args} icon="PopOutFoundation" />
    );
    const defaultButton = getByRole('button');
    expect(
      defaultButton.querySelector(
        '[data-src="/icons/global/pop-out-foundation.svg"]'
      )
    ).toBeTruthy();
    expect(defaultButton).not.toHaveAttribute('download', '');
  });
});
