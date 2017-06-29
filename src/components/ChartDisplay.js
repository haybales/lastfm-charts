import React, { Component } from 'react';
import Chart from 'chart.js';
import SubHeader from './SubHeader';



export default class ChartDisplay extends Component {


  constructor(props){
    super(props);
    this.state={
      from: 1494158400,
      to: 1497787200,
      theList: this.cullList(props.artistLists, 1494158400, 1497787200),
      ctx: "",
      lines: "",
      top: 10
    }
  }




  componentDidMount(){
    this.state.ctx = this.refs.chart.getContext('2d');
    const data = {
      labels: this.getTimes(this.state.from, this.state.to),
      datasets: this.datasetGenerator(this.getArtists())
    }
    const options = {
      responsive: true,
      maintainAspectRatio: true,
      datasetFill: false,
      scales: {
        yAxes: [{
          ticks: {
            reverse: true
          }
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
            mode: 'point',
        }
    }
    this.state.lines = new Chart(this.state.ctx, {
      type: 'line',
      data: data,
      options: options
    })

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
      for(var j=0; j<this.state.top; j++){
        if(this.state.theList[i].artist[j]){
          if(artists.indexOf(this.state.theList[i].artist[j])<0){
            artists.push(this.state.theList[i].artist[j].name)
          }
        }
      }
    }

    let uniq = a => [...new Set(a)];
    console.log("got the artist name list: "+uniq(artists));
    return uniq(artists);
  }



  scoreArrayForArtist(artistName){
    var results = []
    for(var i=0; i<this.state.theList.length; i++){
      var num = null;
      for(var j=0; j<this.state.top; j++){
        if(this.state.theList[i].artist[j]){
          if(this.state.theList[i].artist[j].name === artistName){
            num = j+1;
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
      var color = this.getRandomColor()
      datasets.push({
        label: artistNames[i],
        borderColor: color,
        pointBackgroundColor: color,
        pointHitRadius: 20,
        cubicInterpolationMode: 'default',
        lineTension: 0.3,
        fill: false,
        steppedLine: false,
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
        times.push(this.timeConverter(this.state.theList[i]["@attr"].from));
    }
    return times;
  }

  timeConverter=(UNIX_timestamp)=>{
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var time = month + ' ' + date + ' ' + year ;
    return time;
  }



componentDidUpdate(){
  this.state.ctx = this.refs.chart.getContext('2d');
  const data = {
    labels: this.getTimes(this.state.from, this.state.to),
    datasets: this.datasetGenerator(this.getArtists())
  }
  const options = {
    responsive: true,
    maintainAspectRatio: true,
    datasetFill: false,
    scales: {
      yAxes: [{
        ticks: {
          reverse: true
        }
      }],
    },
    legend: {
      display: false
    },
    tooltips: {
          mode: 'point'
      }
  }

  this.state.lines.destroy();
  this.state.lines = new Chart(this.state.ctx, {
    type: 'line',
    data: data,
    options: options
  })
}

  times = () => {
    return(
      <canvas className="chart" ref="chart" />
    );
  }

  changeFrom = (time) => {
    this.setState({
      ...this.state,
      theList: this.cullList(this.props.artistLists, time, this.state.to),
      from: time
    });


  }
  changeTo = (time) => {
    this.setState({
      ...this.state,
      theList: this.cullList(this.props.artistLists, this.state.from, time),
      to: time
    });
  }

  render(){
    return(
      <div className="container">
        <SubHeader changeFrom={this.changeFrom} changeTo={this.changeTo} user={this.props.artistLists[0]["@attr"].user} from={this.state.from} to={this.state.to} />
        {this.times()}
      </div>
    );
  };


}
