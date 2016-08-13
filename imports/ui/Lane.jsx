import React, { Component, PropTypes } from 'react';

import { Lanes } from '../api/lanes.js';
import { Contacts } from '../api/contacts.js';

export default class Lane extends Component {
  constructor(props){
    super(props);
  }
  render() {
    var title = 'Lane 1'
    return (
          <li><h1>{this.props.title}</h1></li>
    );
  }
}

Lane.propTypes = {
  title: PropTypes.string.isRequired,
};