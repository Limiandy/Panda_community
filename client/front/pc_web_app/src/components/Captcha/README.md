### 组件使用说明

#### 简要说明

该组件实现了，父子组件的数据的双向绑定，使用validate 包实现了表单的核验

#### 版本说明

#### 使用说明

1. 引入组件
2. <captcha ref="captcha" @receiveCode="receiveCode" />
   - receiveCode 接收验证码组件传递过来的 验证码的值与 valid(是否通过验证)
   - this.$refs.captcha.reRequest(),重新请求验证码，使用场景：如ajax请求失败后，重新发起请求
3. 预留了slot插槽 `<captcha ref="captcha" @receiveCode="receiveCode"> <div
   class="btns">...</div> </captcha>`

