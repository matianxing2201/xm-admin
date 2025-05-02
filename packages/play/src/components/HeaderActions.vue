<script setup lang="ts">
import { UserOutlined } from '@ant-design/icons-vue';

defineOptions({
  name: 'LayoutHeader'
});

function logout() {
  // todo 退出登录
}
</script>

<template>
  <div class="header-action-container">
    <a-menu mode="horizontal" :selectable="false" class="header-menu">
      <a-menu-item>
        <screenfull-toggle />
      </a-menu-item>
      <a-menu-item>
        <!-- 皮肤切换 -->
        <color-mode-toggle />
      </a-menu-item>
      <a-menu-item>
        <!-- 语言切换 -->
      </a-menu-item>
      <a-menu-item>
        <a-dropdown placement="bottom" trigger="click">
          <span class="user-info">
            <a-avatar class="user-avatar" size="small">
              <template #icon><user-outlined /></template>
            </a-avatar>
            zhangsan
          </span>
          <template #overlay>
            <a-menu theme="dark">
              <a-menu-item @click="logout">
                退出登陆
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </a-menu-item>
    </a-menu>
  </div>
</template>

<style scoped lang='less'>
.header-action-container {
  display: flex;
  justify-content: end;
  align-items: center;
  .header-menu {
    .user-info {
      min-width: 70px;
      display: inline-block;

      .user-avatar {
        margin-right: 6px;
      }
    }
  }
}
</style>

