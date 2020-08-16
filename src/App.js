import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import styles from './App.scss';
import MarkerForm from './components/MarkerForm/MarkerForm';
import Map from './components/Map/Map';
import reducers from './reducers';

const store = createStore(reducers);

console.log(store.getState());


function App() {
  return (
    <Provider store={store}>
      <div className="main">
        <MarkerForm className="markers-form"></MarkerForm>
        <Map className="map"></Map>
      </div>
    </Provider>
  );
}

export default App;
