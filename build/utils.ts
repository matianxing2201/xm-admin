import dayjs from "dayjs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import {
  name,
  version,
  engines,
  dependencies,
  devDependencies
} from "../package.json";

const root: string = process.cwd();

// 处理环境变量
const wrapperEnv = (envConf: Recordable): ViteEnv => {
  const ret: ViteEnv = {
    VITE_PORT: 1224,
    VITE_PUBLIC_PATH: "",
    VITE_ROUTER_HISTORY: "",
    VITE_CDN: false,
    VITE_HIDE_HOME: false
  };

  // 数据格式兼容处理
  for (const envName of Object.keys(envConf)) {
    let realName = envConf[envName].replace(/\\n/g, "\n");
    realName =
      realName === "true" ? true : realName === "false" ? false : realName;

    if (envName === "VITE_PORT") {
      realName = Number(realName);
    }
    ret[envName] = realName;

    if (typeof realName === "string") {
      process.env[envName] = realName;
    } else if (typeof realName === "object") {
      process.env[envName] = JSON.stringify(realName);
    }
  }
  return ret;
};

/** 平台的名称、版本、运行所需的`node`和`pnpm`版本、依赖、最后构建时间的类型提示 */
const __APP_INFO__ = {
  pkg: { name, version, engines, dependencies, devDependencies },
  lastBuildTime: dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss")
};

/**
 * @description: 路径转换
 * @param {string} dir 路劲片段 默认`build`
 * @param {string} metaUrl 完整`url`，如果在`build`目录外调用必传`import.meta.url`
 */
const pathResolve = (dir = ".", metaUrl = import.meta.url) => {
  // 当前文件目录的绝对路径
  const currentFileDir = dirname(fileURLToPath(metaUrl));
  // build 目录的绝对路径
  const buildDir = resolve(currentFileDir, "build");
  // 解析的绝对路径
  const resolvedPath = resolve(currentFileDir, dir);
  // 检查解析的绝对路径是否在 build 目录内
  if (resolvedPath.startsWith(buildDir)) {
    // 在 build 目录内，返回当前文件路径
    return fileURLToPath(metaUrl);
  }
  // 不在 build 目录内，返回解析后的绝对路径
  return resolvedPath;
};

const alias: Record<string, string> = {
  "@": pathResolve("../src")
};

export { root, alias, wrapperEnv, pathResolve, __APP_INFO__ };
