<template>
    <span @click="toggle()">
        <expand-outlined v-if="!isFullscreen" />
        <compress-outlined v-else />
    </span>
</template>
<script setup lang="ts">
import { CompressOutlined, ExpandOutlined } from '@ant-design/icons-vue'
import { useFullscreen } from '@vueuse/core'

defineOptions({
    name: 'ScreenfullToggle'
})

const { toggle, isFullscreen }  =  useFullscreen();
</script>
<style scoped lang='less'>
</style>
