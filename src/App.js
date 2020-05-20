import React from 'react';
import logo from './logo.svg';
import styles from './App.scss';
import { MarkerForm } from './components/MarkerForm/MarkerForm';
import { Map } from './components/Map/Map';
import { MarkersProvider } from './components/context/MarkersState';

function App() {
  return (
    <MarkersProvider>
      <div className="main">
        <MarkerForm className="markers-form"></MarkerForm>
        <Map className="map"></Map>
      </div>
    </MarkersProvider>
  );
}

export default App;
