import React, { Component, PropTypes } from 'react';

import { Lanes } from '../api/lanes.js';
import { Contacts } from '../api/contacts.js';
import Contact from './Contact.jsx';
import ReactDOM from 'react-dom';

export default class Lane extends Component {
  constructor (props) {
    super(props);
    Lanes.insert({title : ' '});
  }
  dragOverLane(e){
    var lane = Lanes.findOne();
    if(this.props.title != lane.title){
      Contacts.update(lane.contact,{$set : { laneTitle : this.props.title} });
    }

  }
  // to do for highlighting of column
  isCurrentTitle(e){
    var lane = Lanes.findOne();
    if(lane){
      return (lane.title == this.props.title ? true : false);
    }
  }
  render() {
    return (
          <div className="lane" onDragOver={this.dragOverLane.bind(this)}>
            <h2>{this.props.title}</h2>
            {this.props.content}
          </div>
    );
  }
}
Lane.propTypes = {
  title: PropTypes.string.isRequired,
};