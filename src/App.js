import React, { useState, useEffect, useCallback, useRef } from 'react';
import Canvas from './Canvas.js'

function App() {
  const search = window.location.search

  const result = search.match(/imgid=(?<imgid>[\w-]*)/)
  const imgid = result !== null ? result.groups.imgid : null

  return (
    <div className="App">
      <div>
        <Canvas imgid={imgid}/>
     </div>
    </div>
  );
}

export default App;
//
//  onChange={this.handleChangeFile}
// <img src={this.state.image_src} />
// <button onClick={this.clickPostBtn} type="button">投稿する</button>
