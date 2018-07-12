// 此文件主要是为了生成hashtree，并不会实例化任何组件
const SEPARATOR = '.'
const SUBSEPARATOR = ':'

function getComponentKey(component, index) {
  // This is where we would use the key prop to generate a unique id that
  // persists across moves. However we're skipping that so we'll just use the
  // index.
  return index.toString(36)
}


// nameSoFar就是hash tree中的每个component的key

function traverseAllChildrenImpl(
  children,
  nameSoFar,
  callback,
  traverseContext
) {
  // single child
  if (
    typeof children === 'string' ||
    typeof children === 'number' ||
    !Array.isArray(children)
  ) {
    callback(
      traverseContext,
      children,
      nameSoFar + SEPARATOR + getComponentKey(children, 0)
    )
    return 1
  }

  let subtreeCount = 0
  const namePrefix = !nameSoFar ? SEPARATOR : nameSoFar + SUBSEPARATOR

  children.forEach((child, i) => {
    subtreeCount += traverseAllChildrenImpl(
      child,
      namePrefix + getComponentKey(child, i),
      callback,
      traverseContext
    )
  })

  return subtreeCount
}

// 生成hashTree
export default function traverseAllChildren(children, callback, traverseContext) {
  return traverseAllChildrenImpl(children, '', callback, traverseContext)
}

