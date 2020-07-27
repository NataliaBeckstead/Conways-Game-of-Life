import React from 'react';
import './App.css';
import Grid from './Components/Grid'
import Description from './Components/Description'

function App() {
  return (
    <div className="App">
      <h2>Let's game of life begin!</h2>
      <Grid></Grid>
      <Description></Description>
    </div>
  );
}

export default App;
