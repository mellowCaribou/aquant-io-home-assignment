import React, { useContext } from 'react'
import Button from '@material-ui/core/Button';
import { MarkersContext } from '../context/MarkersState';

export const MarkerForm = ({ className }) => {

    const markers = useContext(MarkersContext);


    const addNewMarker = (long, lat) => {
        markers.addMarker({
            newMarker: {
                "location": [30.0827, 75]
            }
        })
    }

    return (
        <form className={className}>
            <input min="-180" max="180" type="number" name="long"></input>
            <input min="-90" max="90" type="number" name="lat"></input>
            <Button onClick={addNewMarker}>Add Marker</Button>
        </form>
    )
}
