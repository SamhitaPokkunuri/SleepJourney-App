/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, fireEvent, waitFor, within } from 'test/utils';
import { Default } from './SdgSlider.stories';

describe('SDG Carousel', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('should render sdg-slider', () => {
    render(<Default {...Default.args} />);
    const container = document.querySelector('.MuiBox-root');
    expect(container.children[0].className).toMatch(/slider/i);
  });

  it('should render sdg-slider card', () => {
    render(<Default {...Default.args} />);
    const card = document.querySelector('.MuiGrid-container').parentElement;
    expect(card.parentElement.className).toMatch(/sliderCard/i);
    expect(card.className).toMatch(/innerCard/i);
    expect(card).toHaveStyle(`padding: 40px;
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.16);
    background-color: #ffffff;`);
  });

  it('should render sdg-slider card text', () => {
    const { getAllByRole } = render(<Default {...Default.args} />);
    const paragraph = document.querySelectorAll('.MuiTypography-body1');
    getAllByRole('heading').forEach((head) => {
      expect(head.parentElement).toHaveClass('MuiGrid-item');
      expect(head.className).toMatch(/cardTitle/i);
      expect(head).toHaveStyle(`text-align: left;`);
    });
    paragraph.forEach((paragraph) => {
      expect(paragraph).toHaveStyle(`text-align: left;margin-top: 20px;`);
    });
  });

  it('should render sdg-slider card button', () => {
    const onClick = jest.fn();
    render(<Default {...Default.args} onClick={onClick} />);
    const buttons = within(document.querySelector('.slick-list')).getAllByRole(
      'button'
    );
    buttons.forEach((btn) => {
      expect(btn.className).toMatch(/button/i);
      expect(btn).toHaveTextContent('View demo');
      fireEvent.click(btn);
      waitFor(() => expect(onClick).toHaveBeenCalled());
    });
  });

  it('next button should render next card', () => {
    const { getByRole, getByText } = render(<Default {...Default.args} />);
    fireEvent.click(getByRole('button', { name: /Next/i }));
    const paragraph = getByText(/Designed/i);
    expect(getByRole('heading', { hidden: false })).toHaveTextContent(
      'Curve Bike Light & GPS tracker'
    );
    expect(paragraph).toHaveTextContent(
      'Designed to give you confidence as you ride. Feel safer on the roads and connected to your bike when you’re not.'
    );
  });

  it('previous button should render previous card', () => {
    const { getByRole, getByText } = render(<Default {...Default.args} />);
    fireEvent.click(getByRole('button', { name: /Previous/i }));
    const paragraph = getByText(/Help/i);
    expect(getByRole('heading', { hidden: false })).toHaveTextContent(
      'IoT portable traffic emergency light'
    );
    expect(paragraph).toHaveTextContent(
      'Help Flash IoT is a luminous device that can replace emergency warning triangles for motorists providing security and safety while travelling.'
    );
  });
});
