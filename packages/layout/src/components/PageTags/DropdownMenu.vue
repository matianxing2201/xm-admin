<template>
    <antd-menu onclick="handleMenuClick" :selectedKeys="[]">
        <antd-menu-item key="refresh" :icon="SyncOutlined">刷新</antd-menu-item>
        <antd-menu-divider />
        <antd-menu-item key="close-right" :icon="VerticalLeftOutlined">关闭右侧</antd-menu-item>
        <antd-menu-item key="close-left" :icon="VerticalRightOutlined">关闭左侧</antd-menu-item>
        <antd-menu-divider />
        <antd-menu-item key="close-other" :icon="CloseOutlined">关闭其他</antd-menu-item>
    </antd-menu>
</template>
<script setup lang='ts'>
import { Menu as AntdMenu, MenuItem as AntdMenuItem, MenuDivider as AntdMenuDivider } from 'ant-design-vue'
import { CloseOutlined, SyncOutlined, VerticalLeftOutlined, VerticalRightOutlined } from '@ant-design/icons-vue';

defineOptions({
    name: "PageTagsDropdownMenu"
})


const handleMenuClick = (e) => {

}
</script>
<style scoped lang='less'>
</style>
