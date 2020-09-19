import React from 'react';
import styles from './course.module.scss';
const getTitle = ({ department, course }) => `${department} ${course}`;
export default function Course({ course }) {
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
