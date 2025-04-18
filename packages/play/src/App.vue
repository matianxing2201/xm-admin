<template>
  <router-view />
</template>

<script setup lang="ts">
import { useRefreshPrompt } from '@xm-admin/hooks'

useRefreshPrompt();
</script>

<style scoped>

</style>
