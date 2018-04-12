import traverseAllChildren from './traverseAllChildren'
import instantiateComponent from './instantiateComponent'
import shouldUpdateComponent from './shouldUpdateComponent'
import {unmountComponent, receiveComponent, mountComponent} from './Reconciler'

// 在这里实例子组件
export function instantiateChild(childInstances, child, name) {
  if (!childInstances[name]) {
    childInstances[name] = instantiateComponent(child || '')
  }
}

export function instantiateChildren(children) {
  let childInstances = {}

  traverseAllChildren(children, instantiateChild, childInstances)

  return childInstances
}

export function unmountChildren(renderedChildren) {
  if (!renderedChildren)  return

  Object.keys(renderedChildren).forEach(childKey => {
    unmountComponent(renderedChildren[childKey])
  })
}

export function updateChildren(
  prevChildren, // instance tree
  nextChildren, // element tree
  mountNodes,
  removedNodes
) {
  // hack in the import function


  // we use the index of the tree to track the updates of the component, like `0.0`
  Object.keys(nextChildren).forEach((childKey) => {
    const prevChildComponent = prevChildren[childKey]
    const prevElement = prevChildComponent && prevChildComponent._currentElement
    const nextElement = nextChildren[childKey]

    // three scenarios:
    // 1: the prev element exists and is of the same type as the next element
    // 2: the prev element exists but not of the same type
    // 3: the prev element doesn't exist

    if (prevElement && shouldUpdateComponent(prevElement, nextElement)) {
      // this will do the recursive update of the sub tree
      // and this line is basically the actual update
      receiveComponent(prevChildComponent, nextElement)
      // and we do not need the new element
      // note that we are converting the `nextChildren` object from an
      // element tree to a component instance tree during all this process
      nextChildren[childKey] = prevChildComponent
    } else {
      // otherwise, we need to do the unmount and re-mount stuff
      if (prevChildComponent) {
        // only supports DOM node for now, should add composite component
        removedNodes[childKey] = prevChildComponent._domNode
        unmountComponent(prevChildComponent)
      }

      // instantiate the new child. (insert)
      const nextComponent = instantiateComponent(nextElement)
      nextChildren[childKey] = nextComponent

      mountNodes.push(mountComponent(nextComponent))
    }
  })

  // last but not least, remove the old children which no longer exist
  Object.keys(prevChildren).forEach((childKey) => {
    if (!nextChildren.hasOwnProperty(childKey)) {
      const prevChildComponent = prevChildren[childKey]
      removedNodes[childKey] = prevChildComponent
      unmountComponent(prevChildComponent)
    }
  })
}

