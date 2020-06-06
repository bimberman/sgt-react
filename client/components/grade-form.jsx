import React from 'react';

export default class GradeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      course: '',
      grade: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit({
      name: this.state.name,
      course: this.state.course,
      grade: this.state.grade
    });
    this.resetForm();
  }

  handleReset() {
    event.preventDefault();
    this.resetForm();
  }

  resetForm() {
    this.setState({
      name: '',
      course: '',
      grade: ''
    });
  }

  render() {
    const { name: nameValue, course: courseValue, grade: gradeValue } = this.state;
    return (
      <form>
        <div className="form-group">
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <i className="input-group-text fas fa-user" aria-hidden="true"></i>
            </div>
            <input value={nameValue} onChange={this.handleChange} type="text" className="form-control" required placeholder="Name" name="name"/>
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <i className="input-group-text fas fa-list-alt" aria-hidden="true"></i>
            </div>
            <input value={courseValue} onChange={this.handleChange} type="text" className="form-control" required placeholder="Course" name="course"/>
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <i className="input-group-text fas fa-graduation-cap" aria-hidden="true"></i>
            </div>
            <input value={gradeValue} onChange={this.handleChange} type="text" className="form-control" required placeholder="Grade" name="grade"/>
          </div>
          <div className="input-group mb-3 justify-content-start">
            <button onClick={this.handleSubmit} type="submit" className="btn btn-outline-success mr-4 col-3">Add</button>
            <button onClick={this.handleReset} type="reset" className="btn btn-outline-dark col-3">Cancel</button>
          </div>
        </div>
      </form>
    );
  }
}
