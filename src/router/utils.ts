import {
  createWebHashHistory,
  createWebHistory,
  type RouterHistory,
  type RouteRecordRaw
} from "vue-router";

function getHistoryMode(mode): RouterHistory {
  if (mode === "hash") {
    return createWebHashHistory();
  } else {
    return createWebHistory(); // html5
  }
}

/**
 * 按照路由中meta下的rank等级升序来排序路由
 * */
function ascending(arr: any[]) {
  return arr.sort(
    (a: { meta: { rank: number } }, b: { meta: { rank: number } }) => {
      return a?.meta.rank - b?.meta.rank;
    }
  );
}

/**
 * @description 创建层级关系
 * @param tree 树
 * @param pathList 每一项的id组成的数组
 * @returns 创建层级关系后的树
 */
function buildHierarchyTree(tree: any[], pathList = []): any {
  if (!Array.isArray(tree)) {
    console.error("必须是数组格式");
    return [];
  }
  if (!tree || tree.length === 0) {
    return [];
  }
  for (let [key, value] of tree.entries()) {
    value.id = key;
    value.parentId = pathList.length ? pathList[pathList.length - 1] : null;
    value.pathList = [...pathList, value.id];
    const hasChildren = value.children && value.children.length > 0;
    if (hasChildren) {
      buildHierarchyTree(value.children, value.pathList);
    }
  }
  return tree;
}
/**
 * 将多级嵌套路由处理成一维数组
 * @param routesList 传入路由
 * @returns 返回处理后的一维路由
 */
function formatFlatteningRoutes(routesList: RouteRecordRaw[]) {
  if (routesList.length === 0) return routesList;
  let hierarchyList = buildHierarchyTree(routesList);
  for (let i = 0; i < hierarchyList.length; i++) {
    if (hierarchyList[i].children) {
      hierarchyList = hierarchyList
        .slice(0, i + 1)
        .concat(hierarchyList[i].children, hierarchyList.slice(i + 1));
    }
  }
  return hierarchyList;
}

/**
 * 一维数组处理成多级嵌套数组（三级及以上的路由全部拍成二级，keep-alive 只支持到二级缓存）
 * @param routesList 处理后的一维路由菜单数组
 * @returns 返回将一维数组重新处理成规定路由的格式
 */
function formatTwoStageRoutes(routesList: RouteRecordRaw[]) {
  if (routesList.length === 0) return routesList;
  const newRoutesList: RouteRecordRaw[] = [];
  routesList.forEach((v: RouteRecordRaw) => {
    if (v.path === "/") {
      newRoutesList.push({
        component: v.component,
        name: v.name,
        path: v.path,
        redirect: v.redirect,
        meta: v.meta,
        children: []
      });
    } else {
      newRoutesList[0]?.children.push({ ...v });
    }
  });
  return newRoutesList;
}

export {
  getHistoryMode,
  ascending,
  buildHierarchyTree,
  formatFlatteningRoutes,
  formatTwoStageRoutes
};
