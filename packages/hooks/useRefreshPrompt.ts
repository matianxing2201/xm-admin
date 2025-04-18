import { useRegisterSW } from 'virtual:pwa-register/vue'
import { notification, Button } from 'ant-design-vue'
import { h } from 'vue'

export function useRefreshPrompt(pollingInterval: number = 10 * 1000) {
    
    // 使用 useRegisterSW 注册 Service Worker
    const { updateServiceWorker } = useRegisterSW({
         /**
         * 当检测到需要刷新的新版本时触发
         */
        onNeedRefresh() {
            notification.info({
                message: '发现新版本',
                description: '点击刷新',
                duration: 0,
                btn: h(Button, {
                    type: 'primary',
                    onClick: () => {
                        updateServiceWorker()
                    }
                }, () => '刷新')
            })
        },
        /**
         * 当 Service Worker 注册成功时触发
         * @param r 注册的 Service Worker 实例
         */
        onRegistered(r) {
            r &&
              setInterval(() => {
                r.update();
              }, pollingInterval);
        },
    })
}