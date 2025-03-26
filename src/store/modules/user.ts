import { defineStore } from "pinia";
import type { UserState } from "../interface/index";

export const useUserStore = defineStore("user", {
  state: (): UserState => ({
    token: "",
    userInfo: {}
  }),
  getters: {
    getToken(state) {
      return state.token;
    },
    getUserInfo(state) {
      return state.userInfo;
    }
  }
});
