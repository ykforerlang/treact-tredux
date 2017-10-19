import React, { Component } from 'react'
import PropTypes from 'prop-types'
import shallowEqual from '../util/shallowEqual'

export default function connect(mapStateToProps, mapDispatchToProps) {

    return function (WrappedComponent) {
        return class Hoc extends Component {
            static contextTypes = {
                store: PropTypes.object
            }

            constructor(props, context) {
                super(props)

                this.store = props.store || context.store

                this.unsubscribe = this.store.subscribe(() => {
                    this.setState({})
                })

                this.memorizeProps = this.calculateProps()
            }

            calculateProps() {
                const o1 = mapStateToProps(this.store.getState(), this.props)

                let o2 = null
                if(mapDispatchToProps) {
                    o2 = mapDispatchToProps(this.store.dispatch, this.props)
                } else {
                    o2 = {
                        dispatch: this.store.dispatch
                    }
                }

                return {
                    ...o1,
                    ...o2
                }
            }

            componentWillUnmount() {
                this.unsubscribe()
                this.unsubscribe = null
            }

            shouldComponentUpdate() {
                const nextProps = this.calculateProps()

                const isEqual = shallowEqual(nextProps, this.memorizeProps)
                if (isEqual) {
                    return false
                } else {
                    this.memorizeProps = nextProps
                    return true
                }
            }


            render() {
                return (
                    React.createElement(WrappedComponent, {...this.props, ...this.memorizeProps})
                )
            }
        }

    }
}
