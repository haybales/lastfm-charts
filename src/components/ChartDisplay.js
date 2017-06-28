import React, { Component } from 'react';
var LineChart = require("react-chartjs").Line;

export default class ChartDisplay extends Component {


  constructor(props){
    super(props);
    this.state={
      from: 1494158400,
      to: 1497787200,
      theList: this.cullList(props.artistLists, 1494158400, 1497787200)
    }
  }



  cullList = (bigList, from, to)=>{
    var final=[];
    for(var i=0; i<bigList.length; i++){
      if(bigList[i]["@attr"].from>=from && bigList[i]["@attr"].from<=to){
        final.push(bigList[i]);
      }
    }
    console.log("culled the list.");
    return final;
  }

  getArtists = () => {
    var artists = [];

    for(var i=0; i<this.state.theList.length; i++){
      for(var j=0; j<5; j++){
        if(this.state.theList[i].artist[j]){
          if(artists.indexOf(this.state.theList[i].artist[j])<0){
            artists.push(this.state.theList[i].artist[j].name)
          }
        }
      }
    }
    console.log("got the artist name list.");
    return artists;
  }



  scoreArrayForArtist(artistName){
    var results = []
    for(var i=0; i<this.state.theList.length; i++){
      var num = 0;
      for(var j=0; j<5; j++){
        if(this.state.theList[i].artist[j]){
          if(this.state.theList[i].artist[j].name === artistName){
            num = 5-j;
          }
        }
      }
      results.push(num);
    }
    console.log("got score for "+artistName+": length: "+results.length);
    return results;
  }

  datasetGenerator(artistNames){
    var datasets=[];
    for(var i=0; i<artistNames.length; i++){
      datasets.push({
        label: artistNames[i],
        fillColor: 'rgba(255, 99, 132, 0)',
        strokeColor: this.getRandomColor(),
        data: this.scoreArrayForArtist(artistNames[i]),
      });
    }
    console.log("Generated data sets:");
    console.log(artistNames);
    console.log("length: "+datasets.length);
    return datasets;
  }

  getRandomColor=()=>{
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  getTimes=()=>{
    var times=[];
    for(var i=0;i<this.state.theList.length; i++){
        times.push(this.state.theList[i]["@attr"].from);
    }
    return times;
  }


  times = () => {
    var datasets = this.datasetGenerator(this.getArtists());
    return(
      <LineChart data={{
        labels: this.getTimes(this.state.from, this.state.to),
        datasets: datasets,
        tooltips: {
          mode: 'label'
        }
      }} width="800" height="600" />
    );
  }




  render(){
    return(
      <div className="container">
        {this.times()}
      </div>
    );
  };


}
