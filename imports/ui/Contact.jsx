import React, { Component, PropTypes } from 'react';
import { Contacts } from '../api/contacts.js';

// Task component - represents a single todo item
export default class Contact extends Component {
  toggleChecked() {
    // Set the checked property to the opposite of its current value
    Contacts.update(this.props.contact._id, {
      $set: { checked: !this.props.contact.checked }
    });
  }

  deleteThisContact() {
    Contacts.remove(this.props.contact._id);
  }

  changeLane(e){
    if (e.target.value != ''){
      if(Contacts.update(this.props.contact._id, {
        $set: { laneTitle: e.target.value }
        })){
        return true;
      }else{
        alert("Something went wrong.");
      }
    }
    return false;
  }
  
  render() {
    // Give tasks a different className when they are checked off,
    // so that we can style them nicely in CSS
    const contactClassName = this.props.contact.checked ? 'checked' : '';

    return (
      <li className={contactClassName}>
        <button className="delete" onClick={this.deleteThisContact.bind(this)}>
          &times;
        </button>

        <input
          type="checkbox"
          readOnly
          checked={this.props.contact.checked}
          onClick={this.toggleChecked.bind(this)}
        />
        <select ref="lane" onChange={this.changeLane.bind(this)}>
          <option value=''>Change Lane</option>
          <option>new</option>
          <option>in progress</option>
          <option>completed</option>
        </select>
        <span className="text">{this.props.contact.firstName}</span>
        <span className="text">{this.props.contact.lastName}</span>

      </li>
    );
  }
}

Contact.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  contact: PropTypes.object.isRequired,
};