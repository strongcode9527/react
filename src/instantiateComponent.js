import DOMComponent from './DOMComponent'
import FuncComponent from './funcComponent'

/**
 * element => component
 */

export default function instantiateComponent(element) {
  let componentInstance

  if (typeof element.type === 'function') {
    // todo: add functional component
    // only supports class component for now
    if(!element.type.prototype.render) {
      componentInstance = new FuncComponent(element.props)
      componentInstance.render = element.type.bind(componentInstance, element.props)
      componentInstance._construct(element)
    
      return componentInstance
    }
    componentInstance = new element.type(element.props)
    componentInstance._construct(element)
  } else if (typeof element.type === 'string') {
    componentInstance = new DOMComponent(element)
  } else if (['string', 'number', 'undefined'].indexOf(typeof element) !== -1) {
    componentInstance = new DOMComponent({
      type: 'span',
      props: { children: element || ''}
    })
  }

  return componentInstance
}

