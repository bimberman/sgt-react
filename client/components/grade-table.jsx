import React from 'react';

export default class GradeTable extends React.Component {

  render() {
    let gradesElements = <tr><td>No grades recorded</td></tr>;
    if (this.props.grades.length) {
      gradesElements = [];
      gradesElements = this.props.grades.map(grade => {
        return <Grade key={grade.id} id={grade.id} name={grade.name} course={grade.course} grade={grade.grade} deleteGrade={this.props.deleteGrade}></Grade>;
      });
    }
    return (
      <table className="table table-borderless" id="grades-table">
        <thead className="border-bottom">
          <tr>
            <th scope="col">Student Name</th>
            <th scope="col">Course</th>
            <th scope="col">Grade</th>
            <th scope="col" className="d-flex justify-content-center">Operation</th>
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

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    this.props.deleteGrade(this.props.id);
  }

  render() {
    const { name, course, grade } = this.props;
    return (
      <tr>
        <td>{name}</td>
        <td>{course}</td>
        <td>{grade}</td>
        <td className="table-data d-flex justify-content-center">
          <button onClick={this.handleSubmit} className="btn btn-outline-danger border border-0 fas fa-trash"></button>
        </td>
      </tr>
    );
  }
}
