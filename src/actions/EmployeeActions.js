import { 
    EMPLOYEE_UPDATE, 
    EMPLOYEE_STORING, 
    EMPLOYEE_CREATE_FAILURE, 
    EMPLOYEE_CREATE_SUCCESS ,
    EMPLOYEES_FETCHING,
    EMPLOYEES_SUCCESS,
    EMPLOYEES_FAILURE,
    EMPLOYEE_EDIT,
    EMPLOYEE_FETCHING,
    EMPLOYEE_FETCHING_SUCCESS,
    EMPLOYEE_EDIT_SUCCESS,
    EMPLOYEE_EDIT_FAILURE
} from './types';
import firebase from 'firebase';

export const employeeUpdate = ({ prop, value }) => {
    return {
        type: EMPLOYEE_UPDATE,
        payload: { prop, value }
    }
}

export const employeeWillCreate = () => {
    return {
        type: EMPLOYEE_STORING
    }
}

export const employeeCreateSuccess = () => {
    return {
        type: EMPLOYEE_CREATE_SUCCESS
    }
}

export const employeeCreateFailure = (error) => {
    return {
        type: EMPLOYEE_CREATE_FAILURE,
        payload: error
    }
}

export const employeeCreate = ({ name, phone, shift }) => {
    return (dispatch) => {
        dispatch(employeeWillCreate());
        const { currentUser } = firebase.auth();
        firebase.database().ref(`/users/${currentUser.uid}/employees`)
            .push({ name, phone, shift })
            .then(
                () => dispatch(employeeCreateSuccess()),
                (error) => dispatch(employeeCreateFailure(error))
            );
    }
}

export const employeesFetching = () => {
    return {
        type: EMPLOYEES_FETCHING
    }
}
export const employeesSuccess = (data) => {
    return {
        type: EMPLOYEES_SUCCESS,
        payload: data
    }
}
export const employeesFailure = (error) => {
    return {
        type: EMPLOYEES_FAILURE,
        payload: error
    }
}

export const employeesFetch = () => {
    return (dispatch) => {
        dispatch(employeesFetching());
        const { currentUser } = firebase.auth();
        firebase.database().ref(`/users/${currentUser.uid}/employees`)
            .on('value', snapshot => {
                dispatch(employeesSuccess(snapshot.val()))
            })
    }
}

export const employeeFetching = () => {
    return {
        type: EMPLOYEE_FETCHING
    }
}

export const employeeEdit = () => {
    return {
        type: EMPLOYEE_EDIT
    }
}

export const employeeSuccess = (data) => {
    return {
        type: EMPLOYEE_FETCHING_SUCCESS,
        payload: data
    }
}

// export const editEmployee = (id) => {
//     return (dispatch) => {
//         dispatch(employeeEdit(id));
//         dispatch(employeeFetching());
//         const { currentUser } = firebase.auth();
//         firebase.database().ref(`/users/${currentUser.uid}/employees/${id}`)
//             .on('value', snapshot => {
//                 dispatch(employeeSuccess(snapshot.val()))
//             })
//     }
// }

export const employeeEditSuccess = () => {
    return {
        type: EMPLOYEE_EDIT_SUCCESS
    }
}
export const employeeEditFailure = (error) => {
    return {
        type: EMPLOYEE_EDIT_FAILURE,
        payload: error
    }
}
export const updateEmployeeSave = (id, employee) => {
    return (dispatch) => {
        dispatch(employeeWillCreate());
        const { currentUser } = firebase.auth();
        firebase.database().ref(`/users/${currentUser.uid}/employees/${id}`)
            .set(employee)
            .then(
                () => dispatch(employeeEditSuccess()),
                (error) => dispatch(employeeEditFailure(error))
            )
    }
}