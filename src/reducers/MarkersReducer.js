import {ActionsEnum} from '../actionCreators';

export default (markers, action) => {
    markers = markers || [];

    if (!action || !action.type) {
        return markers;
    }

    switch(action.type){
        case ActionsEnum.ADD: {
            markers = [...markers, action.marker]
            break;
        }
        case ActionsEnum.REMOVE: {
            const index = markers.findIndex((marker) => marker.location[0] === action.marker.location[0] && marker.location[1] === action.marker.location[0])
            markers = markers.filter((m,i) => i !== index);
            break;
        }
        default:{
            break;
        }
    }

    return markers;
}