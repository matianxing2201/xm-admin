import type { LayoutSetting, ThemeType } from '@/types';
import type { ThemeConfig } from 'ant-design-vue/es/config-provider/context';
import { defaultLayoutSetting } from '@/config';
import { useDark, useToggle } from '@vueuse/core';
import { theme as antdTheme } from 'ant-design-vue/es';
import { defineStore } from 'pinia';
import { reactive, watch } from 'vue';

const isDark = useDark();
const toggleDark = useToggle(isDark);

export const useAppStore = defineStore('app', () => {
  // 主体与布局相关
  const { darkAlgorithm, defaultAlgorithm } = antdTheme;
  const layoutSetting = reactive<LayoutSetting>(defaultLayoutSetting);

  const themeConfig: ThemeConfig = reactive<ThemeConfig>({
    algorithm:
            layoutSetting.theme === 'light' ? [defaultAlgorithm] : [darkAlgorithm],
    token: {
      colorPrimary: layoutSetting.colorPrimary,
      colorBgContainer:
                layoutSetting.theme === 'light' ? '#fff' : 'rgb(36, 37, 37)',
    },
  });

  if (isDark.value || layoutSetting.theme === 'dark') {
    toggleDark();
  }

  watch(isDark, () => {
    isDark.value ? toggleTheme('dark') : toggleTheme('light');
  });

  /**
   * 切换主题配置
   * @param theme 当前选择的主题类型，可以是 'light' 或 'dark'
   */
  function toggleTheme(theme: ThemeType) {
    layoutSetting.theme = theme;
    if (theme === 'light') {
      toggleDark(false);
      themeConfig.algorithm = [defaultAlgorithm];
      if (themeConfig.token)
        themeConfig.token.colorBgContainer = '#fff';
    }
    else if (theme === 'dark') {
      toggleDark(true);
      themeConfig.algorithm = [darkAlgorithm];
      if (themeConfig.token)
        themeConfig.token.colorBgContainer = 'rgb(36, 37, 37)';
    }
  }

  return {
    layoutSetting,
    theme: themeConfig,
  };
});

