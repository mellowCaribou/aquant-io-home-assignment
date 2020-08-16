import { combineReducers } from 'redux';
import markersReducer from './MarkersReducer';

export default combineReducers({
    markers: markersReducer
})