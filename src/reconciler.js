
export function receiveComponent(component, nextElement) {
  if(component._currentElement === nextElement) return
  component.updateComponent(component._currentElement, nextElement)
}

export function updateChildren(
  preChildren, // instance tree
  nextChildren, // element tree
  mountNodes,
  removedNodes
) {
  // we use the index of the tree to track the updates of the component,
  // like '0.0'
  Object.keys(nextChildren).forEach(childKey => {
    const prevChildComponent = preChildren[childKey],
          preElement = prevChilComponent && prevChilComponent._currentElement,
          nextElement = nextChildren[childKey]

    // 有三种可能：
    // 1: 前一个节点和后一个节点类型一致。
    // 2: 前一个节点存在，但不是一种类型
    // 3: 前一个节点不存在（直接插入一个新节点）

    if(preElement && shouldUpdateComponent(prevElement, nextElement)) {
      // 将会递归更新子树
      // 而且将会进行真正的更新。
      receiveComponent(prevChildComponent, nextElement)
      // 我们不需要一个新的element
      // 注意：在整个过程中，我们试图将nextChildren对象从一个comopoent的子树，转变为一个component实例
      nextChildren[childKey] = prevChildComponent
    }else {
       // 我们需要做unmount 以及 re-mount 过程
       if(prevChildComponent) {
         // 只支持dom节点
         removeNodes[childKey] = preChildComponent._domNode
         Reconciler.unmountComponent(preChildComponent)
       }
       // 创建新的子组件
       const nextComponent = instantiateComponent(nextElement)
       nextChildren[childKey] = nextComponent

       mountNodes.push(mountComponent(nextComponent))
    }
  })
}