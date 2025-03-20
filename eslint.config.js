import js from "@eslint/js";
import pluginVue from "eslint-plugin-vue";
import * as parserVue from "vue-eslint-parser";
import configPrettier from "eslint-config-prettier";
import pluginPrettier from "eslint-plugin-prettier";
import { defineFlatConfig } from "eslint-define-config";
import * as parserTypeScript from "@typescript-eslint/parser";
import pluginTypeScript from "@typescript-eslint/eslint-plugin";

export default defineFlatConfig([
  {
    ...js.configs.recommended, // 使用 ESLint 推荐的 JavaScript 规则
    ignores: [
      "**/.*", // 忽略所有以点开头的文件（如 .gitignore）
      "dist/*", // 忽略 dist 目录下的所有文件
      "*.d.ts", // 忽略所有 .d.ts 文件
      "public/*", // 忽略 public 目录下的所有文件
      "src/assets/**", // 忽略 src/assets 目录下的所有文件
      "src/**/iconfont/**" // 忽略 src 目录下所有 iconfont 文件夹
    ],
    languageOptions: {
      // 定义全局变量（这些变量在代码中可以直接使用，不会报未定义错误）
      globals: {
        // index.d.ts
        RefType: "readonly",
        EmitType: "readonly",
        TargetContext: "readonly",
        ComponentRef: "readonly",
        ElRef: "readonly",
        ForDataType: "readonly",
        AnyFunction: "readonly",
        PropType: "readonly",
        Writable: "readonly",
        Nullable: "readonly",
        NonNullable: "readonly",
        Recordable: "readonly",
        ReadonlyRecordable: "readonly",
        Indexable: "readonly",
        DeepPartial: "readonly",
        Without: "readonly",
        Exclusive: "readonly",
        TimeoutHandle: "readonly",
        IntervalHandle: "readonly",
        Effect: "readonly",
        ChangeEvent: "readonly",
        WheelEvent: "readonly",
        ImportMetaEnv: "readonly",
        Fn: "readonly",
        PromiseFn: "readonly",
        ComponentElRef: "readonly",
        parseInt: "readonly",
        parseFloat: "readonly"
      }
    },
    plugins: {
      prettier: pluginPrettier // 使用 Prettier 插件
    },
    rules: {
      ...configPrettier.rules, // 使用 Prettier 的规则
      ...pluginPrettier.configs.recommended.rules, // 使用 Prettier 推荐的规则
      "no-debugger": "off", // 关闭禁止使用 debugger 的规则
      "no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_", // 忽略以 _ 开头的未使用变量（如 _unusedVar）
          varsIgnorePattern: "^_" // 忽略以 _ 开头的未使用参数（如 _unusedParam）
        }
      ],
      "prettier/prettier": [
        "error",
        {
          endOfLine: "auto" // Prettier 自动处理换行符
        }
      ]
    }
  },
  {
    files: ["**/*.?([cm])ts", "**/*.?([cm])tsx"], // 适用于所有 .ts 和 .tsx 文件
    languageOptions: {
      parser: parserTypeScript, // 使用 TypeScript 解析器
      parserOptions: {
        sourceType: "module", // 使用 ES 模块
        warnOnUnsupportedTypeScriptVersion: false // 不警告 TypeScript 版本不兼容
      }
    },
    plugins: {
      "@typescript-eslint": pluginTypeScript // 使用 TypeScript ESLint 插件
    },
    rules: {
      ...pluginTypeScript.configs.strict.rules, // 使用 TypeScript 严格模式的规则
      "@typescript-eslint/ban-types": "off", // 关闭禁止使用特定类型的规则
      "@typescript-eslint/no-redeclare": "error", // 禁止重复声明变量
      "@typescript-eslint/ban-ts-comment": "off", // 关闭禁止使用 @ts-ignore 的规则
      "@typescript-eslint/no-explicit-any": "off", // 关闭禁止使用 any 类型的规则
      "@typescript-eslint/prefer-as-const": "warn", // 建议使用 as const 断言
      "@typescript-eslint/no-empty-function": "off", // 关闭禁止空函数的规则
      "@typescript-eslint/no-non-null-assertion": "off", // 关闭禁止非空断言（!）的规则
      "@typescript-eslint/no-unused-expressions": "off", // 关闭禁止未使用表达式的规则
      "@typescript-eslint/no-unsafe-function-type": "off", // 关闭禁止不安全的函数类型的规则
      "@typescript-eslint/no-import-type-side-effects": "error", // 禁止导入类型时产生副作用
      "@typescript-eslint/explicit-module-boundary-types": "off", // 关闭要求显式模块边界类型的规则
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { disallowTypeAnnotations: false, fixStyle: "inline-type-imports" } // 强制使用一致的类型导入方式
      ],
      "@typescript-eslint/prefer-literal-enum-member": [
        "error",
        { allowBitwiseExpressions: true } // 强制枚举成员使用字面量值，但允许位运算表达式
      ],
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_", // 忽略以 _ 开头的未使用变量
          varsIgnorePattern: "^_" // 忽略以 _ 开头的未使用参数
        }
      ]
    }
  },
  {
    files: ["**/*.d.ts"], // 适用于所有 .d.ts 文件
    rules: {
      "eslint-comments/no-unlimited-disable": "off", // 关闭禁止无限禁用 ESLint 规则的规则
      "import/no-duplicates": "off", // 关闭禁止重复导入的规则
      "unused-imports/no-unused-vars": "off" // 关闭未使用变量的规则
    }
  },
  {
    files: ["**/*.?([cm])js"], // 适用于所有 .js 文件
    rules: {
      "@typescript-eslint/no-require-imports": "off", // 关闭禁止使用 require 的规则
      "@typescript-eslint/no-var-requires": "off" // 关闭禁止使用 var require 的规则
    }
  },
  {
    files: ["**/*.vue"], // 适用于所有 .vue 文件
    languageOptions: {
      globals: {
        $: "readonly",
        $$: "readonly",
        $computed: "readonly",
        $customRef: "readonly",
        $ref: "readonly",
        $shallowRef: "readonly",
        $toRef: "readonly"
      },
      parser: parserVue, // 使用 Vue 解析器
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        },
        extraFileExtensions: [".vue"], // 额外支持 .vue 文件
        parser: "@typescript-eslint/parser", // 使用 TypeScript 解析器
        sourceType: "module" // 使用 ES 模块
      }
    },
    plugins: {
      vue: pluginVue // 使用 Vue ESLint 插件
    },
    processor: pluginVue.processors[".vue"], // 使用 Vue 文件处理器
    rules: {
      ...pluginVue.configs.base.rules, // 使用 Vue 基础规则
      ...pluginVue.configs["vue3-essential"].rules, // 使用 Vue 3 必要规则
      ...pluginVue.configs["vue3-recommended"].rules, // 使用 Vue 3 推荐规则
      "no-undef": "off", // 关闭禁止未定义变量的规则
      "no-unused-vars": "off", // 关闭禁止未使用变量的规则
      "vue/no-v-html": "off", // 关闭禁止使用 v-html 的规则
      "vue/require-default-prop": "off", // 关闭要求默认值的规则
      "vue/require-explicit-emits": "off", // 关闭要求显式声明 emits 的规则
      "vue/multi-word-component-names": "off", // 关闭要求组件名多单词的规则
      "vue/no-setup-props-reactivity-loss": "off", // 关闭禁止 setup props 失去响应性的规则
      "vue/html-self-closing": [
        "error",
        {
          html: {
            void: "always", // 空标签必须自闭合
            normal: "always", // 普通标签必须自闭合
            component: "always" // 组件标签必须自闭合
          },
          svg: "always", // SVG 标签必须自闭合
          math: "always" // MathML 标签必须自闭合
        }
      ]
    }
  }
]);
