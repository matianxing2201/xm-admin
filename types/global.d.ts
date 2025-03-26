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
    MultiTagsCache?: boolean;
    ResponsiveStorageNameSpace?: string;
  }
}

declare namespace Menu {
  interface MenuOptions {
    path: string;
    name: string;
    component?: string | (() => Promise<unknown>);
    redirect?: string;
    meta: MetaProps;
    children?: MenuOptions[];
  }
}
// export {};
