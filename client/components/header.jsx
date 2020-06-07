import React from 'react';

export default class Header extends React.Component {

  render() {
    return (
      <header className="container-fluid w-100 mt-5 mb-4" id="header">
        <div className="row d-flex justify-content-between">
          <h1>
            Student Grade Table
          </h1>
          <h3 className="text-center">
            Average Grade
            <span className="badge badge-secondary ml-3">{this.props.avg}</span>
          </h3>
        </div>
      </header>
    );
  }
}
