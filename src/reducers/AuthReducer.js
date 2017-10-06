import {EMAIL_CHANGED, PASSWORD_CHANGED, LOGIN_SUCCESS, LOGIN_FAILURE, LOGIN_USER} from '../actions/types'

const initialState = { email: '', password: '', user: null, error: '', isLoading: false };

export default (state = initialState, action) => {
    switch(action.type){
        case EMAIL_CHANGED:
            return {
                ...state,
                email: action.payload,
                error: ''
            }
        case PASSWORD_CHANGED:
            return {
                ...state,
                password: action.payload
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                ...initialState,
                user: action.payload
            }
        case LOGIN_FAILURE:
            return {
                ...state,
                error: action.payload.message,
                isLoading: false
            }
        case LOGIN_USER:
            return {
                ...state,
                isLoading: true
            }
        default:
            return state;
    }
}