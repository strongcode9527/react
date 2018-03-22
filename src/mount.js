import {mountComponent} from './Reconciler'
import {empty, appendChildren} from './DOM'
import instantiateComponent from './instantiateComponent'

export default function render(element, node) {
  // todo: add update
  // 在这里挂载dom元素。
  // element => component => dom
  mount(element, node)
}


// 在这里可以清楚地表明，element, component, 以及dom元素的关系
// 利用element instantiate 出 component,再利用component mount出真正的dom元素
// 在mount的过程中还要生成hash树，以便进行简单的diff算法，更为update做准备。
function mount(element, node) {
  let component = instantiateComponent(element)
  let renderedNode = mountComponent(component)
  
  empty(node)
  appendChildren(node, renderedNode)
}

