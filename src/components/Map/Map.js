import React, { UseContext, useState, useContext, useEffect } from 'react'
import { config } from '../../config'
import { MarkersContext } from '../context/MarkersState';

export const Map = ({ className }) => {
    const mapElementId = 'bingMap';
    let [map, setMap] = useState(null);
    let [Microsoft, setMicrosoft] = useState(null);
    const context = useContext(MarkersContext);
    const mapMarkers = [];

    const componentDidUpdate = (prevProps) => {
        console.log('update');
    }

    const loadBingApi = async (key) => {
        const callbackName = "bingAPIReady";
        let url = `https://www.bing.com/api/maps/mapcontrol?callback=${callbackName}&key=${key}`;

        return new Promise((resolve, reject) => {
            const script = document.createElement("script");
            script.type = "text/javascript";
            script.async = true;
            script.defer = true;
            script.src = url;

            window[callbackName] = () => {
                setMicrosoft(window.Microsoft);
                setMap(window.Microsoft.Maps.Map(`#${mapElementId}`, {
                    zoom: 3
                }));
            };
            script.onerror = (error) => {
                reject(error);
            };
            document.body.appendChild(script);
        });
    }

    useEffect(() => {
        loadBingApi(config.BING_MAPS_API_KEY)
    }, [])

    const generateNewPin = (contextMarker) => {
        const location = new Microsoft.Maps.Location(contextMarker.location[0], contextMarker.location[1]);
        return new Microsoft.Maps.Pushpin(location, {
            color: 'green'
        });
    }

    const deleteMapPolygons = () => {
        for (var i = map.entities.getLength() - 1; i >= 0; i--) {
            var polygon = map.entities.get(i);
            if (polygon instanceof Microsoft.Maps.Polygon) {
                map.entities.removeAt(i);
            }
        }
    }

    const createPolygonFromMapMarkers = () => {
        const polygonVertices = mapMarkers.map(mapMarker => new Microsoft.Maps.Location(mapMarker.location[0], mapMarker.location[1]));
        polygonVertices.push(new Microsoft.Maps.Location(mapMarkers[0].location[0], mapMarkers[0].location[1]))
        return new Microsoft.Maps.Polygon(polygonVertices, {
            fillColor: 'rgba(69, 91, 128, 0.5)',
            strokeColor: 'darkgrey',
            strokeThickness: 2
        });
    }

    useEffect(() => {
        if (!context || !Array.isArray(context.markers) || !map) {
            return;
        }

        context.markers.forEach(contextMarker => {
            if (mapMarkers.indexOf(contextMarker) === -1) {
                mapMarkers.push(contextMarker);
                map.entities.push(generateNewPin(contextMarker));

                if (mapMarkers.length > 1) {
                    deleteMapPolygons();
                    map.entities.push(createPolygonFromMapMarkers());
                }
            }
        })
    }, [context]);

    return (
        <div id={mapElementId} />
    )
}
