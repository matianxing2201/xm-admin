declare global {
  interface ViteEnv {
    VITE_PORT: number;
    VITE_PUBLIC_PATH: string;
    VITE_ROUTER_HISTORY: string;
    VITE_CDN: boolean;
    VITE_HIDE_HOME: boolean;
  }

  interface PlatformConfigs {
    Version?: string;
    Title?: string;
    Theme?: string;
  }
}

export {};
