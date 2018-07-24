export const getPropsType = (propName) => {
  if(propName === 'ref') {
    return 'ref'
  }else if(propName === 'style') {
    return 'style'
  }else if(/^on[A-Z]/.test(propName)) {
    return 'event'
  }else {
    return 'common'
  } 
}
















