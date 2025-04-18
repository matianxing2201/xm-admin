import type { VNode } from 'vue'
import type { WithFalse } from '../types.ts'

export interface XmLayoutProps {
    /**
    * @name 简约模式，设置之后不渲染任何layout相关的,但有Context
    * @example pure={true}
    */
    pure?: boolean;

    /**
    * @name logo 的配置，可以配置url，Vue 组件 和 false
    *
    * @example 设置 logo 为网络地址  logo="https://avatars1.githubusercontent.com/u/8186664?s=460&v=4"
    * @example 设置 logo 为组件  logo={<img src="https://avatars1.githubusercontent.com/u/8186664?s=460&v=4"/>}
    * @example 设置 logo 为 false 不显示 logo  logo={false}
    * @example 设置 logo 为 方法  logo={()=> <img src="https://avatars1.githubusercontent.com/u/8186664?s=460&v=4"/> }
    */
    logo?: VNode | WithFalse<() => VNode>;

    /**
     * @name layout 的 loading 效果，设置完成之后只展示一个 loading
     *
     * @example loading={true}
    */
    loading?: boolean;

    /**
     * @name 是否收起 layout 是严格受控的，可以 设置为 true，一直收起
     * @example collapsed={true}
     */
    collapsed?: boolean;

    /**
     * @example 不展示dom footerRender={false}
     * @example 使用 layout 的  DefaultFooter   footerRender={() => (<DefaultFooter copyright="这是一条测试文案"/>}
     */
    footerRender?: WithFalse<(props: XmLayoutProps, defaultDom: VNode) => VNode>;

    showPageTags?: boolean
}


export interface XmLayoutEmits {
    (e: 'collapse', collapse: boolean): void
    (e: 'update:collapsed', collapse: boolean): void
}