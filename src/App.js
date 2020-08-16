import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import styles from './App.scss';
import MarkerForm from './components/MarkerForm/MarkerForm';
import Map from './components/Map/Map';
import reducers from './reducers';

const store = createStore(reducers, applyMiddleware(thunk));

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
