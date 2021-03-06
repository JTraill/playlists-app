import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import queryString from 'query-string';

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
        <input type="text" onKeyUp={event => 
          this.props.onTextChange(event.target.value)}/> Filter
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
    this.state={
      serverData: {},
      filterString: ''
    }
  }
  componentDidMount(){
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;
    if (!accessToken)
      return;
    fetch('https://api.spotify.com/v1/me', {
      headers: {'Authorization': 'Bearer ' + accessToken}
    }).then(response => response.json())
    .then(data => this.setState({
      user: {
        name: data.display_name
      }
    }))

    fetch('https://api.spotify.com/v1/me/playlists', {
      headers: {'Authorization': 'Bearer ' + accessToken}
    }).then(response => response.json())
    .then(data => this.setState({
      playlists: data.items.map(item => {
        console.log(data.items)
        return {
          name: item.name,
          imageUrl: item.images[0].url, 
          songs: []
        }
    })
    }))
  }
  render() {
    let playlistToRender = 
      this.state.user && 
      this.state.playlists 
        ? this.state.playlists.filter(playlist => 
          playlist.name.toLowerCase().includes(
            this.state.filterString.toLowerCase())) 
        : []
    return (
      <div className="App">
        {this.state.user ?
        <div>
          <h1 style={{...defaultStyle, 'font-size': '54px'}}>
            {this.state.user.name}'s Playlists
          </h1>
          <PlaylistCounter playlists={playlistToRender}/>
          <HoursCounter playlists={playlistToRender}/>
          <Filter onTextChange={text => {
              this.setState({filterString: text})
            }}/>
          {playlistToRender.map(playlist => 
            <Playlist playlist={playlist} />
          )}
        </div> : <div><h3>Sign in With Spotify</h3><button className="btn btn-primary" onClick={() => {
            window.location = window.location.href.includes('localhost') 
              ? 'http://localhost:8888/login' 
              : 'https://playlists-app-backend.herokuapp.com/login' }
          }
          >Sign in</button></div>
        }
      </div>
    );
  }
}

export default App;