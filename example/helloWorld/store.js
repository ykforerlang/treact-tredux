import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'

function reduer(state, action) {
    switch (action.type) {
        case 'add': {
            return Object.assign({}, state, {count: state.count + 1})
        }
        default: {
            return state
        }
    }
}

export default createStore(reduer, { count : 0 }, applyMiddleware(logger))
