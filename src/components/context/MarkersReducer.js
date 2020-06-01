export default (state, data) => {
    if (!data || !data.newMarker) {
        return state;
    }

    const markers = [...state.markers, data.newMarker]
    return {
        ...state,
        markers: markers
    }
}