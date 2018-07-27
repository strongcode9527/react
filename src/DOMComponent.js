import assert from './assert'
import MultiChild from './MultiChild'
import {removeProperty, setProperty, updateStyles, appendChildren} from './DOM'
import {updateProps} from './updateProps'
import * as DOM from './DOM'

export default class DOMComponent extends MultiChild {
  constructor(element) {
    super()
    this._currentElement = element
    this._domNode = null
  }

  mountComponent() {
    // create real dom nodes
    const node = document.createElement(this._currentElement.type)
    this._domNode = node

    this._updateNodeProperties({}, this._currentElement.props)
    this._createInitialDOMChildren(this._currentElement.props)

    return node
  }

  unmountComponent() {
    this.unmountChildren()
  }

  updateComponent(prevElement, nextElement) {
    this._currentElement = nextElement
    this._updateNodeProperties(prevElement.props, nextElement.props)
    this._updateDOMChildren(prevElement.props, nextElement.props)
  }

  // dom元素绑定事件的入口就在这里，。
  // 目前支持绑定的dom properties只支持style
  // 计划支持所有的properties。

  _updateNodeProperties(prevProps, nextProps) {
    const prevKeys = Object.keys(prevProps),
          nextKeys = Object.keys(nextProps),
          allUniqueKeys = [...(new Set([...prevKeys, ...nextKeys]))] 

    console.log(prevProps, nextProps, allUniqueKeys)

    
    allUniqueKeys.forEach(key => {
      if(key !== 'children' && prevProps[key] !== nextProps[key]) {
        updateProps(key)(this._domNode, key, prevProps[key], nextProps[key])
      }
    })
  
  }

  _createInitialDOMChildren(props) {
    // this is where we go into the children of the dom component and 
    // recursively mount and append each of the childNode to the parent node
    if (
      typeof props.children === 'string' ||
      typeof props.children === 'number'
    ) {
      const textNode = document.createTextNode(props.children)
      this._domNode.appendChild(textNode)
    } else if (props.children) {
      // Single element or Array
      const childrenNodes = this.mountChildren(props.children)
      DOM.appendChildren(this._domNode, childrenNodes)
    }
  }
  // 在这里实现子元素的递归更新。
  _updateDOMChildren(prevProps, nextProps) {
    const prevType = typeof prevProps.children
    const nextType = typeof nextProps.children
    assert(prevType === nextType)

    // Childless node, skip
    if (nextType === 'undefined') return

    // Much like the initial step in mounting, handle text differently than elements.
    if (nextType === 'string' || nextType === 'number') {
      this._domNode.textContent = nextProps.children
    } else {
      // 在这里进入MultiChild进行更新。
      this.updateChildren(nextProps.children)
    }
  }
}
