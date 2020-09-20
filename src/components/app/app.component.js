import React, { useState } from 'react';
import Course from '../course/course.component';
import className from 'classnames';
import { getCourseFromString } from '../../utils';
import styles from './app.module.scss';

/**
 * Component app
 *
 */
export default function App() {
  const [course, setCourse] = useState(null);
  const [search, setSearch] = useState('');
  const [error, setError] = useState(false);
  const onSubmit = (e) => {
    e.preventDefault();
    const newCourse = getCourseFromString(search);
    if (newCourse !== null) {
      setCourse(newCourse);
      setError(false);
    } else {
      setError(process.env.REACT_APP_ERROR_MESSAGE);
    }
  };
  const onKeyUp = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };
  const showError = () => error !== false;
  const getSearchClasses = () =>
    showError() ? [styles.search, styles.error] : styles.search;
  return (
    <section className={styles.container}>
      <p className={styles.label}>Course</p>
      <form
        className={styles['container-primary']}
        onSubmit={(e) => onSubmit(e)}
      >
        <input
          className={className(getSearchClasses())}
          onKeyUp={(e) => onKeyUp(e)}
        />
        {showError() ? <p className={styles['error-message']}>{error}</p> : ''}
        <button className={styles.submit} type="submit">
          Submit
        </button>
      </form>
      {course !== null ? <Course course={course} /> : ''}
    </section>
  );
}
