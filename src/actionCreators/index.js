const ActionsEnum = {
    ADD: 1,
    REMOVE: 2
};

Object.freeze(ActionsEnum);

const addMarker = (marker) => {
    return {
        type: ActionsEnum.ADD,
        marker
    }
}

const removeMarker = (marker) => {
    return {
        type: ActionsEnum.REMOVE,
        marker
    }
}

module.exports = {addMarker, removeMarker, ActionsEnum};