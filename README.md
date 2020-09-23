# course-list

Interview project to show a course list selector

# Setup

- Install: `npm install`
- Run: `npm start`
- Test: `npm test -- --coverage --watchAll=false`

# Requirements

- Build a form that takes a string in an input and "on submit", it takes the string and returns a parsed out course
- Display the parsed course with Mockup available in requirements doc
- String rules:
  - A valid course string is a single string that is a combination of a Department+Course
    Number, followed by Semester+Year.
  - Department is always one or more alphabetic characters.
  - Course Number is always one or more numeric characters.
  - Department and course number can be separated by an optional delimiter.
    - Delimiters are “-”, “ ”, or “:”.
  - Semester is either an abbreviation or the complete semester.
  - Year is either two digits or four digits (you can assume the year 2000 or greater).
  - Semester+Year combination can be swapped in position (that is, Year can come before
    Semester).
  - There is always a space between the Department+Course Number and the
    Semester+Year.
  - Semesters could be abbreviated as: F (Fall), W (Winter), S (Spring), Su (Summer)

# Challenges

- Handling the regex was the most difficult part of this. Matching multiple possible orders was the hingepoint of this.
  There was one particular bug that had me stuck for like 30 minutes where the regex didn't seem to be working, then I looked closer at the regex and realized that since I was using string interpolation to create it, I didn't need the surrounding "/" characters. Once I got that part figured out, the rest was simple.

- Testing the course input function had me confused with the amount of parenthesis I was using. I initially used nested maps to get me the exhaustive list, but that just landed me with nested arrays, so I switched to nested forEach loops, appending to the "valid list" each stage. Once I switched that up, everything worked out well.
  To be clear: this nested foreach is horribly inefficient. The only reason I decided to use it was because I was building a finite set of strings and it was only happening when running the tests.

# Refactor

- I spent the most time refactoring regex and the tests. I wanted the regex to be readable and reuseable, more than I wanted it to be clever regex. I could definitly use only 1 regex to match everything. The regex would be super long, however with matching long "uncatching" groups "OR"ed together. Not horrible but it's not very readable and not easily editable. I went the route of setting up the regex in 3 stages. 1 to get the Department/Course and 2 to get the Semester/Year.
