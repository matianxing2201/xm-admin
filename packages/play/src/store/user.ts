import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', () => {
  const token = ref<string>('123');

  return {
    token
  };
}, { persist: { pick: ['token'] } });
