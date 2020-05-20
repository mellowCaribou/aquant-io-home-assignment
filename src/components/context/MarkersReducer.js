export default (state, data) => {
    if (!data || !data.newMarker) {
        return state;
    }

    return {
        ...state,
        markers: [...state.markers, data.newMarker]
    }
}