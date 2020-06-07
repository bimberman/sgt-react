import React from 'react';

export default class GradeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      course: '',
      grade: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
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
      grade: Number.parseInt(this.state.grade)
    });
    this.resetForm();
  }

  handleEdit(event) {
    event.preventDefault();
    this.props.editGrade({
      name: this.state.name,
      course: this.state.course,
      grade: Number.parseInt(this.state.grade)
    });
    this.setState(state => ({
      name: '',
      course: '',
      grade: 0
    }));
    this.resetForm();
  }

  componentDidUpdate(prevProps) {
    if (this.props.gradeToEditId !== null &&
        this.props.gradeToEditId !== prevProps.gradeToEditId) {
      this.editGrade(this.props.getGradeToEdit());
    }
  }

  editGrade(grade) {
    this.setState({
      name: grade.name,
      course: grade.course,
      grade: grade.grade
    });
  }

  handleReset() {
    event.preventDefault();
    this.props.setGradeToEdit(null);
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
    let submitButton = <button onClick={this.handleSubmit} type="submit" className="btn btn-outline-success mr-4 col-3">Add</button>;
    if (this.props.gradeToEditId !== null) {
      submitButton = <button onClick={this.handleEdit} type="submit" className="btn btn-outline-info mr-4 col-3">Edit</button>;
    }
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
            <input value={gradeValue} onChange={this.handleChange} type="number" className="form-control" required placeholder="Grade" name="grade"/>
          </div>
          <div className="input-group mb-3 justify-content-start">
            {submitButton}
            <button onClick={this.handleReset} type="reset" className="btn btn-outline-dark col-3">Cancel</button>
          </div>
        </div>
      </form>
    );
  }
}
