import React from 'react';
import styles from './course.module.scss';

const getTitle = ({ department, course }) => `${department} ${course}`;

/**
 * Component Function: Course
 * Receive a course and display it. If course is null, just return an empty string
 * @param {object} course
 */
export default function Course({ course }) {
  if (course === null) {
    return '';
  }
  return (
    <article className={styles.container}>
      <header className={styles.header}>{getTitle(course)}</header>
      <div className={styles.body}>
        <div className={styles.row}>
          <label className={styles.label}>Department</label>
          <p className={styles.value}>{course.department}</p>
        </div>
        <div className={styles.row}>
          <label className={styles.label}>Course</label>
          <p className={styles.value}>{course.course}</p>
        </div>
        <div className={styles.row}>
          <label className={styles.label}>Year</label>
          <p className={styles.value}>{course.year}</p>
        </div>
        <div className={styles.row}>
          <label className={styles.label}>Semester</label>
          <p className={styles.value}>{course.semester}</p>
        </div>
      </div>
    </article>
  );
}
