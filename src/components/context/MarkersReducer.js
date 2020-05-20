export default (state, data) => {
    if (!data || !data.newMarker) {
        return state;
    }

    //not sure why an error is thown here
    const markers = state.markers.concat([data.newMarker]);
    return {
        ...state,
        markers: markers
    }
}