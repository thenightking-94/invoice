import { createStore } from 'redux';

const state = {
    name: '',
    email: '',
    img: ''
};

const reducer_method = (state, action) => {
    if (action.type == 'LOGGEDIN')
        return ({ ...state, email: action.email, name: action.name, img: action.img });
    return state;
}



const Store = createStore(reducer_method, state);
export { Store };

console.log(Store.getState())