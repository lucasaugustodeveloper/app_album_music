import React from 'react'
import { Link } from 'react-router-dom'

const Albums = ({ albums, handlerDelete }) => {
  return (
    <div className="column">
      {albums.map(album => (
        <div className="media box" key={album.id}>
          <div className="media-left">
            <span className="tag is-info">{album.id}</span>
          </div>
          <div className="media-content">
            <p className="title is-4">{album.name}</p>
            <p>Artista: {album.artist}</p>
          </div>
          <div className="media-right">
            <Link to={`/albums/${album.id}`} className="button is-success">
              <i className="fas fa-info-circle" />
            </Link>
            <button className="button is-danger" onClick={() => handlerDelete(album.id)}>
              <i className="fas fa-trash-alt" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Albums
