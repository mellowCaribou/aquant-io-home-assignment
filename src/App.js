import React from 'react';
import logo from './logo.svg';
import styles from './App.scss';
import { MarkerForm } from './components/MarkerForm/MarkerForm';
import { Map } from './components/Map/Map';

function App() {
  return (
    <div className="main">
      <div className="markers-form">
        <MarkerForm></MarkerForm>
      </div>
      <div className="map">
        <Map></Map>
      </div>
    </div>
  );
}

export default App;
