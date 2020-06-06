
import React from 'react';
import Header from './header';
import GradeTable from './grade-table';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grades: []
    };
    this.avg = 0;
  }

  componentDidMount() {
    fetch('/api/grades')
      .then(res => res.json())
      .then(grades => this.setState({ grades: grades }))
      .catch(error => console.error(error));
  }

  getAverageGrade() {
    const { grades } = this.state;
    this.avg = grades.reduce((accumulator, grade) => {
      return accumulator + grade.grade;
    }, 0);

    this.avg = grades.length ? Math.ceil(this.avg / grades.length) : 0;
  }

  render() {
    this.getAverageGrade();
    return (
      <div className="container">
        <div className="row">
          <Header average={this.avg}/>
        </div>
        <div className="row">
          <div className="col-lg-8 col-md-12">
            <GradeTable grades={this.state.grades}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
