import assert from './assert'
import {lifeCycle} from './util'
import {replaceNode} from './DOM'
import instantiateComponent from './instantiateComponent'
import shouldUpdateComponent from './shouldUpdateComponent'
import {mountComponent, unmountComponent, receiveComponent} from './Reconciler'

export default class Component {
  constructor(props) {

    this.props = props

    this._pendingState = null
    this._renderedNode = null
    this._currentElement = null
    this._renderedComponent = null

    assert(this.render)
  }

  setState(partialState) {
    this._pendingState = Object.assign({}, this.state, partialState)
    this.performUpdateIfNecessary()
  }

  _construct(element) {
    this._currentElement = element
  }
  // 因为class component
  mountComponent() {
    // we simply assume the render method returns a single element
    let renderedElement = this.render()

    let renderedComponent = instantiateComponent(renderedElement)
    this._renderedComponent = renderedComponent

    let renderedNode = mountComponent(renderedComponent)
    this._renderedNode = renderedNode

    // 调用componentDidMount生命周期函数
    this.componentDidMount && typeof this.componentDidMount === 'function' && this.componentDidMount()

    return renderedNode
  }

  unmountComponent() {
    if (!this._renderedComponent) return

    // call componentWillUnmount()

    // delegate the unmounting process to the rendered component
    unmountComponent(this._renderedComponent)
  }

  updateComponent(prevElement, nextElement) {
    if (prevElement !== nextElement) {
      // should get re-render because of the changes of props passed down from parents
      // react calls componentWillReceiveProps here
      lifeCycle(this, 'componentWillReceiveProps', [nextElement.props, prevElement.props])
    }

    // re-bookmarking
    this._currentElement = nextElement

    this.props = nextElement.props
    this.state = this._pendingState
    this._pendingState = null

    let prevRenderedElement = this._renderedComponent._currentElement
    let nextRenderedElement = this.render()

    if (shouldUpdateComponent(prevRenderedElement, nextRenderedElement)) {
      receiveComponent(this._renderedComponent, nextRenderedElement)
    } else {
      // re-mount everything from this point
      unmountComponent(this._renderedComponent)

      const nextRenderedComponent = instantiateComponent(nextElement)
      this._renderedNode = mountComponent(nextRenderedComponent)
      replaceNode(this._renderedComponent._domNode, this._renderedNode)
    }
  }

  performUpdateIfNecessary() {
    // react uses a batch here, we are just gonna call it directly without delay
    this.updateComponent(this._currentElement, this._currentElement)
  }
}

