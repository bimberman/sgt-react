
import React from 'react';
import Header from './header';
import GradeTable from './grade-table';
import GradeForm from './grade-form';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grades: []
    };
    this.addGrade = this.addGrade.bind(this);
    this.deleteGrade = this.deleteGrade.bind(this);
  }

  componentDidMount() {
    fetch('/api/grades')
      .then(res => res.json())
      .then(grades => this.setState({ grades: grades }))
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
      .then(grade => this.setState({ grades: this.state.grades.concat(grade) }))
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
          grades: this.state.grades.filter(grade => grade.id !== gradeId)
        });
      })
      .catch(error => console.error(error));
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
            <GradeTable grades={this.state.grades} deleteGrade={this.deleteGrade}/>
          </div>
          <div className="pr-0 col-lg-4 col-md-12">
            <GradeForm onSubmit={this.addGrade}></GradeForm>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
