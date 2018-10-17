import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import AddSong from './AddSong'

class Album extends Component {
  constructor () {
    super()

    this.state = {
      album: [],
      song: '',
      image: '',
      previewImage: ''
    }
  }

  componentDidMount () {
    const album = this.props.match.params.id;

    axios.get(`http://localhost:3333/albums/${album}`)
      .then(res => this.setState({ album: res.data }))
      .catch(error => console.log(error))
  }

  componentWillUnmount() {
    const { image } = this.state

    if (image !== '') {
      if (window.confirm('Deseja salvar as alterações')) {
        this.handlerSubmitImageAlbum()
      }
    }
  }

  handlerAddSong = () => {
    const { song, album } = this.state

    if (song !== '') {
      axios
        .post(`http://localhost:3333/albums/${album.id}/song/add`, { song })
        .then(res => this.setState(prev => ({
          album: {
            ...prev.album,
            songs: [...prev.album.songs, res.data]
          },
          song: ''
        })))
        .catch(error => console.log(error));
    }
  }

  handlerDelete = id => {
    if (!window.confirm('Deseja realmente excluir?')) return

    axios.delete(`http://localhost:3333/song/${id}`)
      .then(res => this.setState(prev => ({
        album: {
          ...prev.album,
          songs: [...prev.album.songs.filter(song => song.id !== id)]
        }
      })))
      .catch(error => console.log(error))
  }

  handlerChange = ({ target }) => {
    if (target.name === 'image') {
      this.setState({ [target.name]: target.files[0] })

      const reader = new FileReader()

      reader.readAsDataURL(target.files[0])

      reader.onloadend = () => {
        this.setState({ previewImage: reader.result })
      }

    }

    if (target.name !== 'image') {
      this.setState({ [target.name]: target.value })
    }

  }

  handlerSubmitImageAlbum = () => {
    const { album, image } = this.state

    const formData = new FormData()

    formData.append('album_image', image)

    axios.put(`http://localhost:3333/albums/${album.id}/photo`, formData)
      .then(res => this.setState({ previewImage: res.data.image, image: '' }))
      .catch(error => console.log(error))
  }

  render() {
    const { album, song, previewImage } = this.state

    let loadImage = previewImage ? previewImage : album.image

    return <div className="box">
        <h1 className="title">
          Detalhes do Álbum
          <small>
            <Link to="/">
              <i className="fas fa-long-arrow-alt-left" />
            </Link>
          </small>
        </h1>

        <div className="columns">
          <div className="column">
            <div className="field is-grouped">
              <div className="file control">
                <label className="file-label">
                  <input type="file" className="file-input" name="image" onChange={this.handlerChange} />
                  <span className="file-cta">
                    <span className="file-icon">
                      <i className="fas fa-upload" />
                    </span>
                    <span className="file-label">Escolher imagem</span>
                  </span>
                </label>
              </div>

              <button className="button is-info control" onClick={this.handlerSubmitImageAlbum}>Atualizar</button>
            </div>

            <div>
              <img src={loadImage} alt="" className="image" />
            </div>
          </div>

          <div className="column">
          <AddSong song={song} handlerChange={this.handlerChange}
            handlerAddSong={this.handlerAddSong}
          />
            {album.songs ? album.songs.map((song, idx) => (
              <p key={song.id}>
                {idx + 1}. {song.name}
                <span className="icon has-text-danger" onClick={() => this.handlerDelete(song.id)}>
                  <i className="fas fa-trash-alt" />
                </span>
              </p>
            )) : null}
          </div>
        </div>
      </div>;
  }
}

export default Album
