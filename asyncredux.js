const redux = require('redux')
const thunkMiddleware = require('redux-thunk').default
const axios = require('axios')

const createStore = redux.createStore
const applyMiddleware = redux.applyMiddleware

//initial state of my app
const initialState = {
    loading: false,
    users: [],
    error: ''
}

//action describer
const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

//execute 
const fetchUsersRequest = () => {
    return {
        type: FETCH_USERS_REQUEST
    }
}

const fetchUserSuccess = users => {
    return {
        type: FETCH_USERS_SUCCESS,
        payload: users
    }
}

const fetchUserFailure = error => {
    return {
        type: FETCH_USERS_FAILURE,
        payload: error
    }
}

//reducer function

const reducer = (state = initialState, action) => {
    switch(action.type){
        case FETCH_USERS_REQUEST:  return{
            ...state, loading: true
        }
    }
    switch(action.type){
        case FETCH_USERS_SUCCESS:  return{
            loading: true,
            users: action.payload,
            errors: ''
        }
    }
    switch(action.type){
        case FETCH_USERS_FAILURE:  return{
            loading: true,
            users: [],
            errors: action.payload
        }
    }
}

//function that will be use to run 
const fetchUsers = () => {
    return function(dispatch){
        dispatch(fetchUsersRequest)
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then( response => {
            //response.data array of users
            const users = response.data.map( user => user.username )
            dispatch(fetchUserSuccess(users))
        })
        .catch( error => {
            //error.message description of error
            dispatch(fetchUserFailure(error.message))
        })
    }
}

const store = createStore(reducer, applyMiddleware(thunkMiddleware))

store.subscribe( () => {console.log(store.getState())})
store.dispatch(fetchUsers())