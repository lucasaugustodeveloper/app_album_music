import React from 'react'

const AddSong = ({ song, handlerChange, handlerAddSong }) => (
  <div className="field has-addons">
    <div className="control is-expanded">
      <input
        type="text"
        className="input"
        placeholder="add music"
        name="song"
        value={song}
        onChange={handlerChange}
      />
    </div>
    <div className="control">
      <button className="button is-success" onClick={handlerAddSong}>
        <i className="fas fa-plus" />
      </button>
    </div>
  </div>
);

export default AddSong
