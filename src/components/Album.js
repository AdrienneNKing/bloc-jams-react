import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import albumData from '../data/albums';
import PlayerBar from './PlayerBar';


class Album extends Component {
  constructor(props) {
    super(props);

    const album = albumData.find( album => {
      return album.slug === this.props.match.params.slug
    });

    this.state = {
      album: album,
      currentSong: album.songs[0],
      currentTime: 0,
      duration: album.songs[0].duration,
      volume: 0.1,
      isPlaying: false,
      isHovered: null,
    };
    this.audioElement = document.createElement('audio');
    this.audioElement.src = album.songs[0].audioSrc;
  }

  componentDidMount() {
    this.eventListeners = {
      timeupdate: e => {
        this.setState({ currentTime: this.audioElement.currentTime });
      },
      durationchange: e => {
        this.setState({ duration: this.audioElement.duration });
      },

      volumechange: e => {
        this.setState({ volume: this.audioElement.volume });
      }
    };
    this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
    this.audioElement.addEventListener('volumechange', this.eventListeners.volumechange);
  }

  componentWillUnmount() {
    this.audioElement.src = null;
    this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
    this.audioElement.removeEventListener('volumechange', this.eventListeners.durationchange);
  }

  play() {
    this.audioElement.play();
    this.setState({ isPlaying: true });
  }

  pause() {
    this.audioElement.pause();
    this.setState({ isPlaying: false});
  }

  setSong(song) {
    this.audioElement.src = song.audioSrc;
    this.setState({ currentSong: song});
  }

  handleSongClick(e, song) {
    e.preventDefault();

    const isSameSong = this.state.currentSong === song;
    if (this.state.isPlaying && isSameSong) {
      this.pause();
    } else{
      if (!isSameSong) {this.setSong(song);}
      this.play();
    }
  }

handlePrevClick() {
  const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
  const newIndex = Math.max(0, currentIndex - 1);
  const newSong = this.state.album.songs[newIndex];
  this.setSong(newSong);
  this.play();
}

handleNextClick() {
  const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
  const newIndex = Math.max(0, currentIndex + 1);
  const newSong = this.state.album.songs[newIndex];
  this.setSong(newSong);
  this.play();
}

handleTimeChange(e) {
  const newTime = this.audioElement.duration * e.target.value;
  this.audioElement.currentTime = newTime;
  this.setState({ currentTime: newTime });
}

formatTime(time) {
  Math.floor(time / 3600)
  time %= 3600
  const formattedMinutes = parseInt(time / 60);
  const formattedSeconds = parseInt(time % 60);
  const formattedTime = ('0' + formattedMinutes).slice(-2)+':'+('0' + formattedSeconds).slice(-2);
  return ((time === NaN) ? "-:--" : formattedTime);
};

handleVolumeChange(e) {
  this.audioElement.volume = parseFloat(e.target.value);
  this.setState({ volume: e.target.value });
}

  renderNumber(song, songNumber) {
    var isSameSong = this.state.currentSong ===song;
    if (this.state.isHovered && this.state.isHovered.audioSrc === song.audioSrc) {
      if (this.state.isPlaying && isSameSong) {
        return (<span className="ion-pause"></span>);
      }
      if (this.state.isPaused && isSameSong) {
        return (<span className="ion-pause"></span>);
       } else {
        return (<span className="ion-play"></span>);
      }
    }

    return songNumber;
  }

  handleSongHover(song) {
    this.setState({
      isHovered: song
    });
  }

  render() {
    return (
      <section className="album">
        <section id="album-info">
          <img id= "album-cover-art" src={this.state.album.albumCover} alt={this.state.album.title}/>
          <div className="album-details">
            <h1 id="album-title">{this.state.album.title}</h1>
            <h2 className="artist">{this.state.album.artist}</h2>
            <div id="release-info">{this.state.album.releaseInfo}</div>
          </div>
        </section>
        <table id="song-list">
          <colgroup>
            <col id="song-number-column" />
            <col id="song-title-column" />
            <col id="song-duration-column" />
          </colgroup>
          <tbody id="songs-table-body">
          {this.state.album.songs.map((song, index) =>
            <tr key={index}
                onClick={(e) => this.handleSongClick(e, song)}
                onMouseEnter={() => this.handleSongHover(song)}
                onMouseLeave={() =>this.handleSongHover(song)}
            >
              <td>{this.renderNumber(song, index + 1)}</td>
              <td>{song.title}</td>
              <td>{this.formatTime(song.duration)}</td>
            </tr>
          )}
          </tbody>
        </table>
        <PlayerBar
          isPlaying={this.state.isPlaying}
          currentSong={this.state.currentSong}
          currentTime={this.audioElement.currentTime}
          currentVolume={this.audioElement.currentVolume}
          duration={this.audioElement.duration}
          volume={this.audioElement.volume}
          handleSongClick={(e) => {this.handleSongClick(e, this.state.currentSong)}}
          handlePrevClick={() => this.handlePrevClick()}
          handleNextClick={() => this.handleNextClick()}
          handleTimeChange={(e) => this.handleTimeChange(e)}
          handleVolumeChange={(e) => this.handleVolumeChange(e)}
          formatTime={(time) => this.formatTime(time)}
        />

      </section>
    );
  }
}


export default Album;
