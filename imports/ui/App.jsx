import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

import { Contacts } from '../api/contacts.js';

import Contact from './Contact.jsx';

// App component - represents the whole app
class App extends Component {
  handleSubmit(event) {
    event.preventDefault();
 
    // Find the text field via the React ref
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
 
    Contacts.insert({
      text,
      createdAt: new Date(), // current time
    });
 
    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }
  renderContacts() {
    return this.props.contacts.map((contact) => (
      <Contact key={contact._id} task={contact} />
    ));
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>Contacts Board</h1>

          <form className="new-contact" onSubmit={this.handleSubmit.bind(this)} >
            <input
              type="text"
              ref="textInput"
              placeholder="Type to add new contacts"
            />
          </form>
        </header>

        <ul>
          {this.renderContacts()}
        </ul>
      </div>
    );
  }
}

App.propTypes = {
  contacts: PropTypes.array.isRequired,
};

export default createContainer(() => {
  return {
    contacts: Contacts.find({}).fetch(),
  };
}, App);