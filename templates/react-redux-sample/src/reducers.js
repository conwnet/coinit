import {combineReducers} from 'redux';

const counter = (state = 0, action) => {
    switch (action.type) {
        case 'ADD_COUNTER':
            return state + action.payload;
        default:
            return state;
    }
};

export default combineReducers({counter});
