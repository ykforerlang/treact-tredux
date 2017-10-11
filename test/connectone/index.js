/**
 * Created by apple on 2017/8/21.
 */
import React,{ Component } from 'react'
import ReactDOM from 'react-dom'

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

const store = createStore(reduer, { count : 0 }, applyMiddleware(logger))


class HelloWorld extends Component {
    render() {
        return (
            <div>
                <div onClick={e => store.dispatch({type: 'add'})} >{this.props.count}</div>
                <div onClick={e => store.dispatch({type: 'delete'})} >xxx</div>
            </div>
        )
    }
}


function reduxHoc(WrappedComponent, mapStateToProps) {

    return class Rh extends Component {
        constructor(props) {
            super(props)

            this.sub = store.subscribe(() => {
                this.setState({})
            })

            this._beforeProps = mapStateToProps(store.getState(), props)
        }

        componentWillUnmount() {
            this.sub()
        }

        shouldComponentUpdate() {
            const newProps = mapStateToProps(store.getState(), this.props)
            if (this._beforeProps === newProps) {
                return false
            }
            this._beforeProps = newProps
            return true
        }

        render() {
            return <WrappedComponent {...this.props} {...this._beforeProps} />
        }
    }
}

HelloWorld = reduxHoc(HelloWorld, state => state)


ReactDOM.render(<HelloWorld/>, document.getElementById("root"))
