# react
 学习react的内部实现，以及基础知识。
 工作一年以来，一直使用react作为工作技术栈。但是对于其内部实现，总是一知半解。
 这次正好抱紧大佬的大腿，参照代码，好好学习。

  这个repo的所有代码是在[学习内容](https://github.com/cyan33/learn-react-source-code)完全照搬下来。
  
  并准备学习后自己添加一些新功能。

---


**预计新增加的特性有：**
  - [x] 支持生命周期函数： componentDidMount, componentWillUnmount等
  - [ ] 支持key的diff
  - [ ] 支持function组件命名方式
  - [ ] 支持组件直接返回组件


---

## 此项目的一个运行的流程：
 
1. 首先jsx会返回一个element，类似于这种

```

{
  type: 'div',
  props:{
    children: [],
    ....
  }
}


```

2. 根据render返回的element进行组件实例化。

```

let component = instantiateComponent(element)

```

3. 直接将组建的相关内容直接挂载到相关的DOM元素。

```
 let renderedNode = mountComponent(component)
  
 empty(node)
 appendChildren(node, renderedNode)


```
