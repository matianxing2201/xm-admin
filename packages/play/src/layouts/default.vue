<template>
   <xm-layout
      v-model:collapsed="collapsed"
   >
      <!-- logo -->
      <template #logo>
         <img class="title-logo" :src="Logo" alt="logo">
      </template>

      <!-- 系统标题 -->
      <template #titleText>
         {{ env.VITE_APP_TITLE ?? 'Xm Admin' }}
      </template>

     <!-- 头部操作栏 -->
      <template #headerActions>
         <header-actions />
      </template>
   </xm-layout>
</template>
<script setup lang="ts">
import Logo from '@/assets/logo.svg';

import { loadEnv } from '../utils/index';

import { XmLayout } from '@xm-admin/layout'
import { ref } from 'vue'


const collapsed = ref<boolean>(false);
const env = loadEnv();

</script>
<style scoped lang="less">
.title-logo {
   display: inline-block;
   width: 35px;
   height: 35px;
}

>span {
   text-wrap: nowrap;
}

>img {
   margin: 0 auto;
}
</style>
