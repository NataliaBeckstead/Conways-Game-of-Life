import React from 'react';
import './App.css';
import Grid from './Components/Grid'
import Description from './Components/Description'

function App() {
  return (
    <div className="App">
      <h2>Conwey's Game Of Life</h2>
      <div className="mainConainer">
        <Grid></Grid>
        <Description></Description>
      </div>
    </div>
  );
}

export default App;
