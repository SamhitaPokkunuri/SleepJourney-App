/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render } from 'test/utils';
import { Default } from './SocialIcon.stories';

describe('social icon and styles', () => {
  it('should render icon', () => {
    const { getByRole } = render(<Default {...Default.args} />);
    expect(getByRole('link').querySelector('span')).toHaveTextContent(
      'twitter'
    );
  });
  it('should have elevated style', () => {
    const { getByRole } = render(<Default {...Default.args} elevated />);
    expect(getByRole('link')).toHaveClass('elevated');
  });
  it('should change fontSize', () => {
    const { getByRole } = render(
      <Default {...Default.args} fontSize={'small'} />
    );
    expect(getByRole('link')).toHaveClass('fontSizeSmall');
  });
  it('should change style', () => {
    const { getByRole } = render(
      <Default {...Default.args} style={'is-style-brand'} />
    );
    expect(getByRole('link')).toHaveClass('is-style-brand');
  });
  it('should change platform', () => {
    const { getByRole } = render(
      <Default {...Default.args} platform={'youtube'} />
    );
    expect(getByRole('link')).toHaveClass('youtube');
  });
});

describe('icon click', () => {
  it('should have correct href', () => {
    const { getByRole } = render(<Default {...Default.args} />);
    const icon = getByRole('link');
    expect(icon).toHaveAttribute('href', 'https://twitter.com/VodafoneGroup');
    expect(icon).toHaveAttribute('target', '_blank');
  });

  let windowSpy;
  beforeEach(() => {
    windowSpy = jest.spyOn(window, 'window', 'get');
  });

  afterEach(() => {
    windowSpy.mockRestore();
  });

  it('should open href', () => {
    const { getByRole } = render(<Default {...Default.args} />);
    const icon = getByRole('link');
    windowSpy.mockImplementation(() => ({
      location: {
        origin: icon['href'],
      },
    }));
    expect(window.location.origin).toEqual(icon['href']);
  });
});
