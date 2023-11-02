/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, fireEvent } from 'test/utils';

import { Primary, HeroBannerCarousel } from './Carousel.stories';

describe('Primary carousel', () => {
  it('should render default appearance', () => {
    const { getByRole } = render(<Primary {...Primary.args} />);
    expect(
      getByRole('heading', {
        hidden: false,
        name: 'family',
      }).parentElement.className
    ).toMatch(/blackFigcaption/i);
  });

  it('should change appearance to hero when value changed', () => {
    const { getByRole } = render(
      <Primary {...Primary.args} appearance="hero-banner" />
    );
    expect(
      getByRole('heading', {
        hidden: false,
        name: 'family',
      }).parentElement.className
    ).toMatch(/redFigcaption/i);
  });

  it('should render  single caption', () => {
    const { getAllByRole } = render(<Primary {...Primary.args} />);
    expect(getAllByRole('heading', { hidden: false })).toHaveLength(1);
  });

  it('should render  first caption - family', () => {
    const { getByRole } = render(<Primary {...Primary.args} />);
    const caption = getByRole('heading', { hidden: false });
    expect(caption).toHaveTextContent('family');
    expect(caption.parentElement).toHaveStyle(
      `color: white`,
      'padding: 12px 20px',
      'background: rgba(0,0,0,0.25)',
      'text-align: center'
    );
  });

  it('should switch caption', () => {
    const { getByRole } = render(<Primary {...Primary.args} />);
    fireEvent.click(getByRole('button', { name: '2' }));
    expect(getByRole('heading', { hidden: false })).toHaveTextContent(
      'formula'
    );
  });

  it('should remove dots when it is false', () => {
    render(<Primary {...Primary.args} hasDots={false} />);
    expect(document.querySelector('slick-dots')).toBe(null);
  });
});

describe('HeroBanner carousel', () => {
  it('should render correct hero-banner appearance', () => {
    const { getByRole } = render(
      <HeroBannerCarousel {...HeroBannerCarousel.args} />
    );
    const caption = getByRole('heading', {
      hidden: false,
      name: 'family',
    });
    expect(caption.parentElement.className).toMatch(/redFigcaption/i);
    expect(caption.className).toMatch(/redCaption/i);
  });
});
