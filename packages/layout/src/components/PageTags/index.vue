<script setup lang="ts">
import { MenuOutlined } from '@ant-design/icons-vue';
import { Dropdown as AntdDropdown, Space as AntdSpace, Tag as AntdTag } from 'ant-design-vue';

import DropdownMenu from './DropdownMenu.vue';

defineOptions({
  name: 'PageTags'
});
</script>

<template>
  <div class="page-tags-container">
    <antd-dropdown :trigger="['contextmenu']">
      <div class="scroll-view">
        <TransitionGroup name="tags">
          <antd-tag draggable="true">
            tag
          </antd-tag>
          <antd-tag draggable="true">
            tag
          </antd-tag>
          <antd-tag draggable="true">
            tag
          </antd-tag>
        </TransitionGroup>
      </div>
      <template #overlay>
        <dropdown-menu />
      </template>
    </antd-dropdown>
    <div class="page-tags-right">
      <antd-space>
        <antd-dropdown>
          <menu-outlined />
          <template #overlay>
            <dropdown-menu />
          </template>
        </antd-dropdown>
      </antd-space>
    </div>
  </div>
</template>

<style scoped lang='less'>
.page-tags-container {
  display: inline-flex;
  align-items: center;
  padding: 10px 24px;
  width: 100%;
  justify-content: space-between;
  .scroll-view{
    overflow: hidden;
  }
  span.ant-tag {
    cursor: pointer;
  }
  .ant-tag.dragging{
    background: transparent;
    color:transparent;
    border: 1px dashed #ccc;
  }
}

.tags-enter-active,
.tags-leave-active {
  transition: all 0.5s;
}

.tags-enter-from{
  transform: translateX(40px);
}
.tags-leave-active {
  position: absolute;
}
.tags-enter-from, .tags-leave-to {
  opacity: 0;
}
</style>
