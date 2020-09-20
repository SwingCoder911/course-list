export const semesterMatches = {
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

const matchSemester = `(${Object.keys(semesterMatches).join('|')})`;
const matchYear = `([0-9]{2}|2[0-9]{3})`;

const getYearFromParsed = (parsed) => {
  if (parsed.length === 2) {
    return `20${parsed}`;
  }
  return parsed;
};

export const getCourseFromString = (input) => {
  let finalParsed = {
    department: null,
    course: null,
    semester: null,
    year: null,
  };
  let result = input.match(/^([A-Z]+|[A-Z][a-z]+)[\s:-]?([0-9]+).*/);
  if (result !== null) {
    finalParsed = {
      ...finalParsed,
      department: result[1],
      course: result[2],
    };
  } else {
    return null;
  }
  result = input.match(`.*\\s${matchSemester}\\s?${matchYear}$`);
  if (result !== null) {
    finalParsed = {
      ...finalParsed,
      semester: semesterMatches[result[1]],
      year: getYearFromParsed(result[2]),
    };
  }
  result = input.match(`.*\\s${matchYear}\\s?${matchSemester}$`);
  if (result !== null) {
    finalParsed = {
      ...finalParsed,
      semester: semesterMatches[result[2]],
      year: getYearFromParsed(result[1]),
    };
  }
  if (finalParsed.semester === null || finalParsed.year === null) {
    return null;
  }
  return finalParsed;
};
