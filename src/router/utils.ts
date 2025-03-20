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
export { getHistoryMode };
