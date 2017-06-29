import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Header from './components/Header';
import ChartDisplay from './components/ChartDisplay';

class App extends Component {
  constructor(){
    super();
    this.state={
      times: [],
      artistlists: [],
      user: '',

    };
  }

  performSearch = (query) => {
    this.setState({
      times: this.state.times,
      artistlists: [],
      user: query
    })
    axios.get(`http://ws.audioscrobbler.com/2.0/?method=user.getweeklychartlist&user=${query}&api_key=5f17236cccd1cdd39a4c02e7701a0173&format=json`)
    .then(response => {
      this.setState({
        times: response.data.weeklychartlist.chart,
        artistLists: this.state.artistLists,
        user: this.state.user
      });
      this.getArtistLists(query);
    })
    .catch(error => {
      console.log(error);
    });
  }

  getArtistLists=(query)=> {
    let lists=[];
    let reqlist=[];
    for(var i = 0; i<this.state.times.length; i++){
      reqlist.push(axios.get(`http://ws.audioscrobbler.com/2.0/?method=user.getweeklyartistchart&user=${query}&from=${this.state.times[i].from}&to=${this.state.times[i].to}&api_key=5f17236cccd1cdd39a4c02e7701a0173&format=json`));
    }
    axios.all(reqlist)
    .then(function(list){
      for (var i = 0; i < list.length; i++) {
        lists.push(list[i].data.weeklyartistchart);
      };
    }).then(() => {
      console.log(lists);
      this.setState({
        times: this.state.times,
        artistlists: lists,
        user: this.state.user
      });
    }).catch(error => {
      console.log(error);
    });
  }

  render() {
    return (
      <div className="lastfmcharts">
        <Header onSearch={this.performSearch.bind(this)}/>
        {this.state.times.length===0 ?
          <p className="no-search">Enter a username above</p>
          : (this.state.artistlists.length===0 ? <p className="no-search loading">Loading data...</p>  : <ChartDisplay artistLists={this.state.artistlists} />)}
      </div>
    );
  }
}

export default App;
