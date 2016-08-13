import React, { Component, PropTypes } from 'react';

import { Contacts } from '../api/contacts.js';
import { Lanes } from '../api/lanes.js';

// Task component - represents a single todo item
export default class Lane extends Component {
  render() {
    // Give tasks a different className when they are checked off,
    // so that we can style them nicely in CSS
    //const laneClassName = this.props.lane.id;

    return (
        <div>
          <h1>Lane</h1>
        </div>
    );
  }
}

Lane.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  lane: PropTypes.object.isRequired,
};