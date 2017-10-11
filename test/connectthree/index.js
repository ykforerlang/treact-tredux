/**
 * Created by apple on 2017/8/21.
 */
import React,{ Component } from 'react'
import ReactDOM from 'react-dom'
import { bindActionCreators } from 'redux'
import Provider from './components/Provider'
import connect from './connect'
import store from './store'


// action creator
const add = () => ({
    type: 'add'
})
const remove = () => ({
    type: 'delete1'
})


class HelloWorld extends Component {
    render() {
        const { add, remove } = this.props
        return (
            <div>
                <div onClick={e => add()} >{this.props.count}</div>
                <div onClick={e => remove()} >xxx</div>
            </div>
        )
    }
}

HelloWorld = connect(state => state, dispatch => bindActionCreators({add, remove}, dispatch))(HelloWorld)

const Hw = (<Provider store={store}>
    <HelloWorld/>
</Provider>)

ReactDOM.render(Hw, document.getElementById("root"))
