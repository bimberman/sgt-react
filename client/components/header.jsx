import React from 'react';

export default class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <header className="container-fluid w-75 mt-5 mb-4" id="header">
        <h1>
        Student Grade Table
        </h1>
      </header>
    );
  }
}
