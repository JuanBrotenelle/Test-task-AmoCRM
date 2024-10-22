import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import type { Data, ArrayAmo } from '../types';

export const useUserStore = defineStore('UserStore', () => {
  const data = ref<Data | null>(null);

  const arrayAmo = ref<ArrayAmo[] | null>([]);

  return { data, arrayAmo };
});
