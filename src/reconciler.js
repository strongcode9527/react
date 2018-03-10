export function receiveComponent(component, nextElement) {
  if(component._currentElement === nextElement) return
  component.updateComponent(component._currentElement, nextElement)
}
