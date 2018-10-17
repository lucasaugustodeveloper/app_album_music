import React from 'react'

const AlbumCreate = ({ artist, album, handlerInputChange, handlerSubmit }) => (
  <div className="box">
    <h1 className="title">Adicionar novo Album</h1>

    <div className="columns">
      <div className="field column">
        <div className="control">
          <input type="text" className="input"
            placeholder="Nome do Album" value={album} name="album"
            onChange={handlerInputChange} />
        </div>
      </div>

      <div className="field column">
        <div className="control">
          <input type="text" className="input"
            placeholder="Nome do Artista" value={artist} name="artist"
            onChange={handlerInputChange} />
        </div>
      </div>

      <div className="field column">
        <div className="control">
          <button type="button" className="button"
          onClick={handlerSubmit}>Adicionar</button>
        </div>
      </div>
    </div>

  </div>
);

export default AlbumCreate
