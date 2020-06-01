import React, { useContext } from 'react'
import Button from '@material-ui/core/Button';
import { MarkersContext } from '../context/MarkersState';

export const MarkerForm = ({ className }) => {

    const markers = useContext(MarkersContext);
    let lat, long;
    // we still have a bug happening here
    const addNewMarker = () => {
        if (!long || !long) {
            return alert('please insert a location');
        }
        markers.addMarker({
            newMarker: {
                "location": [lat, long]
            }
        })
    }

    return (
        <div className={className}>
            <h2>Add a marker to the map</h2>
            <form className="">
                <input placeholder="Lat" min="-90" max="90" type="number" name="lat" onChange={(event) => lat = event.target.value}></input>
                <input placeholder="Long" min="-180" max="180" type="number" name="long" onChange={(event) => long = event.target.value}></input>
                <Button onClick={addNewMarker}>Add Marker</Button>
            </form>
        </div>
    )
}
