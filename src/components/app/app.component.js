import React, { useState } from 'react';
import Course from '../course/course.component';
import className from 'classnames';
import styles from './app.module.scss';
const semesterMatches = {
  F: 'Fall',
  f: 'Fall',
  Fall: 'Fall',
  fall: 'Fall',
  W: 'Winter',
  w: 'Winter',
  Winter: 'Winter',
  winter: 'Winter',
  S: 'Spring',
  s: 'Spring',
  Spring: 'Spring',
  spring: 'Spring',
  Su: 'Summer',
  su: 'Summer',
  Summer: 'Summer',
  summer: 'Summer',
};

const getYearFromParsed = (parsed) => {
  if (parsed.length === 2) {
    return `20${parsed}`;
  }
  return parsed;
};

const parseDepartmentAndCourse = (input) => {
  const result = input.match(/^([A-Z]+|[A-Z][a-z]+)[\s:-]?([0-9]+).*/);
  if (result !== null) {
    return { department: result[1], course: result[2] };
  }
  return { department: null, course: null };
};

const parseSemesterAndYear = (input) => {
  const matchSemester = `(${Object.keys(semesterMatches).join('|')})`;
  const matchYear = `([0-9]{2}|2[0-9]{3})`;
  let result = input.match(`.*\\s${matchSemester}\\s?${matchYear}$`);
  if (result !== null) {
    return {
      semester: semesterMatches[result[1]],
      year: getYearFromParsed(result[2]),
    };
  }
  result = input.match(`.*\\s${matchYear}\\s?${matchSemester}$`);
  if (result !== null) {
    return {
      semester: semesterMatches[result[2]],
      year: getYearFromParsed(result[1]),
    };
  }
  return { semester: null, year: null };
};

const errorMessage = 'Error: Could not parse course';

const getCourseByString = (input) => {
  const { department, course } = parseDepartmentAndCourse(input);
  const { semester, year } = parseSemesterAndYear(input);
  if (
    department === null ||
    course === null ||
    semester === null ||
    year === null
  ) {
    return null;
  }
  return {
    department,
    course,
    semester,
    year,
  };
};
function App() {
  const [course, setCourse] = useState(null);
  const [search, setSearch] = useState('');
  const [error, setError] = useState(false);
  const onSubmit = (e) => {
    e.preventDefault();
    const newCourse = getCourseByString(search);
    if (newCourse !== null) {
      setCourse(newCourse);
      setError(false);
    } else {
      setError(errorMessage);
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

export default App;
