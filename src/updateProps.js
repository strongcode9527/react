import {updateStyles} from './DOM'

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

export function updateStyle(domNode, preStyle, nextStyle) {
  let styleUpdates = {},
      nextKeys = Object.keys(nextStyle)
  // 添加修改
  nextKeys.forEach(key => {
    let pre = preStyle[key],
        next = nextStyle[key]
    if(pre !== next) {
      styleUpdates[key] = next
    }

    if(pre) {
      delete preStyle[key]
    }
  })
  
  let preKeys = Object.keys(preStyle)

  preKeys.forEach(key => {
    styleUpdates[key] = ''
  })


  updateStyles(domNode, styleUpdates)
}














