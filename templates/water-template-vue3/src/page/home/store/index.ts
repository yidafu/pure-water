import { defineStore } from 'pinia';

export const useHomeStore = defineStore('HOME', {
  state: () => ({ count: 0 }),
});
