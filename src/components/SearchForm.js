import React from 'react';
import { withRouter } from "react-router-dom";

class SearchForm extends React.Component {
  // The searchText state will get updated on the onSearchChange, when users type input
  state = {
    searchText: ''
  }

  onSearchChange = (event) => {
    this.setState({ searchText: event.target.value});
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.props.history.push(`/search/${this.query.value}`);
    // This way I can pass the searchText to the onSearch function callback and to access it, we will pass onSearch the argumnet this.query.value
    this.props.onSearch(this.query.value);

    // The e.currentTarget.reset() will reset the input field on submit
    event.currentTarget.reset();
  }

  render () {
    return (
      <form className="search-form" onSubmit={this.handleSubmit}>
        <input type="search"
                onChange={this.onSearchChange}
                name="search"
                // This callback {(input) => this.query = input}, will get executed immediately after the componnet is mounted to the DOM
                ref={(input) => this.query = input}
                placeholder="Search..." />
        <button type="submit" id="submit" className="search-button">
          <svg fill="#fff" height="24" viewBox="0 0 23 23" width="24" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            <path d="M0 0h24v24H0z" fill="none"/>
          </svg>
        </button>
      </form>
    );
  }
}

export default withRouter(SearchForm);
