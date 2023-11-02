/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render } from 'test/utils';

import { Default } from './File.stories';

describe('File', () => {
  it('should render file name', () => {
    const { getByRole } = render(<Default {...Default.args} />);

    expect(
      getByRole('link', {
        name: 'Guidance note - Lives Improved methodology Oct 2018.pdf Add to Default shortcuts',
      })
    ).toBeTruthy();
  });

  it('should have correct href', () => {
    const { getByRole } = render(<Default {...Default.args} />);

    expect(
      getByRole('link', {
        name: 'Guidance note - Lives Improved methodology Oct 2018.pdf Add to Default shortcuts',
      })
    ).toHaveAttribute(
      'href',
      'https://content-staging.vodafone.com/sites/default/files/inline-images/Guidance%20note%20-%20Lives%20Improved%20methodology%20Oct%202018.pdf'
    );
  });
});

describe('clicking behavior', () => {
  let windowSpy;
  beforeEach(() => {
    windowSpy = jest.spyOn(window, 'window', 'get');
  });

  afterEach(() => {
    windowSpy.mockRestore();
  });

  it('should open in new tab', () => {
    const { getByRole } = render(<Default {...Default.args} />);

    const file = getByRole('link', {
      name: 'Guidance note - Lives Improved methodology Oct 2018.pdf Add to Default shortcuts',
    });

    windowSpy.mockImplementation(() => ({
      location: {
        origin: file['href'],
      },
    }));
    expect(window.location.origin).toEqual(file['href']);
  });
  it('should open in same tab', () => {
    const { getByRole } = render(
      <Default {...Default.args} textLinkTarget="" />
    );

    const file = getByRole('link', {
      name: 'Guidance note - Lives Improved methodology Oct 2018.pdf Add to Default shortcuts',
    });

    windowSpy.mockImplementation(() => ({
      location: {
        origin: file['href'],
      },
    }));
    expect(window.location.origin).toEqual(file['href']);
  });
});
