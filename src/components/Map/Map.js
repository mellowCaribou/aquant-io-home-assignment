import React, { UseContext, useContext } from 'react'
import { config } from '../../config'
import { ReactBingmaps } from 'react-bingmaps';
import { MarkersContext } from '../context/MarkersState';


export const Map = ({ className }) => {
    const markers = useContext(MarkersContext);

    return (
        <ReactBingmaps className={className} pushPins={markers.markers}
            bingmapKey={config.BING_MAPS_API_KEY} >
        </ReactBingmaps >
    )
}
