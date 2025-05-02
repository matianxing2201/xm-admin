<script setup lang="ts">
import type { RouteRecordRaw } from 'vue-router';
import { Dropdown as AntdDropdown, Menu as AntdMenu, MenuItem as AntdMenuItem, theme } from 'ant-design-vue';
import { isEmpty, last, split } from 'lodash-es';
import { computed } from 'vue';
import { RouterLink, useRoute } from 'vue-router';

defineOptions({ name: 'XmBreadcrumb' });

const route = useRoute();
const { token } = theme.useToken();

const textColor = computed(() => token.value.colorText);
const textDisabledColor = computed(() => token.value.colorTextDisabled);

const breadcrumbList = computed(() => route.matched.filter(item => item.meta?.title));

function isLastItem(idx: number) {
  return idx === breadcrumbList.value.length - 1;
}

function genMenuItems(children: RouteRecordRaw[]) {
  return children.map(item => ({
    title: genItemTitle(item),
    locale: (item.meta?.locale as string) ?? '',
    key: item.path,
  }));
}

function genItemTitle(item: RouteRecordRaw) {
  if (item.meta?.locale && !isEmpty(item.meta?.locale)) {
    return item.meta.locale;
  }
  if (item.meta?.title && !isEmpty(item.meta.title)) {
    return item.meta.title;
  }
  return last(split(item.path, '/'));
}
</script>

<template>
  <div class="breadcrumb-container">
    <ol class="breadcrumb">
      <TransitionGroup name="breadcrumb">
        <li
          v-for="(item, index) in breadcrumbList"
          :key="item.path"
          class="breadcrumb-item"
          :class="{ 'breadcrumb-item-last': isLastItem(index) }"
        >
          <antd-dropdown>
            <span class="breadcrumb-item__title" :class="{ disabled: isLastItem(index) }">
              <router-link v-if="item.components" :to="item.path">
                {{ genItemTitle(item) }}
              </router-link>
            </span>
            <template v-if="item.children.length > 1" #overlay>
              <antd-menu :selected-keys="[$route.path]">
                <antd-menu-item
                  v-for="menuItem in genMenuItems(item.children)"
                  :key="menuItem.key"
                  @click="() => $router.push(menuItem.key)"
                >
                  {{ menuItem.title }}
                </antd-menu-item>
              </antd-menu>
            </template>
          </antd-dropdown>
          <span v-if="!isLastItem(index)" style="margin-inline:8px;">/</span>
        </li>
      </TransitionGroup>
    </ol>
  </div>
</template>

<style scoped lang='less'>
.breadcrumb-container{
  display: inline-block;
  margin-left: 20px;
  .breadcrumb {
    display: flex;
    flex-wrap: wrap;
    margin: 0;
    padding: 0;
    list-style: none;

    .breadcrumb-item__title, .breadcrumb-item__title>a{
      color: v-bind(textColor);
      cursor: pointer;
      &:hover{
        color: v-bind(textDisabledColor);
      }
    }

    .breadcrumb-item-last {
      .breadcrumb-item__title, .breadcrumb-item__title>a{
        color: v-bind(textDisabledColor) !important;
        cursor: default;
      }
    }

  }
}

.breadcrumb-enter-active,
.breadcrumb-leave-active {
    transition: all 0.5s;
}

.breadcrumb-enter-from {
    transform: translate3d(20px);
}

.breadcrumb-leave-action {
    position: absolute;
    display: none;
}
</style>
