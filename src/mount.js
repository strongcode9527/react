
import {mountComponent} from './Reconciler'
import {empty, appendChildren} from './DOM'
import instantiateComponent from './instantiateComponent'

export default function render(element, node) {
  // todo: add update
  mount(element, node)
}

function mount(element, node) {
  let component = instantiateComponent(element)
  let renderedNode = mountComponent(component)
  
  empty(node)
  appendChildren(node, renderedNode)
}

