/** 
 * component => node
*/

export function mountComponent(component) {
  return component.mountComponent()
}

export function unmountComponent(component) {
  component.unmountComponent()
}

export function receiveComponent(component, nextElement) {
  const prevElement = component._currentElement
  if (prevElement === nextElement)  return

  component.updateComponent(component._currentElement, nextElement)
}

