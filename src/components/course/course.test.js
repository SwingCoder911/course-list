import React from 'react';
import { render } from '@testing-library/react';
import courseMock from '../../test/course.mock';
import Course from './course.component';

jest.mock('./course.module.scss', () => ({
  __esModule: true,
  default: {
    container: 'container',
    header: 'header',
    body: 'body',
    row: 'row',
    label: 'label',
    value: 'value',
  },
}));

describe('<Course/>', () => {
  it('should exist', () => {
    const { container } = render(<Course course={courseMock} />);
    expect(container.querySelector('.container')).toBeTruthy();
    expect(container.querySelector('.container').tagName).toBe('ARTICLE');
    expect(container.querySelector('.header')).toBeTruthy();
    expect(container.querySelector('.body')).toBeTruthy();
    expect(container.querySelectorAll('.row').length).toBe(4);
    expect(container.querySelectorAll('.label').length).toBe(4);
    expect(container.querySelectorAll('.value').length).toBe(4);
  });
});
