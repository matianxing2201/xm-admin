import { cloneDeep } from "lodash-es";

function isEmpty(value: any): boolean {
  if (value === null || value === undefined) {
    return true;
  }
  if (Array.isArray(value)) {
    return value.length === 0;
  }
  if (typeof value === "object") {
    return Object.keys(value).length === 0;
  }
  if (typeof value === "string") {
    return value.trim().length === 0;
  }
  if (value instanceof Map) {
    return value.size === 0;
  }
  if (value instanceof Set) {
    return value.size === 0;
  }
  return false;
}

// 递归过滤菜单，将isHide为true的菜单进行隐藏
function getShowMenuList(menuList: Menu.MenuOptions[]) {
  let newMenuList: Menu.MenuOptions[] = cloneDeep(menuList);
  return newMenuList.filter(item => {
    item.children?.length && (item.children = getShowMenuList(item.children));
    return !item.meta?.isHide;
  });
}

/**
 * @description 使用递归扁平化菜单，方便添加动态路由
 * @param {Array} menuList 菜单列表
 * @returns {Array}
 */

function getFlatMenuList(menuList: Menu.MenuOptions[]): Menu.MenuOptions[] {
  let newMenuList: Menu.MenuOptions[] = cloneDeep(menuList);
  return newMenuList.flatMap(item => [
    item,
    ...(item.children ? getFlatMenuList(item.children) : [])
  ]);
}

export { isEmpty, getShowMenuList, getFlatMenuList };
