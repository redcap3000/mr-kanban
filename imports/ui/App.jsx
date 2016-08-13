import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

import { Contacts } from '../api/contacts.js';
import { Lanes } from '../api/lanes.js';
import Lane from './Lane.jsx';
import Contact from './Contact.jsx';

// App component - represents the whole app
class App extends Component {
  handleSubmit(event) {
    console.log("submitted");
    event.preventDefault();
 
    // Find the text field via the React ref
    const firstName = ReactDOM.findDOMNode(this.refs.firstName).value.trim();
    const lastName = ReactDOM.findDOMNode(this.refs.lastName).value.trim();
    const laneTitle = ReactDOM.findDOMNode(this.refs.lane).value.trim();;
    Contacts.insert({
      firstName,
      lastName,
      laneTitle,
      createdAt: new Date(), // current time
    });
 
    // Clear form
    ReactDOM.findDOMNode(this.refs.firstName).value = '';
    ReactDOM.findDOMNode(this.refs.lastName).value = '';

  }
  renderContacts(filterTitle) {
    if(typeof filterTitle == "undefined"){
      return false;
    }
    return this.props[filterTitle].map((contact) => (
      <Contact key={contact._id} contact={contact} />
    ));
  }

  render() {
    console.log(this);
    return (
      <div className="container">
        <header>
          <h1>Contacts Board</h1>

          <form className="new-contact" onSubmit={this.handleSubmit.bind(this)} >
            <input
              type="text"
              ref="firstName"
              placeholder="First Name"
            />
             <input
              type="text"
              ref="lastName"
              placeholder="Last Name"
            />
            <select ref="lane">
              <option>new</option>
              <option>in progress</option>
              <option>completed</option>
            </select>
             <input
              type="submit"
            />
          </form>
        </header>

        <ul>
         <Lane title="new" content={this.renderContacts("new")} />
         <Lane title="in progress" content={this.renderContacts("in progress")}/>
         <Lane title="completed" content={this.renderContacts("completed")}/>
        </ul>
      </div>
    );
  }
}

App.propTypes = {
  contacts: PropTypes.array.isRequired
};

export default createContainer(() => {
  return {
    contacts: Contacts.find({}).fetch(),
    new : Contacts.find({laneTitle : 'new'}).fetch(),
    'in progress' : Contacts.find({laneTitle : 'in progress'}).fetch(),
    'completed' : Contacts.find({laneTitle : "completed"}).fetch()
  };
}, App);