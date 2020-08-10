import React, { useContext, useState } from 'react'
import Button from '@material-ui/core/Button';
import { MarkersContext } from '../context/MarkersState';


export const MarkerForm = ({ className }) => {

    const markers = useContext(MarkersContext);
    const [lat, setLat] = useState(null)
    const [long, setLong] = useState(null)

    const isLatValid = (lat) => {
        return lat <= 90 && lat >= -90;
    }

    const isLongValid = (long) => {
        return long <= 180 && long >= -180;
    }
    // we still have a bug happening here
    const addNewMarker = () => {
        if (!long || !lat || !isLatValid(lat) || !isLongValid(long)) {
            return alert('please insert a valid location');
        }
        markers.editMarkers({
            marker: {
                "location": [lat, long]
            },
            action: 'add'
        })
    }

    const removeMarkerHandler = (marker) => {
        return () => {
            markers.editMarkers({
                marker: marker,
                action: 'remove'
            })
        }
    }

    return (
        <div className={className}>
            <h2>Add a marker to the map</h2>
            <form className="">
                <input placeholder="Lat" min="-90" max="90" type="number" name="lat" onChange={(event) => setLat(event.target.value)}></input>
                <input placeholder="Long" min="-180" max="180" type="number" name="long" onChange={(event) => setLong(event.target.value)}></input>
                <Button className='add-btn' onClick={addNewMarker}>Add Marker</Button>
            </form>
            <ul>
                {markers.markers.map((marker, i) => (<li className='marker-item' key={i}>
                <div>{'Long:' + marker.location[0] + ', Lat:' + marker.location[1]}</div>
                <Button onClick={removeMarkerHandler(marker)}>Delete</Button>
                </li>))}
            </ul>
        </div>
    )
}
