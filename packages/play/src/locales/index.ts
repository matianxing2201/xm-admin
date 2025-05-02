import type { App } from 'vue';
import type { LanguagesType } from './types';
import { i18n, loadI18nMsgs } from './i18n';

export async function setupLocal(app: App, defaultLang: LanguagesType = 'zh-CN') {
  app.use(i18n);
  await loadI18nMsgs(defaultLang);
}

export default setupLocal;
