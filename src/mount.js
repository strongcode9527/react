export function mountComponent(component) {
  return component.mountComponent()
}

export function mount(element, node) {
  const component = instantiateComponent(element)
  const renderNode = component.mountComponent()

  DOM.empty(node)
  DOM.appendChildren(node, renderedNode)
}

export function instantiateChildren(children) {
  let childInstances = {}
  
  // 生成hash tree
  traverseAllChildren(
    children,
    (traverseContext, children, name) => traverseContext[name] = children,
    childInstances
  )

  return childInstances
}