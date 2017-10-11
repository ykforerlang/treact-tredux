/**
 * Created by apple on 2017/8/21.
 */
import React, {Component} from 'react'
import ReactDOM from 'react-dom'

import {createStore, applyMiddleware} from 'redux'
import logger from 'redux-logger'

function reduer(state, action) {
    switch (action.type) {
        case 'add': {
            return {
                ...state,
                count: state.count + 1
            }
        }
        default: {
            return state
        }
    }
}

const store = createStore(reduer, {count: 0}, applyMiddleware(logger))


class HelloWorld extends Component {
    constructor(props) {
        super(props)
        store.subscribe(() => {
            this.setState({})
        })
    }

    render() {
        const state = store.getState()
        return (
            <div
                onClick={e => store.dispatch({type: 'add'})}
                style={{color: 'red'}}
            >
                {state.count}
            </div>
        )
    }
}

ReactDOM.render(<HelloWorld/>, document.getElementById("root"))
