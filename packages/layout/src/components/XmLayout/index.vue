<template>
    <antd-layout class="xm-layout-container" v-if="!pure">
        <antd-layout-silder
            :collapsed="collapsed"
            theme="light"
            :trigger="null"
            collapsible
        >
            <div class="xm-layout-title">
                <span>
                    <slot name="title" :collapsed="collapsed">
                        <slot name="logo" />
                        <span v-show="!collapsed" style="margin-left:10px">
                            <slot name="titleText" />
                        </span>
                    </slot>
                </span>
            </div>
            <slot name="menu"></slot>
        </antd-layout-silder>
        <antd-layout>
            <antd-layout-header class="xm-layout-header">
                <div class="xm-layout-header-container">
                <div class="container-left">
                    <slot name="headerContent">
                        <menu-unfold-outlined v-if="collapsed" class="trigger" @click="updatedCollapsed(false)" />
                        <menu-fold-outlined v-else class="trigger" @click="updatedCollapsed(true)" />
                        <slot name="breadcrumb">
                           
                        </slot>
                    </slot>
                </div>
                <antd-space align="center" class="flex-shrink-0">
                    <slot name="headerActions" />
                </antd-space>
                </div>
            </antd-layout-header>
            <page-tags v-if="showPageTags"/>
        </antd-layout>
    </antd-layout>
</template>
<script setup lang="ts">
import type { XmLayoutProps, XmLayoutEmits } from './types'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue'
import { Layout as AntdLayout, Space as AntdSpace, Spin as AntdSpin, theme } from 'ant-design-vue'
import PageTags from '../PageTags/index.vue'

defineOptions({ name: 'XmLayout' })

withDefaults(defineProps<XmLayoutProps>(), {
    pure: false,
    loading: false,
    showPageTags: true
})

const { Sider: AntdLayoutSilder, Header: AntdLayoutHeader, Content: AntdLayoutContent } = AntdLayout

const emits = defineEmits<XmLayoutEmits>()


function updatedCollapsed(val: boolean) {
  emits('collapse', val)
  emits('update:collapsed', val)
}
</script>
<style scoped lang='less'>
.xm-layout-container {
    position: relative;
    height: 100%;
    width: 100%;
    
    .xm-layout-title {
        border-inline-end: 1px solid rgba(5, 5, 5, 0.06);
        height: 65px;
        font-size: 20px;
        line-height: 24px;
        padding: 10px;
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: center;
        > span {
            text-wrap: nowrap;
        }
        > img {
            margin: 0 auto;
            width: 45px;
            height: 45px;
        }
    }

    .xm-layout-header {
        position: relative;
        padding-inline: 50px;
        color: var(--text-color);
        line-height: 64px;
        background: var(--bg-color);
        box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

        &-container {
            display: flex;
            padding: 0 24px;
        }

        .container-left {
            flex: 1;
            overflow-x: auto;
        }
    }
}
</style>
