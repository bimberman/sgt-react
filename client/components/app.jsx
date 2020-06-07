
import React from 'react';
import Header from './header';
import GradeTable from './grade-table';
import GradeForm from './grade-form';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grades: [],
      gradeToEditId: null
    };
    this.addGrade = this.addGrade.bind(this);
    this.deleteGrade = this.deleteGrade.bind(this);
    this.editGrade = this.editGrade.bind(this);
    this.setGradeToEdit = this.setGradeToEdit.bind(this);
    this.getGradeToEdit = this.getGradeToEdit.bind(this);
  }

  componentDidMount() {
    fetch('/api/grades')
      .then(res => res.json())
      .then(grades => this.setState({ grades: grades, gradeToEditId: null }))
      .catch(error => console.error(error));
  }

  addGrade(newGrade) {
    fetch(
      '/api/grades',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newGrade)
      }
    )
      .then(res => res.json())
      .then(grade => this.setState({
        grades: this.state.grades.concat(grade),
        gradeToEditId: null
      }))
      .catch(error => console.error(error));
  }

  deleteGrade(gradeId) {
    fetch(
      `/api/grades/${gradeId}`,
      {
        method: 'DELETE'
      }
    )
      .then(res => {
        this.setState({
          grades: this.state.grades.filter(grade => grade.id !== gradeId),
          gradeToEditId: null
        });
      })
      .catch(error => console.error(error));
  }

  editGrade(editGrade) {
    fetch(
      `/api/grades/${this.state.gradeToEditId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editGrade)
      }
    )
      .then(res => res.json())
      .then(resGrade => this.setState({
        grades: this.state.grades.map(stateGrade => {
          return stateGrade.id !== resGrade.id
            ? stateGrade
            : resGrade;
        }),
        gradeToEditId: null
      }))
      .catch(error => console.error(error));
  }

  setGradeToEdit(gradeId) {
    this.setState({
      grades: this.state.grades,
      gradeToEditId: gradeId
    });
  }

  getGradeToEdit() {
    return this.state.grades.find(grade => grade.id === this.state.gradeToEditId) || null;
  }

  getAverageGrade() {
    const { grades } = this.state;
    const sum = grades.reduce((accumulator, grade) => {
      return accumulator + grade.grade;
    }, 0);

    return grades.length ? Math.ceil(sum / grades.length) : 0;
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <Header avg={this.getAverageGrade()}/>
        </div>
        <div className="row">
          <div className="pl-0 col-lg-8 col-md-12">
            <GradeTable
              grades={this.state.grades}
              deleteGrade={this.deleteGrade}
              setGradeToEdit={this.setGradeToEdit}
            />
          </div>
          <div className="pr-0 col-lg-4 col-md-12">
            <GradeForm
              onSubmit={this.addGrade}
              editGrade={this.editGrade}
              getGradeToEdit={this.getGradeToEdit}
              setGradeToEdit={this.setGradeToEdit}
              gradeToEditId={this.state.gradeToEditId}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
