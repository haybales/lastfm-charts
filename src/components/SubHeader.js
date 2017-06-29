import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';


export default class ChartDisplay extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div className="subheader">
        <h2>User: {this.props.user}</h2>
        <div className="pickers">
          <h2>From:</h2>
          <DatePicker
            selected={moment.unix(this.props.from)}
            onChange={(date)=>{this.props.changeFrom(date.unix())}}
          />
          <h2>To:</h2>
          <DatePicker
            selected={moment.unix(this.props.to)}
            onChange={(date)=>{this.props.changeTo(date.unix())}}
          />
        </div>


      </div>
    );
  }
}
