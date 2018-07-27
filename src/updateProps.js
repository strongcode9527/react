import {updateStyles, removeProperty, setProperty} from './DOM'

export const updateProps = (propName) => {
  if(propName === 'ref') {
    return 'ref'
  }else if(propName === 'style') {
    return updateStyle
  }else if(/^on[A-Z]/.test(propName)) {
    return updateEvent
  }else {
    return updateAttr
  } 
}

function updateStyle(domNode, key, preStyle = {}, nextStyle = {}) {
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

function updateEvent(domNode, key, prevCallback, nextCallback) {
  if(!nextCallback) {
    // 需要删除绑定函数
  }
  // 添加回调函数
  else {
    domNode._events = domNode.events || {}
    domNode._events[key] = nextCallback

    addEvent(document, key, dispatchEvent)
  }
}

function updateAttr(domNode, key, preAtt, nextAtt) {
  if(preAtt === nextAtt) {
    return
  }else if(preAtt && typeof nextAtt === 'undefined') {
    removeProperty(domNode, key)
  }else {
    setProperty(domNode, key, nextAtt)
  }
}

function addEvent(dom, key, callback) {
  dom.addEventListener(key, callback, false )
}

// 真正的执行函数。
function dispatchEvent() {

}








