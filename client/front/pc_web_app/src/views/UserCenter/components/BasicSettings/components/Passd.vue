<template>
  <form class="layui-form layui-form-pane">
    <div class="layui-form-item">
      <label for="password" class="layui-form-label">当前密码</label>
      <div class="layui-input-inline">
        <input
          type="password"
          id="password"
          name="password"
          placeholder="请输入旧密码"
          autocomplete="off"
          class="layui-input"
        />
      </div>
    </div>
    <div class="layui-form-item">
      <label for="new-password" class="layui-form-label">新密码</label>
      <div class="layui-input-inline">
        <input
          type="password"
          id="new-password"
          name="new-password"
          placeholder="请输入新的密码"
          autocomplete="off"
          class="layui-input"
        />
      </div>
    </div>
    <div class="layui-form-item">
      <label for="repta" class="layui-form-label">确认密码</label>
      <div class="layui-input-inline">
        <input
          type="password"
          id="repta"
          name="repta"
          placeholder="请重复输入新密码"
          autocomplete="off"
          class="layui-input"
        />
      </div>
    </div>

    <div class="layui-form-item">
      <div class="layui-input-inline">
        <button class="layui-btn">
          确认修改
        </button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: "Passd"
};
</script>

<style lang="sass" scoped></style>
