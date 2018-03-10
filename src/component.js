import {mountComponent} from './mount'
import {receiveComponent} from './reconciler'

function instantiateComponent(element) {
  let componentInstance

  // 创建用户自己定义的component
  if(typeof element.type === 'function') {
    componentInstance = new element.type(element.props)
    componentInstance._construct(element)
  }
  // 创建div等原生component
  else if(typeof element.type === 'string') {
    componentInstance = new DomComponent(element)
  }
    // 如果类型是string或者更number就直接创建一个span标签
  else if(typeof element === 'string' || typeof element === 'number') {
    componentInstance = new DomComponent({
      type: 'span',
      props: {children: element}
    })
  }
  return componentInstance
}

export class Component {
  constructor(props) {
    this.props = props
    this.currentElement = null
    this._renderedComponent = null
    this._renderedNode = null
  }

  _construct(element) {
    this._currentElement = element
  }

  mountComponent() {
    const renderedElement = this.render()

    const renderedComponent = instantiateComponent(renderedElement)
    this._renderedComponent = renderedComponent

    const renderedNode = mountComponent(renderedComponent)
    this._renderedNode = renderedNode

    return renderedNode
  }

  setState(partialState) {
    this._pendingState = Object.assign({}, this.state, partialState)

    /* 为什么这里要调用 updateComponent 的两个参数都是 currentElement 呢？
    *  我们知道 React 用一个 element 来表示一个组件的 DOM 结构。
    *  并且在上文提到，组件的更新无非有两种，一种是组件的 props 发生变化，这会改变 Element 的数据，而 state 的改变却并不会改变 Element。
    *  所以这里 element 在 setState 的操作中是没有变化的。
    */
    this.updateComponent(this._currentElement, this._currentElement)
  }

  updateComponent(preElement, nextElement) {
    if(preElement !== nextElement) {
      // 因为两个element不一样，所以是由于props改变导致的update。
      // 所以在这里，要调用componentWillReceiveProps

    }

    this._currentElement = nextElement

    this.props = nextElement.props
    this.state = this._pendingState
    this._pendingState = null

    const preRenderedElement = this._renderedComponent._currentElement,
          nextRenderedElement = this.render()

    if(shouldUpdateComponent(preRenderedComponent, nextRenderedComponent)) {
      Reconciler.receiveComponent(this._renderedComponent, nextElement)
    }else {
      // remount everything  under this node
      Reconciler.unmountComponent(this._renderedComponent)

      const nextRenderedComponent = instantiateComponent(nextRenderedComponent)

      DOM.replaceNode(this._renderedComponent._domNode, this._renderedNode)
    }
  }
}


class DomComponent {
  constructor(element) {
    this._currentElement = element
    this._domNode = null
  }

  updateNodeProperties(preProps, nextProps) {
    let styleUpdates = {}
    // 之前的状态全部清空。
    Object.keys(preProps).forEach((propName) => {
      if(propName === 'style') {
        Object.keys(preProps.style).forEach((styleName) => {
          styleUpdates[styleName] = ''
        })
      }else {
        DOM.removeProperty(this._domNode, propName)
      }
    })

    // 更新状态。
    Object.keys(nextProps).forEach((propName) => {
      if(propName === 'style') {
        Object.keys(nextProps.style).forEach((styleName) => {
          styleUpdates[styleName] = nextProps.style[styleName]
        })
      }else {
        DOM.setProperty(this._domNode, propName, nextProps[propName])
      }
    })
  }

  _createInitialDomChildren(props) {
    if(
      typeof props.children === 'string' ||
      typeof props.children === 'string'
    ) {
      const textNode = document.createTextNode(props.children)
    }
    else if(props.children) {
      const children = Array.isArray(props.children) ? props.children : [props.children]

      children.forEach((children, i) => {
        const childComponent = instantiateComponent(child)
        childComponent._mountIndex = i

        const childNode = mountComponent(child)

        DOM.appendChildren(this._domNode, childrenNodes)

      })
    }

}

  mountComponent() {
    const node = document.createElement(this._currentElement.type)
    this.domNode = node

    this._updateNodeProperTies({}, this._currentElement.props)
    this.createInitialDomChildren(this._currentElement.props)

    return node
  }
}

function shouldUpdateComponent(prevElement, nextElement) {
  return prevElement.type === nextElement.type
}





















function updateSyles(node, style) {
  Object.keys(style).forEach((styleName) => {
    node.style[styleName] = style[styleName]
  })
}
