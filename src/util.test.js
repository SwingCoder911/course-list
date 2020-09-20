import { getCourseFromString, semesterMatches } from './utils';

// Setup list of invalid strings to test
const invalidStrings = [
  '',
  'c1',
  'cs111 k2000',
  'cs111 k200',
  'CS:111Fall 2020',
  'Math-111 Fall1990',
];

// Build a list of all valid strings to test
const validDepartmentsToCheck = ['Math', 'DEPARTMENT', 'A'];
const validDepartmentCourseDelineations = ['', ':', '-', ' '];
const validCoursesToCheck = ['1', '12', '1234'];
const validSemestersToCheck = Object.keys(semesterMatches);
const validSemesterYearDelineations = ['', ' '];
const validYearsToCheck = ['00', '2000'];
const validStrings = [];
validDepartmentsToCheck.forEach((department) =>
  validDepartmentCourseDelineations.forEach((dcDelineation) =>
    validCoursesToCheck.forEach((course) => {
      validSemestersToCheck.forEach((semester) =>
        validSemesterYearDelineations.forEach((syDelineation) =>
          validYearsToCheck.forEach((year) => {
            validStrings.push(
              `${department}${dcDelineation}${course} ${semester}${syDelineation}${year}`
            );
          })
        )
      );
      validYearsToCheck.forEach((year) =>
        validSemesterYearDelineations.forEach((syDelineation) =>
          validSemestersToCheck.forEach((semester) => {
            validStrings.push(
              `${department}${dcDelineation}${course} ${year}${syDelineation}${semester}`
            );
          })
        )
      );
    })
  )
);

describe('getCourseFromString', () => {
  describe('invalid', () => {
    invalidStrings.forEach((value) => {
      it(`should return null with value '${value}'`, () => {
        expect(getCourseFromString(value)).toBeNull();
      });
    });
  });
  describe('valid', () => {
    validStrings.forEach((value) => {
      it(`should return valid with value '${value}'`, () => {
        expect(getCourseFromString(value)).not.toBeNull();
      });
    });
  });
  it('should return null when empty string is passed', () => {
    expect(getCourseFromString('')).toBeNull();
  });
});
