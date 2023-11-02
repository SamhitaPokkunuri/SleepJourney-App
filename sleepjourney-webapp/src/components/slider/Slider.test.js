/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, fireEvent } from 'test/utils';

import { Default, HeroBanner } from './Slider.stories';

describe('Default slider', () => {
  it('should render single image', () => {
    const { getAllByRole } = render(<Default {...Default.args} />);
    expect(getAllByRole('img', { hidden: false })).toHaveLength(1);
  });

  it('should  render first image properties - family', () => {
    const { getByRole } = render(<Default {...Default.args} />);
    expect(getByRole('img', { hidden: false })).toHaveAttribute(
      'alt',
      'formula-e'
    );
  });
  it('pressing 2nd dot should switch image', () => {
    const { getByRole } = render(<Default {...Default.args} />);
    fireEvent.click(getByRole('button', { name: '2' }));
    expect(getByRole('img', { hidden: false })).toHaveAttribute(
      'alt',
      'family'
    );
  });
  it('next button should render next image', () => {
    const { getByRole } = render(<Default {...Default.args} />);

    fireEvent.click(getByRole('button', { name: /Next/i }));
    expect(getByRole('img', { hidden: false })).toHaveAttribute(
      'alt',
      'family'
    );
  });

  it('previous button should render previous image', () => {
    const { getByRole } = render(<Default {...Default.args} />);

    fireEvent.click(getByRole('button', { name: /Previous/i }));
    expect(getByRole('img', { hidden: false })).toHaveAttribute(
      'alt',
      'network'
    );
  });
});

describe('HeroBanner Slider', () => {
  it('should render correct hero-banner appearance', () => {
    const { container } = render(<HeroBanner {...HeroBanner.args} />);
    expect(container.querySelector('.MuiBox-root').className).toMatch(
      /heroSlider/i
    );
  });

  it('shouldnt render dots', () => {
    const { queryByRole } = render(<HeroBanner {...HeroBanner.args} />);
    expect(queryByRole('button', { name: '1' })).toBeFalsy();
  });

  it('shouldnt render arrows', () => {
    const { queryByRole } = render(<HeroBanner {...HeroBanner.args} />);
    expect(queryByRole('button', { name: /Next/i })).toBeFalsy();
    expect(queryByRole('button', { name: /Previous/i })).toBeFalsy();
  });

  it('should add flex layout', () => {
    const { container } = render(<HeroBanner {...HeroBanner.args} />);
    expect(container.querySelector('.MuiBox-root').className).toMatch(
      /hasFlex/i
    );
  });

  it('should add margin', () => {
    const { container } = render(
      <HeroBanner {...HeroBanner.args} marginBottom />
    );

    expect(container.querySelector('.MuiBox-root')).toHaveStyle(
      'margin-bottom: 24px'
    );
  });
});

describe('Banner Slider', () => {
  it('should render correct Banner appearance', () => {
    const { container } = render(
      <Default {...Default.args} appearance="banner" />
    );
    expect(container.querySelector('.MuiBox-root').className).toMatch(
      /banner/i
    );
  });
});

describe('Map Slider', () => {
  it('should render correct Map slider appearance', () => {
    const { container } = render(
      <Default {...Default.args} appearance="map-slider" />
    );
    expect(container.querySelector('.MuiBox-root').className).toMatch(
      /mapSlider/i
    );
  });
});

describe('SDG Slider', () => {
  it('should render correct SDG appearance', () => {
    const { container } = render(
      <Default {...Default.args} appearance="sdg-mode" />
    );
    expect(container.querySelector('.MuiBox-root').className).toMatch(
      /sdgSlider/i
    );
  });
});
