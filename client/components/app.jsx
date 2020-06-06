
import React from 'react';
import Header from './header';
import GradeTable from './grade-table';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grades: []
    };
  }

  componentDidMount() {
    fetch('/api/grades')
      .then(res => res.json())
      .then(grades => this.setState({ grades: grades }))
      .catch(error => console.error(error));
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <Header/>
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
