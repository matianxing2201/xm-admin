import { defineStore } from "pinia";
import type { AuthState } from "@/store/interface";
import { getShowMenuList, getFlatMenuList } from "@/utils/utils";

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    // 菜单权限列表
    authMenuList: []
  }),
  getters: {
    // 菜单权限列表 未处理
    getAuthMenuList: state => state.authMenuList,
    // 菜单权限列表 已处理
    getAuthMenuListHandle: state => getShowMenuList(state.authMenuList),
    // 扁平化之后的一维数组菜单，添加动态路由
    flatMenuListGet: state => getFlatMenuList(state.authMenuList)
  }
});
