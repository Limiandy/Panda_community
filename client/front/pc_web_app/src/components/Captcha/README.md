### 组件使用说明

#### 简要说明
该组件实现了，父子组件的数据的双向绑定，使用validate 包实现了表单的核验

#### 版本说明
#### 使用说明
1. 引入组件
2. 传递props
   - input: String -> input 输入框的值，动态修改子组件的值
   - data () { return { code: ""} }
   - updateVal: Function -> 动态修改父组件的值，这两项一起实现了，子、父组件的数据双向绑定
   -  updateVal (val) {this.code = val}
   - reRequest: Boolean -> 默认false，是否在父组件内重新发起请求验证