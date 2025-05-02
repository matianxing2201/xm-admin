<script setup lang="ts">
import { useAppStore } from '@/store/app';
import { useRefreshPrompt } from '@xm-admin/hooks';
import { storeToRefs } from 'pinia';

const appStore = useAppStore();
const { theme: antdTheme } = storeToRefs(appStore);

useRefreshPrompt();
</script>

<template>
  <a-config-provider :theme="antdTheme">
    <router-view />
  </a-config-provider>
</template>

<style scoped lang="less">

</style>
