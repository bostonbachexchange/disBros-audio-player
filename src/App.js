import React, { useState } from 'react';
import './App.css';
import Keys from './assets/keys.png'
import GroupOne from './assets/Group-One.mp3'

const allSongs = [
  {
    id: 0,
    title: "Perkins Recordings",
    artist: "Group One",
    duration: "23:06",
    src: GroupOne,
  },

  // Add more songs as needed
];



function App() {
  const [audio] = useState(new Audio());
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTitle, setCurrentTitle] = useState("");
  const [currentArtist, setCurrentArtist] = useState("");

  function Playlist({ playSong }) {
    return (
      <div className="playlist">
        <h2 className="playlist-title">Playlist</h2>
        <ul id="playlist-songs">
          {
            allSongs.map((song) => (
            <li 
            className={`playlist-song ${currentSongIndex === song.id ? "current-song" : ""}`}
            >
              <button className="playlist-song-info" onClick={() => playSong(song.id)}>
                <span className="playlist-song-title">{song.title}</span>
                <span className="playlist-song-artist">{song.artist}</span>
                <span className="playlist-song-duration">{song.duration}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  const playSong = (id) => {
    const song = allSongs.find((song) => song.id === id);
    if(currentTitle === song.title){
      audio.play();
      setIsPlaying(true);
    } else{
      audio.src = song.src;
      audio.title = song.title;
      audio.currentTime = 0;
      audio.play();
      setIsPlaying(true);
      setCurrentTitle(song.title);
      setCurrentArtist(song.artist);
      setCurrentSongIndex(id); // Update current song index
    }

  };

  const pauseSong = () => {
    audio.pause();
    setIsPlaying(false);
  };

  const playNextSong = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % allSongs.length);
    playSong(allSongs[(currentSongIndex + 1) % allSongs.length].id);
  };

  const playPreviousSong = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex - 1 + allSongs.length) % allSongs.length);
    playSong(allSongs[(currentSongIndex - 1 + allSongs.length) % allSongs.length].id);
  };

  const shuffle = () => {
    const randomIndex = Math.floor(Math.random() * allSongs.length);
    setCurrentSongIndex(randomIndex);
    playSong(allSongs[randomIndex].id);
  };

  return (
    <div className="container">
      <div className="player">
        <div className="player-bar">
          <h2 className="fcc-title">Music Player</h2>
          <div className="player-buttons">
            <button onClick={isPlaying ? pauseSong : () => playSong(allSongs[currentSongIndex].id)}>
              {isPlaying ? <span className="material-icons">pause</span> : <span className="material-icons">play_arrow</span>}
            </button>
            <button onClick={playPreviousSong}>
              <span className="material-icons">skip_previous</span>
            </button>
            <button onClick={playNextSong}>
              <span className="material-icons">skip_next</span>
            </button>
            <button onClick={shuffle}>
              <span className="material-icons">shuffle</span>
            </button>
          </div>
        </div>
        <div className="player-content">
          <div id="player-album-art">
            {/* Album art goes here */}
            <img src={Keys} alt="Album Art" />
          </div>
          <div className="player-display">
            <div className="player-display-song-title">{currentTitle}</div>
            <div className="player-display-song-artist">{currentArtist}</div>
          </div>
        </div>
      </div>
      <Playlist playSong={playSong} />
    </div>
  );
}

export default App;

