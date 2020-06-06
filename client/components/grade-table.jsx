import React from 'react';

export default class GradeTable extends React.Component {

  render() {
    let gradesElements = <tr><td>No grades recorded</td></tr>;
    if (this.props.grades.length) {
      gradesElements = [];
      gradesElements = this.props.grades.map(grade => {
        return <Grade key={grade.id} name={grade.name} course={grade.course} grade={grade.grade}></Grade>;
      });
    }
    return (
      <table className="table table-borderless" id="grades-table">
        <thead className="border-bottom">
          <tr>
            <th scope="col">Student Name</th>
            <th scope="col">Course</th>
            <th scope="col">Grade</th>
          </tr>
        </thead>
        <tbody>
          {gradesElements}
        </tbody>
      </table>
    );
  }
}

class Grade extends React.Component {
  render() {
    const { name, course, grade } = this.props;
    return (
      <tr>
        <td>{name}</td>
        <td>{course}</td>
        <td>{grade}</td>
      </tr>
    );
  }
}
