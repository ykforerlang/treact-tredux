/**
 * Created by apple on 2017/8/21.
 */
import React,{ Component } from 'react'
import ReactDOM from 'react-dom'

import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'

import shallowEqual from './shallowEqual'

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

function connect(mapStateToProps, mapDispatchToProps) {

    return function (WrappedComponent) {
        return class Hoc extends Component {
            constructor(props) {
                super(props)

                this.unsubscribe = store.subscribe(() => {
                    this.setState({})
                })

                this.memorizeProps = {
                    ...mapStateToProps(store.getState(), props),
                    ...mapDispatchToProps(store.dispatch, props)
                }
            }

            componentWillUnmount() {
                this.unsubscribe()
            }

            shouldComponentUpdate() {
                const newProps = {
                    ...mapStateToProps(store.getState(), this.props),
                    ...mapDispatchToProps(store.dispatch, this.props)
                }

                const isEqual = shallowEqual(newProps, this.memorizeProps)
                if (isEqual) {
                    return false
                } else {
                    this.memorizeProps = newProps
                    return true
                }
            }


            render() {
                return (
                    <WrappedComponent {...this.props} {...this.memorizeProps} />
                )
            }
        }

    }
}

HelloWorld = connect(state => state, () => {})(HelloWorld)

ReactDOM.render(<HelloWorld/>, document.getElementById("root"))
