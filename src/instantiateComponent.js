import DOMComponent from './DOMComponent'

/**
 * element => component
 */

export default function instantiateComponent(element) {
  let componentInstance

  if (typeof element.type === 'function') {
    // todo: add functional component
    // only supports class component for now
    componentInstance = new element.type(element.props)
    componentInstance._construct(element)
  } else if (typeof element.type === 'string') {
    componentInstance = new DOMComponent(element)
  } else if (['string', 'number', 'undefined'].indexOf(typeof elemen) !== -1) {
    componentInstance = new DOMComponent({
      type: 'span',
      props: { children: element || ''}
    })
  }

  return componentInstance
}

