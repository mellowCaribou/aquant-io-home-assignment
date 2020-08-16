const ActionsEnum = {
    ADD: 1,
    REMOVE: 2
};

Object.freeze(ActionsEnum);

const addMarker = (marker) => async (dispatch, getState) => {
    let res = await (await fetch('https://jsonplaceholder.typicode.com/posts')).json();
    console.log('the await is over, Gaze upon thy marvelous posts:')
    console.table(res, ['id', 'userId', 'title', 'body']);

    dispatch({
        type: ActionsEnum.ADD,
        marker
    })
}

const removeMarker = (marker) => (dispatch, getState) => {
    return {
        type: ActionsEnum.REMOVE,
        marker
    }
}

module.exports = {addMarker, removeMarker, ActionsEnum};