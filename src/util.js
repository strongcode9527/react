/**
 * 对于生命周期函数进行检查，如果存在，并且是函数那么执行此函数
 * @param {Object} component 
 * @param {String} lifeName 
 * @param {Array} params 通过es6新特性，传递每个特殊的生命周期函数所需要的参数。
 */
export function lifeCycle(component, lifeName, params) {
 component[lifeName] && typeof component[lifeName] && component[lifeName](...params)
}

