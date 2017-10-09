import {
    EMPLOYEE_UPDATE, 
    EMPLOYEE_STORING, 
    EMPLOYEE_CREATE_SUCCESS, 
    EMPLOYEE_CREATE_FAILURE,
    EMPLOYEES_FAILURE,
    EMPLOYEES_FETCHING,
    EMPLOYEES_SUCCESS,
    EMPLOYEE_EDIT,
    EMPLOYEE_EDIT_FAILURE,
    EMPLOYEE_EDIT_SUCCESS,
    EMPLOYEE_FETCHING,
    EMPLOYEE_FETCHING_SUCCESS
} from '../actions/types';

const initialState = {name:'', phone: '', shift: '', isStoring: false, success: false, error: '', isLoading: false, employees: {}, editMode:false, employee: null };

export default (state = initialState, action) => {
    
    switch(action.type){
        case EMPLOYEE_UPDATE:
            return {
                ...state,
                [action.payload.prop]: action.payload.value,
                success: false
            };
        case EMPLOYEE_STORING:
            return {
                ...state,
                isStoring: true
            };
        case EMPLOYEE_CREATE_SUCCESS:
            return {
                ...state,
                ...initialState,
                success: true
            };
        case EMPLOYEE_CREATE_FAILURE:
            return {
                ...state,
                error: action.payload,
                isStoring: false
            };
        case EMPLOYEES_FETCHING:
            return {
                ...state,
                isLoading: true
            };
        case EMPLOYEES_FAILURE:
            return {
                ...state,
                ...initialState,
                error: action.payload
            };
        case EMPLOYEES_SUCCESS:
            return {
                ...state,
                employees: action.payload,
                isLoading: false
            };
        case EMPLOYEE_EDIT:
            return {
                ...state,
                success: false
            };
        case EMPLOYEE_FETCHING:
            return {
                ...state,
                isLoading: true
            };
        case EMPLOYEE_FETCHING_SUCCESS:
            return {
                ...state,
                ...action.payload,
                isLoading: false
            }
        case EMPLOYEE_EDIT_SUCCESS:
            return {
                ...state,
                ...initialState,
                success: true
            };
        case EMPLOYEE_EDIT_FAILURE:
            return {
                ...state,
                error: state.payload,
                editMode: true
            };
        default:
            return state;
    }
}