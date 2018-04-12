/** 
 * component => node
*/

export function mountComponent(component) {
  return component.mountComponent()
}

export function unmountComponent(component) {
  component.unmountComponent()
}

/**
 * 第一个参数组件，更新第二个参数element
 * 在这个函数里面完成class组件以及dom组件的多态更新。
 * @param {*} component 
 * @param {*} nextElement 
 */
export function receiveComponent(component, nextElement) {
  const prevElement = component._currentElement
  if (prevElement === nextElement)  return
  
  component.updateComponent(component._currentElement, nextElement)
}

