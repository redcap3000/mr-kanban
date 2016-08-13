import React, { Component, PropTypes } from 'react';
import { Contacts } from '../api/contacts.js';

export default class Contact extends Component {
  toggleChecked() {
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
  changeFirstName(e){
    if (e.target.value != ''){
      if(Contacts.update(this.props.contact._id, {
        $set: { firstName: e.target.value }
        })){
        return true;
      }else{
        alert("Something went wrong.");
      }
    }
    return false;
  }
  changeLastName(e){
    if (e.target.value != ''){
      if(Contacts.update(this.props.contact._id, {
        $set: { lastName: e.target.value }
        })){
        return true;
      }else{
        alert("Something went wrong.");
      }
    }
    return false;
  }
  render() {
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
        
        <span className="text">{this.props.contact.firstName}</span>
        <span className="text">{this.props.contact.lastName}</span>

            <input
              type="text"
              ref="firstName"
              placeholder="First Name"
              value={this.props.contact.firstName}
              onChange={this.changeFirstName.bind(this)}
            />
             <input
              type="text"
              ref="lastName"
              placeholder="Last Name"
              value={this.props.contact.lastName}
              onChange={this.changeLastName.bind(this)}
            />
            <select ref="lane" onChange={this.changeLane.bind(this)}>
              <option value=''>Change Lane</option>
              <option>new</option>
              <option>in progress</option>
              <option>completed</option>
            </select>
            

      </li>
    );
  }
}

Contact.propTypes = {
  contact: PropTypes.object.isRequired,
};