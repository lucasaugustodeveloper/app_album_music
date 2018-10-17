import React, { Component } from 'react'
import axios from 'axios'
import Albums from './Albums'
import AlbumCreate from "./AlbumCreate";

export default class PageAlbums extends Component {
  constructor() {
    super();

    this.state = {
      albums: [],
      album: '',
      artist: ''
    };
  }

  componentDidMount () {
    axios.get('http://localhost:3333/albums')
      .then(res => this.setState({ albums: res.data }))
      .catch(error => {
        console.log(error);
      });
  }

  handlerInputChange = ({ target }) => {
    this.setState({ [ target.name ]: target.value })
  }

  handlerSubmit = () => {
    const { album, artist } = this.state

    if (album === '' || artist === '') return

    axios.post('http://localhost:3333/albums', { album, artist })
      .then(res => this.setState(prev => ({
        albums: [res.data, ...prev.albums],
        artist: '',
        album: ''
      })))
      .catch(error => console.log(error))
  }

  handlerDelete = (id) => {
    if (!window.confirm('Deseja realmente excluir?')) return

    axios
      .delete(`http://localhost:3333/albums/${id}`, {})
      .then(res => this.setState({
        albums: this.state.albums.filter(album => album.id !== id)
      }))
      .catch(error => console.log(error));
  }
  render() {
    const { albums, artist, album } = this.state

    return (
      <div className="container">
        <AlbumCreate artist={artist} album={album}
          handlerInputChange={this.handlerInputChange}
          handlerSubmit={this.handlerSubmit}
        />

        <div className="columns">
          <Albums albums={albums} handlerDelete={this.handlerDelete} />
        </div>
      </div>
    );
  }
}
