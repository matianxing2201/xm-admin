<template>
    <a-dropdown placement="bottom" trigger="click">
        <skin-outlined />
        <template #overlay>
      <a-menu
        v-model:selected-keys="selectedKeys"
        @click="handleUpdate($event.key)"
      >
        <a-menu-item key="light"> 亮色 </a-menu-item>
        <a-menu-item key="dark"> 暗色 </a-menu-item>
        <a-menu-item key="auto"> 跟随主体 </a-menu-item>
      </a-menu>
    </template>
    </a-dropdown>
</template>
<script setup lang="ts">
import { SkinOutlined } from '@ant-design/icons-vue';
import { useColorMode } from '@vueuse/core';
import { ref } from 'vue';

defineOptions({ name: 'DarkModeSwitch' });

const colorMode = useColorMode();


const selectedKeys = ref([colorMode.value]);
function handleUpdate(value: 'light' | 'dark' | 'auto') {
  colorMode.value = value;
  selectedKeys.value = [value];
}


</script>
<style scoped lang='less'>
</style>
