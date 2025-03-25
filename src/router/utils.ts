import {
  createWebHashHistory,
  createWebHistory,
  type RouterHistory
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

export { getHistoryMode, ascending };
