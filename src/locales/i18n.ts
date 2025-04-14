import type { LanguagesType } from './types'
import { createI18n, useI18n } from 'vue-i18n'

const loadedLangs = new Set<string>();

export const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: '',
    messages: {}
})

// 动态导入 langs 文件夹下的所有 .json 文件
const modules = import.meta.glob('./langs/*.json')

// 语言字典
const localesMap = loadLocalesMap(modules)


// 获取所有语言 并结构化 { zh-CN： 对应导入模块的方法 } 语言为key 模块为value
function loadLocalesMap(modules: any) {
    const localesMap: Record<string, any> = {}
    for (const key in modules) {
        const locale = key.match(/\.\/langs\/(.*)\.json$/)![1]
        localesMap[locale] = modules[key]
    }
    return localesMap
}

// 设置当前语言 i18n支持响应式 可以通过.value设置
export function setI18nLang(locale: LanguagesType) {
    i18n.global.locale.value = locale
}

export async function loadI18nMsgs(lang: LanguagesType) {
    // 检查当前语言是否已经设置或已经加载
    if (unref(i18n.global.locale) === lang || loadedLangs.has(lang)) return setI18nLang(lang);

    // 从 localesMap 中获取对应语言的消息文件并加载
    const messages = await localesMap[lang]?.();

    console.log(messages);

    if (messages?.default) {
        i18n.global.setLocaleMessage(lang, messages.default);
    }

    // 将该语言标记为已加载
    loadedLangs.add(lang);
    return setI18nLang(lang);
}