import {mountComponent} from './mount'

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


function updateSyles(node, style) {
  Object.keys(style).forEach((styleName) => {
    node.style[styleName] = style[styleName]
  })
}
