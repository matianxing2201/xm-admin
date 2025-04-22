<template>
  <a-config-provider :theme="antdTheme">
    <router-view />
  </a-config-provider>

</template>

<script setup lang="ts">
import { useRefreshPrompt } from '@xm-admin/hooks'
import { useAppStore } from '@/store/app';
import { storeToRefs } from 'pinia';

const appStore = useAppStore();
const {theme: antdTheme} = storeToRefs(appStore);

useRefreshPrompt();
</script>

<style scoped>

</style>
