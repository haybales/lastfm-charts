import React, { Component } from 'react';

export default class ChartDisplay extends Component {

  constructor(){
    super();
    this.state={
      from: 1108296000,
      to: 1498392000
    }
  }

  getArtistsFromDates = (lists, from, to) => {
    var artists = [];

    for(var i=0; i<lists.length; i++){
      for(var j=0; j<lists[i].artist.length; j++){
        if(artists.indexOf(lists[i].artist[j].name)===-1 && lists[i]["@attr"].from>=from && lists[i]["@attr"].to<=to){
          artists.push(lists[i].artist[j].name)
        }
      }
    }
    return artists.sort();
  }


  times = () => {
    return(
      <ul>
      {this.getArtistsFromDates(this.props.artistLists, this.state.from, this.state.to).map((artist) => {
        return(
          <li>{artist}</li>
        );
      })}
      </ul>
    );
  }




  render(){
    return(
      <div className="container">
        <h2>User: {this.props.artistLists[0]["@attr"].user}</h2>
        <p>Start date: </p>
        <p>End date: </p>
        {this.times()}
      </div>
    );
  };


}
