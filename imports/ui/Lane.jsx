import React, { Component, PropTypes } from 'react';

import { Lanes } from '../api/lanes.js';
import { Contacts } from '../api/contacts.js';

// Task component - represents a single todo item
export default class Lane extends Component {
  constructor(props){
    super(props);
  }

  render() {
    
    // Give tasks a different className when they are checked off,
    // so that we can style them nicely in CSS
    //const laneClassName = this.props.lane.id;
    var title = 'Lane 1'
    return (
          <li><h1>{this.props.title}</h1></li>
    );
  }
}

Lane.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  title: PropTypes.string.isRequired,
};