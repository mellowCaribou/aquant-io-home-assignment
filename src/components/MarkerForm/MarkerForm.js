import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import React, { useState, useEffect, useRef } from 'react'

import {addMarker, removeMarker} from '../../actionCreators';

const MarkerForm = ({ className, markers, addMarker, removeMarker }) => {

    const [mapName, setMapName] = useState('');
    const [mapId, setMapId] = useState(null);
    const [lat, setLat] = useState(null);
    const [long, setLong] = useState(null);
    const mapNameInput = useRef(null);

    useEffect(()=>{
        const urlParams = new URLSearchParams(window.location.search);
        const mapIdParam = urlParams.get('mapId');

        if(mapIdParam){
            setMapId(mapIdParam);
            window.Visualforce.remoting.Manager.invokeAction('MapsController.GetMap', mapIdParam, (res,e) => {
                console.log('GetMap', res, e);
                if(mapNameInput.current){
                    setMapName(res.Name);
                    mapNameInput.current.value = res.Name;
                }
                if(Array.isArray(res.Map_Cords__r)){
                    res.Map_Cords__r.forEach(map_cord => addMarker({
                        location: [map_cord.Latitude__c, map_cord.Longitude__c]
                    }))
                }
            });
        }
    }, []);

    const isLatValid = (lat) => {
        return lat <= 90 && lat >= -90;
    }

    const isLongValid = (long) => {
        return long <= 180 && long >= -180;
    }

    const markerToCordSObject = (marker) => {
        return {
            Longitude__c: marker.location[1],
            Latitude__c: marker.location[0]
        }
    }

    const addNewMarker = () => {
        if (!long || !lat || !isLatValid(lat) || !isLongValid(long)) {
            return alert('please insert a valid location');
        }
        const newMarker = {
            location: [lat, long]
        }
        addMarker(newMarker);
        saveMap([newMarker]);
    }

    const removeMarkerHandler = (marker) => {
        return () => {
            removeMarker(marker);
            saveMap(null, [marker]);
        };
    }

    const saveMap = (markersToAdd, markersToDelete) => {
        markersToAdd = markersToAdd || [];
        markersToDelete = markersToDelete || [];
        if(mapId){
            window.Visualforce.remoting.Manager.invokeAction('MapsController.UpdateMap', mapId, mapName, markersToAdd.map(markerToCordSObject), markersToDelete.map(markerToCordSObject), (res,e) =>{
                console.log('UpdateMap', res, e)
            })
        }
        else {
            window.Visualforce.remoting.Manager.invokeAction('MapsController.CreateMap', mapName, markers.map(markerToCordSObject), (res,e) =>{
                console.log('CreateMap', res, e)
                setMapId(res);
            })
        }

    }

    const onSaveClick = (e) => {
        saveMap();
    }

    return (
        <div className={className}>
            <h2>Add a marker to the map</h2>
            <form className="">
                <input placeholder="Lat" min="-90" max="90" type="number" name="lat" onChange={(event) => setLat(event.target.value)}></input>
                <input placeholder="Long" min="-180" max="180" type="number" name="long" onChange={(event) => setLong(event.target.value)}></input>
                <Button className='add-btn' onClick={addNewMarker}>Add Marker</Button>
            </form>
            <form className="">
                <input ref={mapNameInput} placeholder="Map Name" type="text" name="mapName" onChange={(event) => setMapName(event.target.value)}></input>
                <Button className='add-btn' onClick={onSaveClick}>Save</Button>
            </form>
            <ul>
                {markers.map((marker, i) => (<li className='marker-item' key={i}>
                <div>{'Long:' + marker.location[0] + ', Lat:' + marker.location[1]}</div>
                <Button onClick={removeMarkerHandler(marker)}>Delete</Button>
                </li>))}
            </ul>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {markers: state.markers};
}

export default connect(mapStateToProps, {addMarker, removeMarker})(MarkerForm);
