import React, { Component, Children } from 'react'
import PropTypes from 'prop-types'

export default class Provider extends Component {

    static childContextTypes =  {
        store: PropTypes.object
    }

    getChildContext() {
        return {
            store: this.props.store
        }
    }

    render() {
        return Children.only(this.props.children)
    }
}