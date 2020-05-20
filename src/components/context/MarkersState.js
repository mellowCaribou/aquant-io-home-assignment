import React, { createContext, useReducer } from 'react';
import MarkersReducer from './MarkersReducer';

const markersInitial = {
    markers: [
        {
            "location": [13.0827, 80.2707], "option": { color: 'red' }
        },
        {
            "location": [15.0827, 82.2707], "option": { color: 'green' }
        },
        {
            "location": [30.0827, 75], "option": { color: 'blue' }
        }
    ]
};

export const MarkersContext = createContext(markersInitial);

export const MarkersProvider = ({ children }) => {
    const [state, dispach] = useReducer(MarkersReducer, markersInitial);

    console.log(state.markers);
    const addMarker = (marker) => {
        dispach(marker);
    }

    return (<MarkersContext.Provider value={{
        markers: state.markers,
        addMarker
    }}>
        {children}
    </MarkersContext.Provider>)
}