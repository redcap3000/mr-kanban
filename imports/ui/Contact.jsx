import React, { Component, PropTypes } from 'react';
import { Lanes } from '../api/lanes.js';
import { Contacts } from '../api/contacts.js';
export default class Contact extends Component {
  constructor (props) {
    super(props);
    this.state = {
      editorStyle : {
        'display' : 'none'
      }
    };
  }
  deleteThisContact() {
    Contacts.remove(this.props.contact._id);
  }
  drag(e) {
    e.preventDefault();
    var lane = Lanes.findOne();
    if(lane && lane.contact != this.props.contact._id){
      // I should be using state object
      this.setState({contact : this.props.contact._id});
      this.setState({editorStyle :  { 'display' : 'none' } });
      console.log(this.state);
      Lanes.update(lane._id,{ $set : {contact : this.props.contact._id }});
    }
  }
  showContextMenu(e){
    e.preventDefault();
    this.setState({editorStyle :  { 'display' : 'block' } });
    return false;
  }
  // attempting to figure out graceful way to hide editor once shown
  // ideally if another editor is present then hide all others  
  hideEditor(e){
    this.setState({editorStyle :  { 'display' : 'none' } });
    return true;
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
      <div onContextMenu={this.showContextMenu.bind(this)} draggable='true' className={contactClassName} onDrag={this.drag.bind(this)}>
        <span className="text">{this.props.contact.firstName}</span>
        <span className="text">{this.props.contact.lastName}</span>
        <div className="editor" style={this.state.editorStyle}>
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
            <button onClick={this.hideEditor.bind(this)}>Hide</button>
            <button className="delete" onClick={this.deleteThisContact.bind(this)}>
              &times;
            </button>

        </div>
      </div>
    );
  }
}

Contact.propTypes = {
  contact: PropTypes.object.isRequired,
};