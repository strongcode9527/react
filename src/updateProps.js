

import {SyntheticEvent} from './event'
import {updateStyles, removeProperty, setProperty} from './DOM'

const R = require('ramda')

const registerEvents = {}


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
  const modifyKey = key.slice(2).toLocaleLowerCase()
  if(!nextCallback) {
    domNode._events[modifyKey] = undefined
  }
  // 添加回调函数
  else {
    domNode._events = domNode.events || {}
    // 将onClick转换为click
    
    domNode._events[modifyKey] = nextCallback
    !registerEvents[modifyKey] && addEvent(document, modifyKey, dispatchEvent)
    registerEvents[modifyKey] = true
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
function dispatchEvent(e) {
  
  let path = detectPath(e)

  triggerEvents(e, path)
}


function triggerEvents(e, path) {
  const {type} = e
        
  
  path.every(domNode => {
    const callback = R.path(['_events', type], domNode),
          event = new SyntheticEvent(e, domNode)
    callback && callback.call(domNode, event)

    // 如果禁止冒泡，则停止循环
    if(event._stopPropagation) return false
    
    return true
  }) 
}

function detectPath(e, end) {
  let {target, type} = e,
        path = [target]

  end = end || document

  while(target !== end && target) {
    target = target.parentNode

    if(!target) break

    if(R.path(['_events', type], target)) {
      path.push(target)
    }
  }

  return path
}







