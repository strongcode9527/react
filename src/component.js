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
}

class DomComponent {
  constructor(element) {
    this._currentElement = element
    this._domNode = null
  }

  mountComponent() {
    const node = document.createElement(this._currentElement.type)
    this.domNode = node

    this._updateNodeProperTies({}, this._currentElement.props)
    this.createInitialDomChildren(this._currentElement.props)

    return node
  }
}

// Reconciler
function mountComponent(component) {
  return component.mountComponent()
}

export function mount(element, node) {
  const component = instantiateComponent(element)
  const renderNode = component.mountComponent()

  DOM.empty(node)
  DOM.appendChildren(node, renderedNode)
}