/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render } from 'test/utils';

import { Default } from './FoundationProgramme.stories';

describe('FoundationProgramme', () => {
  it('should render title', () => {
    const { getByText } = render(<Default {...Default.args} />);
    expect(getByText('Agriculture')).toHaveTextContent('Agriculture');
  });
  it('should hide title', () => {
    const { queryByText } = render(
      <Default {...Default.args} title={{ toggle: false, title: 'none' }} />
    );
    expect(queryByText('Agriculture')).toBeFalsy();
  });
  it('should render image', () => {
    const { container } = render(<Default {...Default.args} />);
    expect(container.querySelector('.media').querySelector('img')).toBeTruthy();
  });
  it('should hider image', () => {
    const { container } = render(
      <Default {...Default.args} image={{ toggle: false, url: 'none' }} />
    );
    expect(container.querySelector('.media')).toBeFalsy();
  });
  it('should have alt text', () => {
    const { getByAltText } = render(<Default {...Default.args} />);
    expect(getByAltText('agriculture')).toBeTruthy();
  });
  it('should render link', () => {
    const { getByRole } = render(<Default {...Default.args} />);
    expect(getByRole('link')).toHaveTextContent('Agriculture');
  });
  it('should hide link', () => {
    const { queryByRole } = render(
      <Default {...Default.args} link={{ toggle: false, url: 'none' }} />
    );
    expect(queryByRole('link')).toBeFalsy();
  });
  it('should have rel', () => {
    const { getByRole } = render(<Default {...Default.args} />);
    expect(getByRole('link')).toHaveAttribute('rel', 'noreferrer noopener');
  });
});

describe('link behavior', () => {
  let windowSpy;
  beforeEach(() => {
    windowSpy = jest.spyOn(window, 'window', 'get');
  });

  afterEach(() => {
    windowSpy.mockRestore();
  });

  it('should open url in same tab', () => {
    const { getByRole } = render(<Default {...Default.args} />);

    const link = getByRole('link');
    expect(link).toHaveAttribute(
      'href',
      'https://staging.vodafone.com/news/digital-society/digitalisation-future-agriculture'
    );
    windowSpy.mockImplementation(() => ({
      location: {
        origin: link['href'],
      },
    }));
    expect(window.location.origin).toEqual(link['href']);
  });

  it('should open in new tab', () => {
    const { getByRole } = render(
      <Default
        {...Default.args}
        link={{
          toggle: true,
          url: 'https://staging.vodafone.com/news/digital-society/digitalisation-future-agriculture',
          openAs: 'new-tab',
        }}
      />
    );
    const link = getByRole('link');
    expect(link).toHaveAttribute('target', '_blank');
    windowSpy.mockImplementation(() => ({
      location: {
        origin: link['href'],
      },
    }));
    expect(window.location.origin).toEqual(link['href'], '_blank');
  });
});
