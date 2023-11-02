/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, fireEvent, waitFor } from 'test/utils';
import { Default } from './PopularLinks.stories';

describe('Popular Links', () => {
  let windowSpy;
  beforeEach(() => {
    windowSpy = jest.spyOn(window, 'window', 'get');
  });

  afterEach(() => {
    windowSpy.mockRestore();
  });

  it('should render popular-links', () => {
    const { getAllByRole } = render(<Default {...Default.args} />);
    expect(getAllByRole('link')[0].parentElement.className).toMatch(/root/i);
    expect(getAllByRole('link')).toHaveLength(4);
    getAllByRole('link').forEach((link) => {
      expect(link.className).toMatch(/linkButton/i);
    });
  });

  it('should render popular-links news', () => {
    const onClick = jest.fn();
    const { getByRole } = render(
      <Default {...Default.args} onClick={onClick} />
    );
    const news = getByRole('link', { name: 'News' });
    expect(news).toHaveAttribute('href', '/news');
    fireEvent.click(news.attributes.href);
    waitFor(() => {
      expect(onClick).toHaveBeenCalled();
      windowSpy.mockImplementation(() => ({
        location: {
          origin: news['href'],
        },
      }));
      expect(window.location.origin).toEqual(news['href']);
    });
  });

  it('should render popular-links viewpoint', () => {
    const onClick = jest.fn();
    const { getByRole } = render(
      <Default {...Default.args} onClick={onClick} />
    );
    const viewpoint = getByRole('link', { name: 'Digital Society' });
    expect(viewpoint).toHaveAttribute('href', '/news/digital-society');
    fireEvent.click(viewpoint.attributes.href);
    waitFor(() => {
      expect(onClick).toHaveBeenCalled();
      windowSpy.mockImplementation(() => ({
        location: {
          origin: viewpoint['href'],
        },
      }));
      expect(window.location.origin).toEqual(viewpoint['href']);
    });
  });

  it('should render popular-links vodafone business', () => {
    const onClick = jest.fn();
    const { getByRole } = render(
      <Default {...Default.args} onClick={onClick} />
    );
    const vodafoneBusiness = getByRole('link', { name: 'Vodafone Business' });
    expect(vodafoneBusiness).toHaveAttribute('href', '/our-purpose');
    fireEvent.click(vodafoneBusiness.attributes.href);
    waitFor(() => {
      expect(onClick).toHaveBeenCalled();
      windowSpy.mockImplementation(() => ({
        location: {
          origin: vodafoneBusiness['href'],
        },
      }));
      expect(window.location.origin).toEqual(vodafoneBusiness['href']);
    });
  });

  it('should render popular-links careers', () => {
    const onClick = jest.fn();
    const { getByRole } = render(
      <Default {...Default.args} onClick={onClick} />
    );
    const careers = getByRole('link', { name: 'Careers' });
    expect(careers).toHaveAttribute('href', 'https://careers.vodafone.com/');
    fireEvent.click(careers.attributes.href);
    waitFor(() => {
      expect(onClick).toHaveBeenCalled();
      windowSpy.mockImplementation(() => ({
        location: {
          origin: careers['href'],
        },
      }));
      expect(window.location.origin).toEqual(careerss['href'], '_blank');
    });
  });
});
