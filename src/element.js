/**
 * 
 * @param {*} type type就是组件的构造函数比如 function 或者 class 还有可能是一段字符串
 * @param {*} config <Button color="red" size="12"> </Button> => {color: 'red', size: '12'}
 * @param {*} children element的子节点。
 */
export function createElement(type, config, children) {
  console.log('createElement', type, config, children)
  const props = Object.assign({}, config),
        childrenLength = [].slice.call(arguments).length - 2
  // 当子节点大于一个时用数组保存
  if(childrenLength > 1) {
    props.children = [].slice.call(arguments, 2)
  } 
  // 当子节点只有一个的时候，就不再是数组。
  else if(childrenLength === 1) {
    props.children = children
  }

  return {
    type,
    props
  }
}