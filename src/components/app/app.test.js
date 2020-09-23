import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from './app.component';

jest.mock('./app.module.scss', () => ({
  __esModule: true,
  default: {
    container: 'container',
    search: 'search',
    label: 'label',
    submit: 'submit',
    error: 'error',
    'container-primary': 'container-primary',
  },
}));

describe('<App/>', () => {
  it('should exist', () => {
    const { container } = render(<App />);
    expect(container.querySelector('.container')).toBeTruthy();
    expect(container.querySelector('.container').tagName).toBe('SECTION');
  });

  it('should have p label', () => {
    const { getByText } = render(<App />);
    const p = getByText('Course');
    expect(p.tagName).toBe('P');
  });

  it('should have form', () => {
    const { container } = render(<App />);
    expect(container.querySelector('.container-primary')).toBeTruthy();
    expect(container.querySelector('.container-primary').tagName).toBe('FORM');
  });

  it('should have submit button', () => {
    const { getByText } = render(<App />);
    const button = getByText('Submit');
    expect(button.tagName).toBe('BUTTON');
  });

  it('should submit with valid string', () => {
    const { container, getByText } = render(<App />);
    const input = container.querySelector('.search');
    const button = getByText('Submit');
    fireEvent.keyUp(input, { target: { value: 'CS:111 F20' } });
    fireEvent.click(button);
    expect(getByText('Department')).toBeTruthy();
  });
});
