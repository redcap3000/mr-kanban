import React, { Component, PropTypes } from 'react';
import { Lanes } from '../api/lanes.js';
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
 
  drop(e) {
    e.preventDefault();
    var lane = Lanes.findOne();
    if(lane && lane.contact != this.props.contact._id){
      // I should be using state object
      Lanes.update(lane._id,{ $set : {contact : this.props.contact._id }});
    }
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
      <li draggable='true' className={contactClassName} onDrag={this.drop.bind(this)}>
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
      </li>
    );
  }
}

Contact.propTypes = {
  contact: PropTypes.object.isRequired,
};