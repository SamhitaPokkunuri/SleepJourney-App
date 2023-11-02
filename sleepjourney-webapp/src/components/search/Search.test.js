/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render } from 'test/utils';
import { fireEvent } from '@testing-library/react';
import { Default } from './Search.stories';

jest.spyOn(window, 'alert').mockImplementation(() => {});

describe('Search Box', () => {
  it('should render searchbox with standards', () => {
    const { getByRole } = render(<Default {...Default.args} />);
    const input = getByRole('textbox');
    expect(getByRole('textbox', { placeholder: /Start typing here.../i }));
    expect(input.parentElement).toHaveStyle(
      `border-radius:6px`,
      'border-top-right-radius: 0px',
      'border-bottom-right-radius: 0px'
    );
    expect(getByRole('button')).toHaveAttribute('disabled');
    expect(getByRole('button')).toHaveClass('Mui-disabled');
  });

  it('should change searchbox placeholder text', () => {
    const { getByRole } = render(
      <Default {...Default.args} placeholder="Text-field testing" />
    );
    expect(getByRole('textbox').placeholder).toEqual('Text-field testing');
  });

  it('should add searchbox value', () => {
    const { getByRole } = render(
      <Default {...Default.args} value="Vodafone" />
    );
    expect(getByRole('textbox').value).toEqual('Vodafone');
  });

  it('should submit api request while click search icon', async () => {
    const onClick = jest.fn();
    const alertMock = jest.spyOn(window, 'alert').mockImplementation();
    const { getByRole } = render(
      <Default {...Default.args} value="Vodafone" handleOnClick={onClick} />
    );
    const button = getByRole('button');

    // add click to material ui iconbutton as it has no definision
    button.addEventListener('click', onClick, false);
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalled();
    expect(alertMock).toHaveBeenCalledTimes(1);
    expect(window.alert(`Search submitted ${getByRole('textbox').value}`));
  });

  it('should change searchbox shape when square is set to true', () => {
    const { getByRole } = render(<Default {...Default.args} square={true} />);
    expect(getByRole('textbox').parentElement).toHaveStyle(
      'border-top-left-radius: 0',
      'border-top-right-radius: 0',
      'border-bottom-right-radius: 0',
      'border-bottom-left-radius: 0'
    );
  });
});
