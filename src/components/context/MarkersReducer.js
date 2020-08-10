export default (state, data) => {
    if (!data || !data.marker || !data.action) {
        return state;
    }

    let markers = state.markers

    switch(data.action){
        case 'add': {
            markers = [...markers, data.marker]
            break;
        }
        case 'remove': {
            const index = markers.findIndex((marker) => marker.location[0] === data.marker.location[0] && marker.location[1] === data.marker.location[0])
            markers.splice(index,1)
            markers = JSON.parse(JSON.stringify(markers))
            break;
        }
        default:{
            break;
        }
    }

    return {
        ...state,
        markers: markers
    }
}