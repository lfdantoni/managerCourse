import {EMAIL_CHANGED, PASSWORD_CHANGED, LOGIN_SUCCESS, LOGIN_FAILURE, LOGIN_USER} from './types';
import firebase from 'firebase';

export * from './EmployeeActions';

export const emailChanged = (text) => {
    return {
        type: EMAIL_CHANGED,
        payload: text
    };
};

export const passwordChanged = (password) => {
    return {
        type: PASSWORD_CHANGED,
        payload: password
    };
};

export const loginPending = () => {
    return {
        type: LOGIN_USER
    };
};

export const loginSuccess = (user) => {
    return {
        type: LOGIN_SUCCESS,
        payload: user
    };
};

export const loginFailure = (error) => {
    return {
        type: LOGIN_FAILURE,
        payload: error
    };
};

export const loginUser = ({ email, password }) => {
    return (dispach) => {
        dispach(loginPending());
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(user => dispach(loginSuccess(user)))
            .catch(() => {
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then(user => dispach(loginSuccess(user)))
                    .catch(error => dispach(loginFailure(error)))
            })
    }
};