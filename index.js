//import redux
const redux = require('redux')

//create the store using the redux lib
const createStore = redux.createStore

/*Describing the action
The highcase is a convention
this save the action that will occour */
const BUY_CAKE = 'BUY_CAKE'

/*action of a system
function that execute someting in the store
always objects */

function buyCake(){
    return{
        type: BUY_CAKE,
        info: "first redux action"
    }
}


//initial state
const initialState = {
    numOfCakes: 10
}

/*Creating the reducer
creating a arrow function called reducer 
this expression will run a switch looking for the function in the args

 (previous state, action) => newState */
const reducer = (state = initialState, action) => {
    switch(action.type) {
        case BUY_CAKE: return {
            ...state, numOfCakes: state.numOfCakes - 1
        }
        default: return state
    }
}

//create a variable the execute on the store using the reducer made
//the store hold the application
const store = createStore(reducer)

//getState a store method show the actual state of the store
console.log('initial state', store.getState())

const unsubscribe = store.subscribe( () => console.log('Update State', store.getState()));

//dispatch execute the function made 
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())

unsubscribe();