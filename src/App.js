import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

let fakeServerData = {
  user:{
    name:'Josh',
    playlists: [
      {
        name:'Favorites',
        songs:[
          {name: 'a', duration:12345},
          {name: 'b', duration:12345},
          {name: 'c', duration:12345}
        ]
      },
      {
        name:'Discover daily',
        songs:[
          {name: 'a', duration:12345},
          {name: 'b', duration:12345},
          {name: 'c', duration:12345}
        ]
      },
      {
        name:'Discover weekly',
        songs:[
          {name: 'a', duration:12345},
          {name: 'b', duration:12345},
          {name: 'c', duration:12345}
        ]
      },
      {
        name:'Discover monthly',
        songs:[
          {name: 'a', duration:12345},
          {name: 'b', duration:12345},
          {name: 'c', duration:12345}
        ]
      }
    ]
  }
};

let textColor = '#000';
let defaultStyle={
  color:textColor
};

class PlaylistCounter extends Component{
  render(){
    return (
      <div style={{...defaultStyle, display:'inline-block', width:'40%'}}>
        <h2>{this.props.playlists.length} playlists</h2>
      </div>
    );
  }
}

class HoursCounter extends Component{
  render(){
    let allSongs = this.props.playlists.reduce((songs, eachPlaylist) => {
      return songs.concat(eachPlaylist.songs)
    }, []);
    let totalDuration = allSongs.reduce((sum, eachSong) => {
      return sum + eachSong.duration
    }, 0);
    return (
      <div style={{...defaultStyle, display:'inline-block', width:'40%'}}>
        <h2>{Math.round(totalDuration/60)} hours</h2>
      </div>
    );
  }
}

class Filter extends Component{
  render(){
    return(
      <div style={{...defaultStyle}}>
        <img/>
        <input type="text"/> Filter
      </div>
    );
  }
}

class Playlist extends Component{
  render(){
    let playlist = this.props.playlist;
    return(
      <div style={{...defaultStyle, width:'25%', display:'inline-block'}}>
        <img/>
        <h3>{playlist.name}</h3>
        <ul style={{...defaultStyle}}>
          {playlist.songs.map(song=>
            <ol>{song.name}</ol>
            )}
        </ul>
      </div>
    )
  }
}

class App extends Component {
  constructor(){
    super();
    this.state={serverData: {}}
  }
  componentDidMount(){
    setTimeout(()=>{
      this.setState({serverData: fakeServerData});
    }, 1000);
  }
  render() {
    return (
      <div className="App">
      {this.state.serverData.user  ?
      <div>
      <h1 style={{...defaultStyle, 'font-size': '54px'}}>
        {this.state.serverData.user.name}'s Playlists</h1>

      <PlaylistCounter playlists={this.state.serverData.user.playlists}></PlaylistCounter>
      <HoursCounter playlists={this.state.serverData.user.playlists}></HoursCounter>
      <Filter/>
        {this.state.serverData.user.playlists.map(playlist =>
        <Playlist playlist={playlist}/>
        )}

      </div> : <h2 style={{...defaultStyle}}>Loading...</h2>
      }
      </div>
    );
  }
}

export default App;
