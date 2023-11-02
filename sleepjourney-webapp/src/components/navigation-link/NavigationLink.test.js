/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, fireEvent } from 'test/utils';
import { Default } from './NavigationLink.stories';

describe('Navigation Link', () => {
  let windowSpy;
  beforeEach(() => {
    windowSpy = jest.spyOn(window, 'window', 'get');
  });

  afterEach(() => {
    windowSpy.mockRestore();
  });

  it('should render navigation-link', () => {
    const { getByRole } = render(<Default {...Default.args} />);
    expect(getByRole('link')).toHaveTextContent('Navigation Link');
    expect(getByRole('link')).toHaveAttribute(
      `href`,
      'https://www.vodafone.com/'
    );
    expect(getByRole('link').className).toMatch(/link/i);
  });

  it('should render navigation-link active', () => {
    const { getByRole } = render(<Default {...Default.args} active={true} />);
    expect(getByRole('link').className).toMatch(/breadcrumbLink/i);
    expect(getByRole('link')).toHaveStyle(`
        color: #000000;
        background-color: #f4f4f4;`);
  });

  it('should render navigation-link end-link, go-to-link, has-popup', () => {
    const { getByRole } = render(
      <Default
        {...Default.args}
        endLink={true}
        goToLink={true}
        hasPopup={true}
      />
    );
    expect(getByRole('link').className).toMatch(/endLink/i);
    expect(getByRole('link').className).toMatch(/goToLink/i);
    expect(getByRole('link').className).toMatch(/popupLink/i);
    expect(getByRole('link')).toHaveStyle(`margin: 2px 0 10px;`);
  });

  it('should render navigation-link selected', () => {
    const { getByRole } = render(<Default {...Default.args} selected={true} />);
    expect(getByRole('link').className).toMatch(/selectedLink/i);
    expect(getByRole('link')).toHaveStyle(`color: rgb(230, 0, 0)`);
  });

  it('should render navigation-link trigger onClick', () => {
    const onClick = jest.fn();
    const { getByRole } = render(
      <Default {...Default.args} onClick={onClick} />
    );
    fireEvent.click(getByRole('link'));
    expect(onClick).toHaveBeenCalled();
    windowSpy.mockImplementation(() => ({
      location: {
        origin: getByRole('link')['href'],
      },
    }));
    expect(window.location.origin).toEqual(getByRole('link')['href']);
  });
});
