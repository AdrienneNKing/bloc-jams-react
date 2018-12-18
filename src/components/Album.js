import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import albumData from '../data/albums';


class Album extends Component {
  constructor(props) {
    super(props);

    const album = albumData.find( album => {
      return album.slug === this.props.match.params.slug
    });

    this.state = {
      album: album,
      currentSong: album.songs[0],
      isPlaying: false,
      isHovered: null,
    };
    this.audioElement = document.createElement('audio');
    this.audioElement.src = album.songs[0].audioSrc;
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

  handleSongClick(song) {
    const isSameSong = this.state.currentSong === song;
    if (this.state.isPlaying && isSameSong) {
      this.pause();
    } else{
      if (!isSameSong) {this.setSong(song);}
      this.play();
    }
  }

  renderNumber(song, songNumber) {
    var isSameSong = this.state.currentSong ===song;
    if (this.state.isHovered && this.state.isHovered.audioSrc === song.audioSrc) {
      if (this.state.isPlaying && isSameSong) {
        return (<ion-icon name="pause" />);
      }
      if (this.state.isPaused && isSameSong) {
        return (<ion-icon name="pause" />);
       } else {
        return (<ion-icon name="play" />);
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
              {
              this.state.album.songs.map( (song, index) =>
                <Link to={`songs/${song.index}`}
                key={index}
                onClick={() => this.handleSongClick(song)}
                onMouseEnter={() => this.handleSongHover(song)}
                onMouseLeave={() =>this.handleSongHover(song)}>
                  <div id="songs-table-div">
                    <tr>{this.renderNumber(song, index + 1)}</tr>
                    <tr>{song.title}</tr>
                    <tr>{song.duration}</tr>
                  </div>
                </Link>
                  )
                  }
          </tbody>
        </table>
      </section>
    );
  }
}


export default Album;
