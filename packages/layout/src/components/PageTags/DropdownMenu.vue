<script setup lang='ts'>
import { CloseOutlined, SyncOutlined, VerticalLeftOutlined, VerticalRightOutlined } from '@ant-design/icons-vue';
import { Menu as AntdMenu, MenuDivider as AntdMenuDivider, MenuItem as AntdMenuItem } from 'ant-design-vue';

defineOptions({
  name: 'PageTagsDropdownMenu'
});

function handleMenuClick() {
}
</script>

<template>
  <antd-menu :selected-keys="[]" @click="handleMenuClick">
    <antd-menu-item key="refresh" :icon="SyncOutlined">
      刷新
    </antd-menu-item>
    <antd-menu-divider />
    <antd-menu-item key="close-right" :icon="VerticalLeftOutlined">
      关闭右侧
    </antd-menu-item>
    <antd-menu-item key="close-left" :icon="VerticalRightOutlined">
      关闭左侧
    </antd-menu-item>
    <antd-menu-divider />
    <antd-menu-item key="close-other" :icon="CloseOutlined">
      关闭其他
    </antd-menu-item>
  </antd-menu>
</template>

<style scoped lang='less'>
</style>
