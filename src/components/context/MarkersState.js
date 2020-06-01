import React, { createContext, useReducer } from 'react';
import MarkersReducer from './MarkersReducer';

const markersInitial = {
    markers: [

    ]
};

export const MarkersContext = createContext(markersInitial);

export const MarkersProvider = ({ children }) => {
    const [state, dispach] = useReducer(MarkersReducer, markersInitial);

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