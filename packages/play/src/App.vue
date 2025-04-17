<template>
  <router-view />
</template>

<script setup lang="ts">
import { useRefreshPrompt } from './hooks'

useRefreshPrompt();
</script>

<style scoped>

</style>
